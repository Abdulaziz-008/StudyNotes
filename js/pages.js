// =============================================
// pages.js — Sahifalar orasida navigatsiya va render
// =============================================

let currentFilter = "Barchasi";

/**
 * Sahifani ko'rsatadi
 * @param {string} name - sahifa nomi (home | notes | detail | subjects | profile)
 */
function showPage(name) {
  // Barcha sahifalarni yashirish
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
  document.getElementById("page-" + name).classList.add("active");

  // Nav linkni belgilash
  document.querySelectorAll(".nav-links a").forEach((a) => a.classList.remove("active"));
  const navEl = document.getElementById("nav-" + name);
  if (navEl) navEl.classList.add("active");

  window.scrollTo({ top: 0, behavior: "smooth" });

  // Sahifaga qarab render
  if (name === "home")     renderHomePage();
  if (name === "notes")    renderNotesPage();
  if (name === "subjects") renderSubjectsPage();
  if (name === "profile")  renderProfilePage();
}

// ===== HOME =====
function renderHomePage() {
  const grid = document.getElementById("homeNotesGrid");
  if (!grid) return;

  const top6 = [...NOTES]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 6);

  grid.innerHTML = top6.map((n) => renderCard(n, "openNote")).join("");
}

// ===== NOTES =====
function renderNotesPage() {
  renderAllNotes();
}

function renderAllNotes() {
  const grid = document.getElementById("allNotesGrid");
  if (!grid) return;

  const query = (document.getElementById("searchInput")?.value || "").toLowerCase();

  const filtered = NOTES.filter((note) => {
    const matchFilter =
      currentFilter === "Barchasi" || note.subject === currentFilter;
    const matchSearch =
      !query ||
      note.title.toLowerCase().includes(query) ||
      note.subject.toLowerCase().includes(query) ||
      note.desc.toLowerCase().includes(query);
    return matchFilter && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <p style="color:var(--muted); grid-column:1/-1; text-align:center; padding:40px;">
        Hech narsa topilmadi 😔
      </p>
    `;
    return;
  }

  grid.innerHTML = filtered.map((n) => renderCard(n, "openNote")).join("");
}

/** Qidiruv input oninput */
function filterNotes() {
  renderAllNotes();
}

/** Filter tugmasi bosilganda */
function setFilter(value, btn) {
  currentFilter = value;
  document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderAllNotes();
}

/** Subject chipidan bosilganda */
function filterBySubject(subjectName) {
  showPage("notes");
  currentFilter = subjectName;
  document.querySelectorAll(".filter-btn").forEach((b) => {
    b.classList.toggle("active", b.textContent.includes(subjectName));
  });
  renderAllNotes();
}

// ===== NOTE DETAIL =====
function openNote(id) {
  const note = NOTES.find((n) => n.id === id);
  if (!note) return;

  document.getElementById("detailHeader").innerHTML = renderDetailHeader(note);
  document.getElementById("detailMain").innerHTML   = renderDetailMain(note);
  document.getElementById("detailSide").innerHTML   = renderDetailSide(note);

  showPage("detail");
}

/** Izoh qo'shish */
function addComment() {
  const input = document.getElementById("commentInput");
  if (!input.value.trim()) {
    showToast("Izoh yozing!", "⚠️");
    return;
  }

  const div = document.createElement("div");
  div.className = "comment";
  div.innerHTML = `
    <div class="avatar" style="background:var(--accent); width:32px; height:32px; flex-shrink:0;">S</div>
    <div class="comment-body">
      <div class="comment-author">Siz</div>
      <div class="comment-text">${input.value}</div>
      <div class="comment-time">Hozirgina</div>
    </div>
  `;

  document.getElementById("commentsList").prepend(div);
  input.value = "";
  showToast("Izoh qo'shildi!", "✅");
}

/** Yuklab olish */
function doDownload(id) {
  const note = NOTES.find((n) => n.id === id);
  if (note) {
    note.downloads++;
    showToast(`"${note.title}" yuklanmoqda... ⬇️`, "📥");
  }
}

/** Like toggle */
function toggleLike(id, el) {
  const note = NOTES.find((n) => n.id === id);
  if (!note) return;

  if (el.classList.contains("liked")) {
    note.likes--;
    el.classList.remove("liked");
  } else {
    note.likes++;
    el.classList.add("liked");
  }

  document.querySelectorAll(`.lc-${id}`).forEach((e) => {
    e.textContent = note.likes;
  });
}

// ===== SUBJECTS =====
function renderSubjectsPage() {
  const grid = document.getElementById("allSubjectsGrid");
  if (!grid) return;
  grid.innerHTML = SUBJECTS.map(renderSubjectChip).join("");
}

// ===== PROFILE =====
function renderProfilePage() {
  const grid = document.getElementById("profileNotesGrid");
  if (!grid) return;

  // Foydalanuvchining dastlabki 4 ta konspekti
  grid.innerHTML = NOTES.slice(0, 4).map((n) => renderCard(n, "openNote")).join("");

  // Agar login qilingan bo'lsa, profil ma'lumotlarini yangilash
  if (currentUser) {
    const nameEl   = document.getElementById("profileName");
    const emailEl  = document.getElementById("profileEmail");
    const avatarEl = document.getElementById("profileAvatarBig");

    if (nameEl)   nameEl.textContent   = currentUser.username;
    if (emailEl)  emailEl.textContent  = currentUser.email;
    if (avatarEl) avatarEl.textContent = getInitial(currentUser.username);
  }
}
