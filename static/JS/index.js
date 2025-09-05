/* === Variable Declarations === */

// Grab the header background container
let headerBg = document.querySelector(".headercontbackg");

// Animate the intro texts
let introHeader = document.querySelector("#hero h1");
let introPs = document.querySelectorAll("#hero p");

/* FUNCTIONS */

/* === Scroll Event: Animate Header Background === */

// Change header background to black when scrolling down
window.addEventListener("scroll", function () {
  if (!headerBg) return;

  if (window.scrollY > 115) {
    headerBg.style.backgroundColor = "black";
  } else {
    headerBg.style.backgroundColor = "transparent";
  }

  headerBg.style.transition = "300ms ease";
});

// Add a class to change header background when burger icon is clicked
$(function () {
  $(".burgericon").click(function () {
    $(".headercontbackg").toggleClass("toggleBackground");
  });
});

/* === Page Load Animation === */

// Fade in the header and paragraphs with animation on page load
window.onload = function () {
  introHeader.style.opacity = "1";
  introHeader.style.transition = "2s ease 300ms";

  for (var i = 0, l = 2; i < l; i++) {
    introPs[i].style.opacity = "1";
    introPs[i].style.transition = "2.5s ease 1.5s";
  }
};

/* === Responsive Font Resize === */

// Adjust header font size based on screen width when resizing
window.addEventListener("resize", function () {
  if (window.innerWidth < 600) {
    introHeader.style.fontSize = "4rem";
  } else if (window.innerWidth >= 850) {
    introHeader.style.fontSize = "6rem";
  }
});