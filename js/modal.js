// =============================================
// modal.js — Modal oynalarni boshqarish
// =============================================

/** Modalni ochish */
function openModal(name) {
  const overlay = document.getElementById("modal-" + name);
  if (overlay) {
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

/** Modalni yopish */
function closeModal(name) {
  const overlay = document.getElementById("modal-" + name);
  if (overlay) {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }
}

/** Barcha modallarni yopish */
function closeAllModals() {
  document.querySelectorAll(".modal-overlay").forEach((m) => {
    m.classList.remove("open");
  });
  document.body.style.overflow = "";
}

/** Bir modaldan ikkinchisiga o'tish */
function switchModal(fromName, toName) {
  closeModal(fromName);
  openModal(toName);
}

// Overlay ga bosilganda yopilsin
document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
});

// ===== UPLOAD =====

/** Fayl tanlangan imitatsiya */
function fakeUpload() {
  document.getElementById("uploadIcon").textContent = "✅";
  document.getElementById("uploadText").textContent = "konspekt.pdf — yuklashga tayyor";
  showToast("Fayl tanlandi!", "📄");
}

/** Konspekt yuklash */
function doUpload() {
  const title   = document.getElementById("uploadTitle").value.trim();
  const subject = document.getElementById("uploadSubject").value;

  if (!title || !subject) {
    showToast("Sarlavha va fanni kiriting!", "⚠️");
    return;
  }

  // TODO: Backend bilan integratsiya — fayl yuklash API
  closeModal("upload");
  showToast("Konspekt muvaffaqiyatli yuklandi! 🎉", "✅");

  // Formani tozalash
  document.getElementById("uploadTitle").value   = "";
  document.getElementById("uploadSubject").value = "";
  document.getElementById("uploadDesc").value    = "";
  document.getElementById("uploadIcon").textContent = "📄";
  document.getElementById("uploadText").innerHTML =
    'Faylni shu yerga tashlang yoki <span>tanlash uchun bosing</span>';
}
