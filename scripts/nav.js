document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenu = document.getElementById("closeMenu");

  // Open mobile menu
  burger.addEventListener("click", () => {
    mobileMenu.classList.add("active");
  });

  // Close mobile menu
  closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });

  // Optional: click outside menu to close
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) mobileMenu.classList.remove("active");
  });
});
