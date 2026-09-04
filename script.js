"use strict";



window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    if (!preloader) return;

    setTimeout(() => {
        preloader.classList.add("hide");
    }, 700);
});




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

    if (!typeElement) return;

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typeElement.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex >= currentRole.length) {

            deleting = true;

            setTimeout(typeLoop, 1500);
            return;
        }

        setTimeout(typeLoop, 85);

    } else {

        typeElement.textContent =
            currentRole.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex <= 0) {

            charIndex = 0;
            deleting = false;

            roleIndex++;

            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }

            setTimeout(typeLoop, 400);
            return;
        }

        setTimeout(typeLoop, 45);
    }
}

if (typeElement) {
    typeLoop();
}




const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        const isOpen =
            navMenu.classList.toggle("open");

        menuBtn.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        const icon =
            menuBtn.querySelector("i");

        if (!icon) return;

        if (isOpen) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });
}




document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        if (!navMenu || !menuBtn) return;

        navMenu.classList.remove("open");

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

        const icon =
            menuBtn.querySelector("i");

        if (!icon) return;

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    });
});




const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");

function updateActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {

            currentSection =
                section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (href === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
);




const progress =
    document.getElementById("scrollProgress");

function updateScrollProgress() {

    if (!progress) return;

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    if (documentHeight <= 0) {

        progress.style.width = "0%";
        return;
    }

    const percentage =
        (scrollTop / documentHeight) * 100;

    progress.style.width =
        `${Math.min(100, Math.max(0, percentage))}%`;
}

window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);




const revealElements =
    document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(
                            entry.target
                        );
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

} else {

    revealElements.forEach(element => {
        element.classList.add("show");
    });
}



const toTop =
    document.getElementById("toTop");

function updateBackToTop() {

    if (!toTop) return;

    if (window.scrollY > 600) {

        toTop.classList.add("show");

    } else {

        toTop.classList.remove("show");
    }
}

window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
);

if (toTop) {

    toTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );
}




const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            const nameInput =
                document.getElementById("name");

            const emailInput =
                document.getElementById("email");

            const subjectInput =
                document.getElementById("subject");

            const messageInput =
                document.getElementById("message");


            if (
                !nameInput ||
                !emailInput ||
                !subjectInput ||
                !messageInput
            ) {

                console.error(
                    "Contact form fields are missing."
                );

                return;
            }


            const name =
                nameInput.value.trim();

            const email =
                emailInput.value.trim();

            const subject =
                subjectInput.value.trim();

            const message =
                messageInput.value.trim();


            

            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                alert(
                    "Please fill in all fields."
                );

                return;
            }


          

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                alert(
                    "Please enter a valid email address."
                );

                return;
            }


           

            const submitButton =
                contactForm.querySelector(
                    "button[type='submit']"
                );

            if (!submitButton) return;

            const originalButtonHTML =
                submitButton.innerHTML;

            submitButton.disabled = true;

            submitButton.innerHTML =
                `
                <span>Sending...</span>
                <i class="fa-solid fa-spinner fa-spin"></i>
                `;


            

            const formData =
                new FormData(contactForm);


            try {

                const response =
                    await fetch(
                        contactForm.action,
                        {
                            method: "POST",
                            body: formData,
                            headers: {
                                "Accept": "application/json"
                            }
                        }
                    );


                

                if (response.ok) {

                    alert(
                        "Message sent successfully! Thank you for contacting me."
                    );

                    contactForm.reset();

                } else {

                    let errorMessage =
                        "Something went wrong. Please try again.";

                    try {

                        const data =
                            await response.json();

                        if (
                            data &&
                            Array.isArray(data.errors) &&
                            data.errors.length > 0
                        ) {

                            errorMessage =
                                data.errors
                                    .map(error => error.message)
                                    .join("\n");
                        }

                    } catch (jsonError) {

                        console.error(
                            "Formspree response error:",
                            jsonError
                        );
                    }

                    alert(errorMessage);
                }

            } catch (error) {

                console.error(
                    "Formspree Error:",
                    error
                );

                alert(
                    "Unable to send the message. Please check your internet connection and try again."
                );

            } finally {

                submitButton.disabled = false;

                submitButton.innerHTML =
                    originalButtonHTML;
            }
        }
    );
}




const cards =
    document.querySelectorAll(
        ".skill-card, .project-card"
    );

cards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

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
                `
                perspective(800px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-5px)
                `;
        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";
        }
    );
});




const heroVisual =
    document.querySelector(".hero-visual");

if (heroVisual) {

    const codeCard =
        heroVisual.querySelector(".code-card");

    if (codeCard) {

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

                const rotateY =
                    (x - 0.5) * 8;

                const rotateX =
                    (y - 0.5) * -5;

                codeCard.style.transform =
                    `
                    perspective(1000px)
                    rotateY(${rotateY}deg)
                    rotateX(${rotateX}deg)
                    translateY(-5px)
                    `;
            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            () => {

                codeCard.style.transform = "";
            }
        );
    }
}




const copyright =
    document.querySelector(".copyright");

if (copyright) {

    const currentYear =
        new Date().getFullYear();

    copyright.textContent =
        `© ${currentYear} Deepika C. All Rights Reserved.`;
}




updateActiveNav();
updateScrollProgress();
updateBackToTop();