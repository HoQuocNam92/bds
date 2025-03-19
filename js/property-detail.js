document.addEventListener("DOMContentLoaded", function () {
  // Load property data
  const urlParams = new URLSearchParams(window.location.search);
  const propertyId = urlParams.get("id");
  const propertyData = JSON.parse(sessionStorage.getItem("selectedProperty"));

  if (propertyData) {
    // Update page title
    document.title = `${propertyData.title} - Grand Estate`;

    // Update main image and thumbnails
    document.getElementById("mainImage").src = propertyData.image;

    // Update property info
    document.querySelector(".property-title h1").textContent =
      propertyData.title;
    document.querySelector(".property-title .location").textContent =
      propertyData.location;
    document.querySelector(".property-price .price").textContent =
      propertyData.price;
    document.querySelector(".property-price .status").textContent =
      propertyData.type;

    // Update features
    const features = document.querySelectorAll(
      ".property-features .feature span",
    );
    features[0].textContent = propertyData.features.beds;
    features[1].textContent = propertyData.features.baths;
    features[2].textContent = propertyData.features.garage;
  }

  // Gallery handling
  const mainImage = document.getElementById("mainImage");
  const thumbnails = document.querySelectorAll(".thumbnail-list img");
  const prevBtn = document.querySelector(".gallery-nav.prev");
  const nextBtn = document.querySelector(".gallery-nav.next");
  let currentImageIndex = 0;

  // Thumbnail click
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      mainImage.src = thumb.src;
      updateThumbnailActive(index);
      currentImageIndex = index;
    });
  });

  // Navigation buttons
  prevBtn.addEventListener("click", () => {
    currentImageIndex =
      (currentImageIndex - 1 + thumbnails.length) % thumbnails.length;
    mainImage.src = thumbnails[currentImageIndex].src;
    updateThumbnailActive(currentImageIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
    mainImage.src = thumbnails[currentImageIndex].src;
    updateThumbnailActive(currentImageIndex);
  });

  function updateThumbnailActive(index) {
    thumbnails.forEach((thumb) => thumb.classList.remove("active"));
    thumbnails[index].classList.add("active");
  }

  // Tab handling
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab");

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabPanes.forEach((pane) => pane.classList.remove("active"));

      button.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Google Map initialization
  function initMap() {
    const propertyLocation = { lat: 10.7769, lng: 106.7009 }; // Example coordinates for Ho Chi Minh City
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: propertyLocation,
    });

    new google.maps.Marker({
      position: propertyLocation,
      map: map,
      title: "Property Location",
    });
  }

  // Initialize map if Google Maps API is loaded
  if (typeof google !== "undefined") {
    initMap();
  }

  // Quick Actions
  const favoriteBtn = document.querySelector(".action-btn.favorite");
  favoriteBtn.addEventListener("click", function () {
    this.classList.toggle("active");
    const icon = this.querySelector("i");
    if (this.classList.contains("active")) {
      icon.classList.remove("far");
      icon.classList.add("fas");
      showNotification("Đã thêm vào danh sách yêu thích");
    } else {
      icon.classList.remove("fas");
      icon.classList.add("far");
      showNotification("Đã xóa khỏi danh sách yêu thích");
    }
  });

  // Share functionality
  const shareBtn = document.querySelector(".action-btn.share");
  shareBtn.addEventListener("click", function () {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      // Fallback
      const dummy = document.createElement("input");
      document.body.appendChild(dummy);
      dummy.value = window.location.href;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      showNotification("Đã sao chép link");
    }
  });

  // Schedule viewing
  const scheduleBtn = document.querySelector(".action-btn.schedule");
  scheduleBtn.addEventListener("click", function () {
    // Show scheduling modal
    showScheduleModal();
  });

  // Contact form handling
  const contactForm = document.querySelector(".contact-form");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Form validation
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const message = this.querySelector("textarea").value;

    if (!name || !email || !phone || !message) {
      showNotification("Vui lòng điền đầy đủ thông tin", "error");
      return;
    }

    // Submit form
    showNotification("Đã gửi tin nhắn thành công");
    this.reset();
  });

  // Review system
  const reviewForm = document.querySelector(".review-form");
  const ratingStars = reviewForm.querySelectorAll(".stars i");

  ratingStars.forEach((star, index) => {
    star.addEventListener("click", () => {
      ratingStars.forEach((s, i) => {
        if (i <= index) {
          s.classList.remove("far");
          s.classList.add("fas");
        } else {
          s.classList.remove("fas");
          s.classList.add("far");
        }
      });
    });
  });

  reviewForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const rating = reviewForm.querySelectorAll(".stars .fas").length;
    const review = reviewForm.querySelector("textarea").value;

    if (rating === 0) {
      showNotification("Vui lòng chọn số sao đánh giá", "error");
      return;
    }

    if (!review) {
      showNotification("Vui lòng nhập nội dung đánh giá", "error");
      return;
    }

    // Submit review
    showNotification("Đã gửi đánh giá thành công");
    this.reset();
    ratingStars.forEach((star) => {
      star.classList.remove("fas");
      star.classList.add("far");
    });
  });
});

// Helper functions
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function showScheduleModal() {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Đặt lịch xem nhà</h2>
            <form class="schedule-form">
                <input type="date" min="${
                  new Date().toISOString().split("T")[0]
                }" required>
                <select required>
                    <option value="">Chọn thời gian</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                </select>
                <button type="submit">Xác nhận</button>
            </form>
        </div>
    `;

  document.body.appendChild(modal);

  const closeBtn = modal.querySelector(".close");
  closeBtn.addEventListener("click", () => {
    modal.remove();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });

  const scheduleForm = modal.querySelector(".schedule-form");
  scheduleForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showNotification("Đặt lịch xem nhà thành công");
    modal.remove();
  });
}
