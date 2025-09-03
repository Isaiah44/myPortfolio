// 1. Typewriter effect
const typewriter = document.getElementById("typewriter");
const phrases = [
  "Hi, I'm BISHOP.",
  "I build things for the web.",
  "Welcome to my portfolio.",
];
let phraseIndex = 0;
let charIndex = 0;
let forward = true;

function type() {
  const current = phrases[phraseIndex];
  if (forward) {
    typewriter.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      forward = false;
      setTimeout(type, 1200);
      return;
    }
  } else {
    typewriter.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      forward = true;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 300);
      return;
    }
  }
  setTimeout(type, forward ? 90 : 40);
}
type();

// 2. Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document
  .querySelectorAll(".section, .card")
  .forEach((el) => observer.observe(el));

// 3. Dark / light toggle
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  const isDark =
    document.documentElement.getAttribute("data-theme") === "light";
  document.documentElement.setAttribute(
    "data-theme",
    isDark ? "dark" : "light"
  );
  toggleBtn.textContent = isDark ? "🌙" : "☀️";
});
