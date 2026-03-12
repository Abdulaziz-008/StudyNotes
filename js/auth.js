// =============================================
// auth.js — Ro'yxatdan o'tish, kirish, chiqish
// =============================================

let isLoggedIn = false;
let currentUser = null;

/** Email orqali kirish */
function doLogin() {
  const email = document.getElementById("loginEmail").value.trim();
  const pass  = document.getElementById("loginPass").value;

  if (!email || !pass) {
    showToast("Barcha maydonlarni to'ldiring!", "⚠️");
    return;
  }

  // TODO: Backend bilan integratsiya
  isLoggedIn = true;
  currentUser = {
    username: email.split("@")[0],
    email: email,
  };

  closeModal("login");
  updateNavForAuth();
  showToast("Muvaffaqiyatli kirdingiz! 👋", "✅");
}

/** Yangi hisob yaratish */
function doRegister() {
  const username = document.getElementById("regUsername").value.trim();
  const email    = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPass").value;

  if (!username || !email || !password) {
    showToast("Barcha maydonlarni to'ldiring!", "⚠️");
    return;
  }
  if (password.length < 8) {
    showToast("Parol kamida 8 ta belgi bo'lishi kerak!", "⚠️");
    return;
  }

  // TODO: Backend bilan integratsiya
  isLoggedIn = true;
  currentUser = { username, email };

  closeModal("register");
  updateNavForAuth();
  showToast("Hisob yaratildi! Xush kelibsiz 🎉", "✅");
}

/** Google yoki GitHub orqali kirish */
function socialLogin(provider) {
  // TODO: OAuth integratsiya
  isLoggedIn = true;
  currentUser = {
    username: "talaba_user",
    email: "user@example.com",
  };

  closeAllModals();
  updateNavForAuth();
  showToast(`${provider} orqali kirdingiz! 👋`, "✅");
}

/** Hisobdan chiqish */
function doLogout() {
  isLoggedIn  = false;
  currentUser = null;
  updateNavForGuest();
  showPage("home");
  showToast("Hisobdan chiqildi", "👋");
}

/** Login qilingan foydalanuvchi uchun navbar */
function updateNavForAuth() {
  const navRight = document.querySelector(".nav-right");
  navRight.innerHTML = `
    <button class="btn btn-ghost" onclick="openModal('upload')">⬆️ Yuklash</button>
    <button class="btn btn-primary" onclick="showPage('profile')">
      👤 ${currentUser.username}
    </button>
    <button class="hamburger" onclick="toggleMenu()">
      <span></span><span></span><span></span>
    </button>
  `;
}

/** Tizimdan chiqilgan foydalanuvchi uchun navbar */
function updateNavForGuest() {
  const navRight = document.querySelector(".nav-right");
  navRight.innerHTML = `
    <button class="btn btn-ghost" onclick="openModal('login')">Kirish</button>
    <button class="btn btn-primary" onclick="openModal('register')">Ro'yxatdan o'tish</button>
    <button class="hamburger" onclick="toggleMenu()">
      <span></span><span></span><span></span>
    </button>
  `;
}
