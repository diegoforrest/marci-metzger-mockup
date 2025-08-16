document.addEventListener("DOMContentLoaded", () => {
  const contactBtn = document.querySelector(".contact-btn");
  const closeBtn = document.querySelector(".close-btn");
  const contactInfo = document.querySelector(".contact-info");
  const messageForm = document.querySelector(".message-form");

  contactBtn.addEventListener("click", () => {
    contactInfo.style.display = "none";
    messageForm.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    messageForm.style.display = "none";
    contactInfo.style.display = "block";
  });
});
