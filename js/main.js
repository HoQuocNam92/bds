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
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    propertyCards.forEach((card) => {
      const propertyType = card.querySelector(".property-tag").textContent;
      if (filterValue === "all" || filterValue === propertyType) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
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

  // Submit form
  showNotification("Gửi tin nhắn thành công!");
  this.reset();
});

// Helper Functions
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(phone);
}

function showNotification(message, type = "success") {
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

// Property click handling
document.querySelectorAll(".view-details").forEach((button) => {
  button.addEventListener("click", function (e) {
    if (this.tagName === "BUTTON") {
      // Nếu là button thì prevent default
      e.preventDefault();
    }
    const propertyCard = this.closest(".property-card");
    const propertyId = propertyCard.dataset.id;

    // Lưu thông tin property vào sessionStorage
    const propertyData = {
      id: propertyId,
      title: propertyCard.querySelector("h3").textContent,
      location: propertyCard.querySelector(".location").textContent,
      price: propertyCard.querySelector(".price").textContent,
      type: propertyCard.querySelector(".property-tag").textContent,
      features: {
        beds: propertyCard.querySelector(".fa-bed").parentNode.textContent,
        baths: propertyCard.querySelector(".fa-bath").parentNode.textContent,
        garage: propertyCard.querySelector(".fa-car").parentNode.textContent,
      },
      image: propertyCard.querySelector(".property-image img").src,
    };

    sessionStorage.setItem("selectedProperty", JSON.stringify(propertyData));
    window.location.href = `property-detail.html?id=${propertyId}`;
  });
});

window.onerror = function (msg, url, lineNo, columnNo, error) {
  console.error("Error: " + msg + "\nURL: " + url + "\nLine: " + lineNo);
  showNotification("Đã xảy ra lỗi. Vui lòng thử lại sau.", "error");
  return false;
};
