document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll(".step");
  let currentStep = 1;

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

  // Verification code input handling
  const codeInputs = document.querySelectorAll(".code-input");
  codeInputs.forEach((input, index) => {
    input.addEventListener("keyup", (e) => {
      if (e.key >= 0 && e.key <= 9) {
        if (index < codeInputs.length - 1) {
          codeInputs[index + 1].focus();
        }
      } else if (e.key === "Backspace") {
        if (index > 0) {
          codeInputs[index - 1].focus();
        }
      }
    });
  });

  // Form submissions
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");
  const verifyCodeForm = document.getElementById("verifyCodeForm");
  const resetPasswordForm = document.getElementById("resetPasswordForm");

  forgotPasswordForm?.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;

    if (!isValidEmail(email)) {
      showError("Email không hợp lệ");
      return;
    }

    // Simulate API call
    showLoading(this);
    setTimeout(() => {
      hideLoading(this);
      goToStep(2);
      startTimer();
    }, 1500);
  });

  verifyCodeForm?.addEventListener("submit", function (e) {
    e.preventDefault();
    const code = Array.from(codeInputs)
      .map((input) => input.value)
      .join("");

    if (code.length !== 6) {
      showError("Vui lòng nhập đủ mã xác nhận");
      return;
    }

    // Simulate API call
    showLoading(this);
    setTimeout(() => {
      hideLoading(this);
      goToStep(3);
    }, 1500);
  });

  resetPasswordForm?.addEventListener("submit", function (e) {
    e.preventDefault();
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (newPassword.length < 6) {
      showError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (newPassword !== confirmPassword) {
      showError("Mật khẩu xác nhận không khớp");
      return;
    }

    // Simulate API call
    showLoading(this);
    setTimeout(() => {
      hideLoading(this);
      showSuccess("Đặt lại mật khẩu thành công!");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    }, 1500);
  });

  // Timer for resend code
  function startTimer() {
    let timeLeft = 60;
    const timerDisplay = document.querySelector("#timer span");
    const resendBtn = document.getElementById("resendBtn");

    const timer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timer);
        document.getElementById("timer").style.display = "none";
        resendBtn.disabled = false;
      }
    }, 1000);
  }

  // Helper functions
  function goToStep(step) {
    steps.forEach((s) => s.classList.remove("active"));
    document.getElementById(`step${step}`).classList.add("active");
    currentStep = step;
  }

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

  function showSuccess(message) {
    const notification = document.createElement("div");
    notification.className = "notification success";
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  function showLoading(form) {
    const button = form.querySelector(".auth-button");
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
    button.disabled = true;
  }

  function hideLoading(form) {
    const button = form.querySelector(".auth-button");
    button.innerHTML = button.getAttribute("data-text") || "Xác nhận";
    button.disabled = false;
  }
});
