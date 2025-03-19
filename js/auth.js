document.addEventListener("DOMContentLoaded", function () {
  // Toggle password visibility
  const togglePassword = document.querySelector(".toggle-password");
  const passwordInput = document.querySelector("#password");

  togglePassword.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
  });

  // Form validation
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const remember = document.getElementById("remember").checked;

    // Basic validation
    if (!isValidEmail(email)) {
      showError("Email không hợp lệ");
      return;
    }

    if (password.length < 6) {
      showError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    // Simulate login API call
    login(email, password, remember);
  });
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(message) {
  const notification = document.createElement("div");
  notification.className = "notification error";
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function login(email, password, remember) {
  // Simulate API call
  showLoading();

  setTimeout(() => {
    // Success case
    hideLoading();
    window.location.href = "index.html";

    // Error case
    // showError('Email hoặc mật khẩu không đúng');
  }, 1500);
}

function showLoading() {
  const button = document.querySelector(".auth-button");
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang đăng nhập...';
  button.disabled = true;
}

function hideLoading() {
  const button = document.querySelector(".auth-button");
  button.innerHTML = "Đăng nhập";
  button.disabled = false;
}
