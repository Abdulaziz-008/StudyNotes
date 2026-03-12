// =============================================
// app.js — Asosiy init, toast, hamburger menyu
// =============================================

// ===== TOAST =====

/**
 * Toast xabarnomani ko'rsatadi
 * @param {string} message - xabar matni
 * @param {string} icon    - emoji icon
 */
function showToast(message, icon = "✅") {
  const toast    = document.getElementById("toast");
  const msgEl    = document.getElementById("toastMsg");
  const iconEl   = document.getElementById("toastIcon");

  msgEl.textContent  = message;
  iconEl.textContent = icon;

  toast.classList.add("show");

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// ===== HAMBURGER MENYU =====

function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("open");
}

function closeMenu() {
  document.getElementById("mobileMenu").classList.remove("open");
}

// Tashqariga bosilganda menyuni yopish
document.addEventListener("click", (e) => {
  const menu       = document.getElementById("mobileMenu");
  const hamburger  = document.getElementById("hamburger");
  if (
    menu &&
    hamburger &&
    !menu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    menu.classList.remove("open");
  }
});

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  // Bosh sahifani render qilish
  renderHomePage();
});
