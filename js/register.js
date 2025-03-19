document.addEventListener("DOMContentLoaded", function () {
  // Toggle password visibility
  document.querySelectorAll(".toggle-password").forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const input = this.previousElementSibling;
      const type =
        input.getAttribute("type") === "password" ? "text" : "password";
      input.setAttribute("type", type);
      this.classList.toggle("fa-eye");
      this.classList.toggle("fa-eye-slash");
    });
  });

  // Form validation
  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const terms = document.getElementById("terms").checked;

    // Validation
    if (!fullname || fullname.length < 2) {
      showError("Vui lòng nhập họ tên hợp lệ");
      return;
    }

    if (!isValidEmail(email)) {
      showError("Email không hợp lệ");
      return;
    }

    if (!isValidPhone(phone)) {
      showError("Số điện thoại không hợp lệ");
      return;
    }

    if (password.length < 6) {
      showError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (password !== confirmPassword) {
      showError("Mật khẩu xác nhận không khớp");
      return;
    }

    if (!terms) {
      showError("Vui lòng đồng ý với điều khoản sử dụng");
      return;
    }

    // Register API call
    register({
      fullname,
      email,
      phone,
      password,
    });
  });
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(phone);
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

function register(userData) {
  // Show loading
  showLoading();

  // Simulate API call
  setTimeout(() => {
    // Success case
    hideLoading();
    showSuccess(
      "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.",
    );

    // Redirect to login after 2 seconds
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);

    // Error case
    // showError('Email đã được sử dụng');
  }, 1500);
}

function showSuccess(message) {
  const notification = document.createElement("div");
  notification.className = "notification success";
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function showLoading() {
  const button = document.querySelector(".auth-button");
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
  button.disabled = true;
}

function hideLoading() {
  const button = document.querySelector(".auth-button");
  button.innerHTML = "Đăng ký";
  button.disabled = false;
}
