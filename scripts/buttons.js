function scrollToContacts() {
  const target = document.getElementById("contacts");
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

function scrollToFeatured() {
  const target = document.querySelector(".featured-section");
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
