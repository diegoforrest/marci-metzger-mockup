// ===== Slider =====
const track = document.querySelector(".slider-track");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const cards = document.querySelectorAll(".property-card");

let index = 0;
let cardsPerView = window.innerWidth <= 768 ? 1 : 2;
const totalSlides = Math.ceil(cards.length / cardsPerView);

function updateSlide() {
  const moveX = index * -100;
  track.style.transform = `translateX(${moveX}%)`;
}

nextBtn.addEventListener("click", () => {
  if (index < totalSlides - 1) {
    index++;
    updateSlide();
  }
});

prevBtn.addEventListener("click", () => {
  if (index > 0) {
    index--;
    updateSlide();
  }
});

window.addEventListener("resize", () => {
  cardsPerView = window.innerWidth <= 768 ? 1 : 2;
  index = 0;
  updateSlide();
});

// ===== Lightbox =====
const lightbox = document.querySelector(".lightbox");
const lightboxImg = lightbox.querySelector("img");
const closeBtn = document.querySelector(".lightbox-close");
const featnextBtn = document.getElementById("nextImage");
const featprevBtn = document.getElementById("prevImage");
const thumbsContainer = document.querySelector(".lightbox-thumbs");

let images = [];
let currentIndex = 0;

// Only open lightbox when clicking the Explore button
document.querySelectorAll(".property-card .explore-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent bubbling

    const card = e.target.closest(".property-card");
    const rawImages = card
      .getAttribute("data-images")
      .split(",")
      .map((img) => img.trim())
      .filter((img) => img.length > 0);

    // Validate image links before opening
    validateImageLinks(rawImages).then((validImgs) => {
      if (validImgs.length === 0) return; // No valid images, do nothing
      images = validImgs;
      currentIndex = 0;
      openLightbox();
    });
  });
});

// Validate image links by loading each one
function validateImageLinks(imgList) {
  return Promise.all(
    imgList.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => resolve(null);
        img.src = src;
      });
    })
  ).then((results) => results.filter(Boolean));
}

function openLightbox() {
  buildThumbnails();
  updateLightboxImage();
  lightbox.classList.add("active");
}

function closeLightbox() {
  lightbox.classList.remove("active");
  lightboxImg.src = "";
}

function updateLightboxImage() {
  if (images[currentIndex]) {
    lightboxImg.src = images[currentIndex];
    document
      .querySelectorAll(".lightbox-thumbs img")
      .forEach((thumb, index) => {
        thumb.classList.toggle("active", index === currentIndex);
      });
  }
}

function buildThumbnails() {
  thumbsContainer.innerHTML = "";
  images.forEach((imgSrc, index) => {
    const thumb = document.createElement("img");
    thumb.src = imgSrc;
    thumb.addEventListener("click", () => {
      currentIndex = index;
      updateLightboxImage();
    });
    thumbsContainer.appendChild(thumb);
  });
}

function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  updateLightboxImage();
}

function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightboxImage();
}

closeBtn.addEventListener("click", closeLightbox);
featnextBtn.addEventListener("click", showNext);
featprevBtn.addEventListener("click", showPrev);
