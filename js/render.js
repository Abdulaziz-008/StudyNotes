// =============================================
// render.js — HTML elementlarni yaratish funksiyalari
// =============================================

/**
 * Ismning bosh harfini qaytaradi
 */
function getInitial(name) {
  return name.charAt(0).toUpperCase();
}

/**
 * Ismga qarab rang qaytaradi
 */
function getColor(name) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

/**
 * Bitta note kartochkasi HTML-ni qaytaradi
 * @param {Object} note - note obyekti
 * @param {string} onClickFn - bosilganda chaqiriladigan funksiya nomi
 */
function renderCard(note, onClickFn) {
  return `
    <div class="note-card" onclick="${onClickFn}(${note.id})">
      <span class="note-badge ${note.badge}">${note.subject}</span>
      <div class="note-title">${note.title}</div>
      <div class="note-desc">${note.desc}</div>
      <div class="note-meta">
        <div class="note-author">
          <div class="avatar" style="background: ${getColor(note.author)}">
            ${getInitial(note.author)}
          </div>
          <span>${note.author}</span>
        </div>
        <div class="note-actions">
          <div class="note-action" onclick="event.stopPropagation(); toggleLike(${note.id}, this)">
            ❤️ <span class="lc-${note.id}">${note.likes}</span>
          </div>
          <div class="note-action">⬇️ ${note.downloads}</div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Subject chip HTML-ni qaytaradi
 */
function renderSubjectChip(subject) {
  return `
    <a class="subject-chip" onclick="filterBySubject('${subject.name}')">
      <div class="icon">${subject.emoji}</div>
      <div class="name">${subject.name}</div>
      <div class="count">${subject.count} ta konspekt</div>
    </a>
  `;
}

/**
 * Note detail sahifasi uchun header HTML
 */
function renderDetailHeader(note) {
  return `
    <button
      onclick="showPage('notes')"
      style="background:none; border:none; color:var(--muted); cursor:pointer; font-size:0.9rem; margin-bottom:16px;"
    >← Orqaga</button>

    <span class="note-badge ${note.badge}">${note.subject}</span>

    <h1 style="
      font-family: 'Syne', sans-serif;
      font-size: clamp(1.5rem, 4vw, 2.5rem);
      font-weight: 800;
      margin: 12px 0 8px;
      line-height: 1.2;
    ">${note.title}</h1>

    <div style="display:flex; align-items:center; gap:16px; flex-wrap:wrap; color:var(--muted); font-size:0.88rem;">
      <div style="display:flex; align-items:center; gap:8px;">
        <div class="avatar" style="background:${getColor(note.author)}">
          ${getInitial(note.author)}
        </div>
        <span>${note.author}</span>
      </div>
      <span>📅 ${note.date}</span>
      <span>⬇️ ${note.downloads} marta yuklab olindi</span>
      <span>⭐ ${note.rating}/5.0</span>
    </div>
  `;
}

/**
 * Note detail sahifasi uchun main kontent HTML
 */
function renderDetailMain(note) {
  return `
    <div class="preview-box">
      <div class="doc-icon">📄</div>
      <p style="font-size:0.9rem;">PDF hujjat ko'rinishi</p>
      <p style="font-size:0.8rem; margin-top:4px;">${note.title}.pdf</p>
    </div>

    <div style="
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 24px;
    ">
      <h3 style="font-family:'Syne',sans-serif; font-size:1rem; font-weight:700; margin-bottom:10px;">
        📝 Tavsif
      </h3>
      <p style="color:var(--muted); font-size:0.9rem; line-height:1.7;">${note.desc}</p>
    </div>

    <div>
      <div class="comments-title">💬 Izohlar</div>
      <div class="comment-input-row">
        <input class="comment-input" placeholder="Fikringizni yozing..." id="commentInput" />
        <button class="btn btn-primary" onclick="addComment()">Jo'natish</button>
      </div>
      <div id="commentsList">
        <div class="comment">
          <div class="avatar" style="background:#f0c040; width:32px; height:32px;">N</div>
          <div class="comment-body">
            <div class="comment-author">Nilufar B.</div>
            <div class="comment-text">Juda yaxshi konspekt, raxmat! ✅</div>
            <div class="comment-time">2 soat oldin</div>
          </div>
        </div>
        <div class="comment">
          <div class="avatar" style="background:#60a5fa; width:32px; height:32px;">T</div>
          <div class="comment-body">
            <div class="comment-author">Temur O.</div>
            <div class="comment-text">Tushuntirish juda aniq. 5 yulduz!</div>
            <div class="comment-time">5 soat oldin</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Note detail sahifasi uchun yon panel HTML
 */
function renderDetailSide(note) {
  return `
    <div class="side-card">
      <button
        class="btn btn-primary"
        style="width:100%; justify-content:center; padding:13px; margin-bottom:12px;"
        onclick="doDownload(${note.id})"
      >⬇️ Yuklab olish</button>
      <button
        class="btn btn-ghost"
        style="width:100%; justify-content:center; padding:11px;"
        onclick="toggleLike(${note.id}, this)"
      >❤️ Like (${note.likes})</button>
    </div>

    <div class="side-card">
      <h3>📊 Statistika</h3>
      <div class="stat-row"><span>Yuklab olindi</span><span>${note.downloads}</span></div>
      <div class="stat-row"><span>Likelar</span><span>${note.likes}</span></div>
      <div class="stat-row"><span>Reyting</span><span>⭐ ${note.rating}</span></div>
      <div class="stat-row"><span>Sana</span><span>${note.date}</span></div>
      <div class="stat-row"><span>Format</span><span>PDF</span></div>
    </div>

    <div class="side-card">
      <h3>👤 Muallif</h3>
      <div style="display:flex; align-items:center; gap:12px;">
        <div class="avatar" style="background:${getColor(note.author)}; width:40px; height:40px;">
          ${getInitial(note.author)}
        </div>
        <div>
          <div style="font-weight:500;">${note.author}</div>
          <div style="font-size:0.78rem; color:var(--muted);">12 ta konspekt</div>
        </div>
      </div>
    </div>
  `;
}
