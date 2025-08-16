document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeBtn = document.querySelector(".mobile-menu .close");
  const body = document.body;

  // Open menu
  burger.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    body.classList.add("no-scroll"); // disable scrolling
  });

  // Close menu
  closeBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    body.classList.remove("no-scroll"); // enable scrolling
  });

  // Optional: close if clicking outside menu items
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) {
      mobileMenu.classList.remove("active");
      body.classList.remove("no-scroll");
    }
  });
});
