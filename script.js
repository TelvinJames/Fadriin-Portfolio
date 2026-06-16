// ============================================================
// SIDEBAR (MOBILE MENU)
// ============================================================

const menuToggle    = document.querySelector(".menu-toggle");
const sidebar       = document.querySelector(".sidebar");
const sidebarClose  = document.querySelector(".sidebar-close");
const sidebarOverlay = document.querySelector(".sidebar-overlay");

function openSidebar() {
    sidebar.classList.add("open");
    sidebarOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeSidebar() {
    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("active");
    document.body.style.overflow = "";
}

menuToggle.addEventListener("click", openSidebar);
sidebarClose.addEventListener("click", closeSidebar);
sidebarOverlay.addEventListener("click", closeSidebar);

// Close sidebar when a sidebar link is clicked
document.querySelectorAll(".sidebar-links a").forEach(link => {
    link.addEventListener("click", closeSidebar);
});


// ============================================================
// NAVBAR SCROLL EFFECT
// ============================================================

const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 50);
});


// ============================================================
// ACTIVE NAV LINK (desktop)
// ============================================================

const sections = document.querySelectorAll("section");
const navItems  = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 140) {
            current = section.getAttribute("id");
        }
    });
    navItems.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
});


// ============================================================
// SCROLL REVEAL
// ============================================================

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            revealObserver.unobserve(entry.target); // animate once only
        }
    });
}, { threshold: 0.15 });

sections.forEach(section => {
    if (section.id === "home") return; // home is visible immediately, skip reveal animation
    section.classList.add("hidden");
    revealObserver.observe(section);
});


// ============================================================
// SMOOTH SCROLL (desktop nav & hero button)
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
    });
});


// ============================================================
// TYPING EFFECT
// ============================================================

const words = [
    "Medical Doctor",
    "Healthcare Advocate",
    "Patient-Centered Professional",
    "Compassionate Caregiver"
];

let wordIndex  = 0;
let charIndex  = 0;
let deleting   = false;
const typingEl = document.getElementById("typing-text");

function typeEffect() {
    const currentWord = words[wordIndex];

    if (!deleting) {
        typingEl.textContent = currentWord.substring(0, charIndex++);
        if (charIndex > currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        typingEl.textContent = currentWord.substring(0, charIndex--);
        if (charIndex <= 0) {
            deleting   = false;
            wordIndex  = (wordIndex + 1) % words.length;
        }
    }
    setTimeout(typeEffect, deleting ? 50 : 100);
}
typeEffect();


// ============================================================
// BACK TO TOP
// ============================================================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


// ============================================================
// PARTICLES
// ============================================================

const particlesContainer = document.getElementById("particles");

for (let i = 0; i < 30; i++) {
    const p    = document.createElement("div");
    const size = Math.random() * 6 + 2;
    p.classList.add("particle");
    p.style.left              = Math.random() * 100 + "%";
    p.style.width             = size + "px";
    p.style.height            = size + "px";
    p.style.animationDuration = (8 + Math.random() * 10) + "s";
    p.style.animationDelay    = Math.random() * 8 + "s";
    p.style.opacity           = String(Math.random() * 0.4 + 0.1);
    particlesContainer.appendChild(p);
}
