// Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Navbar Background Change on Scroll
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Property Filter
const propertyCards = document.querySelectorAll(".property-card");
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filterValue = button.getAttribute("data-filter");

    propertyCards.forEach((card) => {
      if (filterValue === "all") {
        card.style.display = "block";
      } else {
        if (card.querySelector(".property-tag").textContent === filterValue) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      }
    });

    // Update active filter button
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

// Form Validation
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = this.querySelector('input[type="text"]').value;
  const email = this.querySelector('input[type="email"]').value;
  const phone = this.querySelector('input[type="tel"]').value;
  const message = this.querySelector("textarea").value;

  if (!name || !email || !phone || !message) {
    showNotification("Vui lòng điền đầy đủ thông tin", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showNotification("Email không hợp lệ", "error");
    return;
  }

  if (!isValidPhone(phone)) {
    showNotification("Số điện thoại không hợp lệ", "error");
    return;
  }

  // Simulate form submission
  showNotification("Gửi tin nhắn thành công!", "success");
  this.reset();
});

// Helper Functions
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(phone);
}

function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Image Gallery
document.querySelectorAll(".property-image img").forEach((image) => {
  image.addEventListener("click", () => {
    const modal = document.createElement("div");
    modal.className = "image-modal";
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <img src="${image.src}" alt="${image.alt}">
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector(".close-modal").addEventListener("click", () => {
      modal.remove();
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  });
});
