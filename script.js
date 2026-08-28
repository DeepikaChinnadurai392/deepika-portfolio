/* =========================================================
   PRELOADER
========================================================= */

window.addEventListener("load", () => {

  const preloader = document.getElementById("preloader");

  setTimeout(() => {

    preloader.classList.add("hide");

  }, 700);

});


/* =========================================================
   TYPING EFFECT
========================================================= */

const roles = [
  "Full Stack Developer",
  "React Developer",
  "Python Developer",
  "AI/ML Enthusiast",
  "Creative Problem Solver"
];

const typeElement = document.getElementById("typeRole");

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {

  const currentRole = roles[roleIndex];

  if (!deleting) {

    typeElement.textContent =
      currentRole.substring(0, charIndex + 1);

    charIndex++;

    if (charIndex === currentRole.length) {

      deleting = true;

      setTimeout(typeLoop, 1500);

      return;

    }

  } else {

    typeElement.textContent =
      currentRole.substring(0, charIndex - 1);

    charIndex--;

    if (charIndex === 0) {

      deleting = false;

      roleIndex++;

      if (roleIndex >= roles.length) {
        roleIndex = 0;
      }

    }

  }

  setTimeout(
    typeLoop,
    deleting ? 45 : 85
  );

}

typeLoop();


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {

  navMenu.classList.toggle("open");

  const icon = menuBtn.querySelector("i");

  if (navMenu.classList.contains("open")) {

    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");

  } else {

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");

  }

});


/* CLOSE MENU WHEN CLICKING LINK */

document.querySelectorAll(".nav-link").forEach(link => {

  link.addEventListener("click", () => {

    navMenu.classList.remove("open");

    const icon = menuBtn.querySelector("i");

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");

  });

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {

  let currentSection = "";

  sections.forEach(section => {

    const sectionTop =
      section.offsetTop - 180;

    if (window.scrollY >= sectionTop) {

      currentSection = section.getAttribute("id");

    }

  });

  navLinks.forEach(link => {

    link.classList.remove("active");

    if (
      link.getAttribute("href") ===
      `#${currentSection}`
    ) {

      link.classList.add("active");

    }

  });

}

window.addEventListener(
  "scroll",
  updateActiveNav
);


/* =========================================================
   SCROLL PROGRESS
========================================================= */

const progress =
  document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {

  const scrollTop = window.scrollY;

  const documentHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const percentage =
    (scrollTop / documentHeight) * 100;

  progress.style.width =
    `${percentage}%`;

});


/* =========================================================
   REVEAL ANIMATION
========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");

const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("show");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );


revealElements.forEach(element => {

  observer.observe(element);

});


/* =========================================================
   BACK TO TOP
========================================================= */

const toTop =
  document.getElementById("toTop");

window.addEventListener("scroll", () => {

  if (window.scrollY > 600) {

    toTop.classList.add("show");

  } else {

    toTop.classList.remove("show");

  }

});


toTop.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
  document.getElementById("contactForm");

contactForm.addEventListener("submit", event => {

  event.preventDefault();

  const name =
    document.getElementById("name").value.trim();

  const email =
    document.getElementById("email").value.trim();

  const subject =
    document.getElementById("subject").value.trim();

  const message =
    document.getElementById("message").value.trim();


  if (
    !name ||
    !email ||
    !subject ||
    !message
  ) {

    alert("Please fill in all fields.");

    return;

  }


  const mailSubject =
    encodeURIComponent(subject);

  const mailBody =
    encodeURIComponent(
      `Hello Deepika,\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `${message}`
    );


  window.location.href =
    `mailto:yourmail@gmail.com?subject=${mailSubject}&body=${mailBody}`;

});


/* =========================================================
   CARD MOUSE EFFECT
========================================================= */

const cards =
  document.querySelectorAll(
    ".skill-card, .project-card"
  );


cards.forEach(card => {

  card.addEventListener("mousemove", event => {

    const rect =
      card.getBoundingClientRect();

    const x =
      event.clientX - rect.left;

    const y =
      event.clientY - rect.top;

    const centerX =
      rect.width / 2;

    const centerY =
      rect.height / 2;

    const rotateX =
      ((y - centerY) / centerY) * -2;

    const rotateY =
      ((x - centerX) / centerX) * 2;

    card.style.transform =
      `perspective(800px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       translateY(-5px)`;

  });


  card.addEventListener("mouseleave", () => {

    card.style.transform = "";

  });

});


/* =========================================================
   HERO MOUSE PARALLAX
========================================================= */

const heroVisual =
  document.querySelector(".hero-visual");

if (heroVisual) {

  heroVisual.addEventListener(
    "mousemove",
    event => {

      const rect =
        heroVisual.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
        rect.width;

      const y =
        (event.clientY - rect.top) /
        rect.height;

      const codeCard =
        heroVisual.querySelector(".code-card");

      codeCard.style.transform =
        `
        perspective(1000px)
        rotateY(${(x - .5) * 8}deg)
        rotateX(${(y - .5) * -5}deg)
        translateY(-5px)
        `;

    }
  );


  heroVisual.addEventListener(
    "mouseleave",
    () => {

      const codeCard =
        heroVisual.querySelector(".code-card");

      codeCard.style.transform =
        `
        perspective(1000px)
        rotateY(-5deg)
        rotateX(2deg)
        `;

    }
  );

}


/* =========================================================
   DYNAMIC YEAR
========================================================= */

const copyright =
  document.querySelector(".copyright");

if (copyright) {

  const year =
    new Date().getFullYear();

  copyright.innerHTML =
    `© ${year} Deepika C. All Rights Reserved.`;

}