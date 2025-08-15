// ===== Slider =====
const track = document.querySelector(".slider-track");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const cards = document.querySelectorAll(".property-card");

let index = 0;
let cardsPerView = window.innerWidth <= 768 ? 1 : 3;
let slideStep = 1;
let totalSlides = Math.ceil(cards.length - cardsPerView + 1);

function updateSlide() {
  const moveX = (index * 100) / cardsPerView;
  track.style.transform = `translateX(-${moveX}%)`;
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
  cardsPerView = window.innerWidth <= 768 ? 1 : 3;
  slideStep = 1;
  totalSlides = Math.ceil(cards.length - cardsPerView + 1);
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

function openLightbox() {
  buildThumbnails();
  updateLightboxImage();
  lightbox.classList.add("active");
  document.body.classList.add("no-scroll"); // disable scroll
}

function closeLightbox() {
  lightbox.classList.remove("active");
  lightboxImg.src = "";
}

function updateLightboxImage() {
  if (images[currentIndex]) {
    lightboxImg.src = images[currentIndex];
    document.querySelectorAll(".lightbox-thumbs img").forEach((thumb, idx) => {
      thumb.classList.toggle("active", idx === currentIndex);
    });
  }
}

function buildThumbnails() {
  thumbsContainer.innerHTML = "";
  images.forEach((imgSrc, idx) => {
    const thumb = document.createElement("img");
    thumb.src = imgSrc;
    thumb.addEventListener("click", () => {
      currentIndex = idx;
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

// Close lightbox when clicking outside the image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

closeBtn.addEventListener("click", closeLightbox);
featnextBtn.addEventListener("click", showNext);
featprevBtn.addEventListener("click", showPrev);

// ===== Open lightbox only when explore-btn is clicked (desktop + mobile) =====
document.querySelectorAll(".property-card .explore-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent accidental triggers

    const card = e.target.closest(".property-card");
    const rawImages = card
      .getAttribute("data-images")
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    validateImageLinks(rawImages).then((validImgs) => {
      if (!validImgs.length) return;
      images = validImgs;
      currentIndex = 0;
      openLightbox();
    });
  });
});

// ===== Validate image links =====
function validateImageLinks(imgList) {
  return Promise.all(
    imgList.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(src);
          img.onerror = () => resolve(null);
          img.src = src;
        })
    )
  ).then((res) => res.filter(Boolean));
}
