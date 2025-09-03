// ==============================
// 1. Typewriter Effect
// ==============================
const typewriter = document.getElementById("typewriter");
const phrases = [
  "Hi, I'm BISHOP.", // 👤 Intro
  "I build things for the web.", // 💻 Skills
  "Welcome to my portfolio.", // 🌍 Greeting
];
let phraseIndex = 0;
let charIndex = 0;
let forward = true;

function type() {
  const currentPhrase = phrases[phraseIndex];

  if (forward) {
    typewriter.textContent = currentPhrase.slice(0, ++charIndex);
    if (charIndex === currentPhrase.length) {
      forward = false;
      setTimeout(type, 1500); // Pause before deleting
      return;
    }
  } else {
    typewriter.textContent = currentPhrase.slice(0, --charIndex);
    if (charIndex === 0) {
      forward = true;
      phraseIndex = (phraseIndex + 1) % phrases.length; // Cycle phrases
      setTimeout(type, 400); // Short pause before typing new phrase
      return;
    }
  }
  setTimeout(type, forward ? 100 : 50); // Typing vs deleting speed
}

if (typewriter) type();

// ==============================
// 2. Scroll Reveal Animation
// ==============================
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        obs.unobserve(entry.target); // Trigger only once
      }
    });
  },
  { threshold: 0.2 }
);

document
  .querySelectorAll(".section, .card")
  .forEach((el) => observer.observe(el));

// ==============================
// 3. Dark / Light Theme Toggle
// ==============================
const toggleBtn = document.getElementById("theme-toggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const isLight =
      document.documentElement.getAttribute("data-theme") === "light";
    document.documentElement.setAttribute(
      "data-theme",
      isLight ? "dark" : "light"
    );
    toggleBtn.textContent = isLight ? "🌙" : "☀️"; // Update icon
  });
}
// ==============================
// Dynamic Posts Section
// ==============================
const posts = [
  {
    title: "Post Title One",
    desc: "Short description of the post content goes here.",
    img: "https://via.placeholder.com/400x200",
  },
  {
    title: "Post Title Two",
    desc: "Another description of content to showcase here.",
    img: "https://via.placeholder.com/400x200",
  },
  {
    title: "Post Title Three",
    desc: "A simple grid item that adapts beautifully.",
    img: "https://via.placeholder.com/400x200",
  },
];

const postGrid = document.getElementById("postGrid");

if (postGrid) {
  posts.forEach((post) => {
    const article = document.createElement("article");
    article.className = "card";
    article.innerHTML = `
      <img src="${post.img}" alt="${post.title}" />
      <div class="card-body">
        <h3>${post.title}</h3>
        <p>${post.desc}</p>
      </div>
    `;
    postGrid.appendChild(article);
  });
}
// EmailJS integration
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key

const contactForm = document.getElementById("contact-form");
const popup = document.getElementById("popup");

function showPopup(message, isError = false) {
  popup.textContent = message;
  popup.className = "popup " + (isError ? "error" : "success");
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 3500);
}

if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
      .then(() => {
        showPopup("✅ Message sent successfully!");
        contactForm.reset();
      })
      .catch(() => {
        showPopup("❌ Failed to send message. Try again.", true);
      });
  });
}
