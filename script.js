// ======================================
// NOBEL PORTFOLIO — JAVASCRIPT
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    // 1. SMOOTH SCROLL NAVIGATION
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (event) {
            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // 2. SCROLL REVEAL ANIMATION
    const revealElements = document.querySelectorAll(
        ".about, .skills, .projects, .contact, .skill-card, .project-card"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // 3. TYPING ANIMATION
    const heroVisual = document.querySelector(".hero-visual");

    if (heroVisual) {
        const typingText = document.createElement("p");

        typingText.className = "typing-text";
        typingText.setAttribute("aria-label", "Bidang yang sedang dipelajari");
        heroVisual.appendChild(typingText);

        const words = [
            "WEB DEVELOPER",
            "PYTHON PROGRAMMER",
            "ROBLOX DEVELOPER",
            "TECH ENTHUSIAST"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];

            if (deleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            typingText.textContent = currentWord.substring(
                0,
                charIndex
            );

            let delay = deleting ? 45 : 90;

            if (!deleting && charIndex === currentWord.length) {
                deleting = true;
                delay = 1400;
            } else if (deleting && charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                delay = 350;
            }

            setTimeout(typeEffect, delay);
        }

        typeEffect();
    }


    // 4. BACK TO TOP BUTTON
    const backToTop = document.createElement("button");

    backToTop.type = "button";
    backToTop.className = "back-to-top";
    backToTop.textContent = "↑";
    backToTop.setAttribute("aria-label", "Kembali ke atas");

    document.body.appendChild(backToTop);

    window.addEventListener("scroll", () => {
        backToTop.classList.toggle(
            "show",
            window.scrollY > 400
        );
    }, { passive: true });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // 5. CARD MOUSE GLOW
    document.querySelectorAll(
        ".skill-card, .project-card"
    ).forEach(card => {

        card.addEventListener("mousemove", event => {
            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });

    });


    // 6. CURRENT YEAR
    const footerYear = document.querySelector(".footer-bottom p");

    if (footerYear) {
        footerYear.innerHTML =
            `&copy; ${new Date().getFullYear()} NOBEL — Sutan Ndaru Purnama`;
    }


    console.log("NOBEL Portfolio berhasil dijalankan! 🚀");

});

// ======================================
// UPDATE 2.0 — NOBEL PORTFOLIO
// Tempelkeun saméméh panutup DOMContentLoaded
// ======================================


// 1. BACKGROUND PARTICLES
const particleCanvas = document.createElement("canvas");
particleCanvas.id = "nobel-particles";
particleCanvas.setAttribute("aria-hidden", "true");
document.body.prepend(particleCanvas);

const particleContext = particleCanvas.getContext("2d");
let particles = [];
let particleAnimation;

function createParticles() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const amount = Math.min(
        65,
        Math.floor((width * height) / 18000)
    );

    particleCanvas.width = width;
    particleCanvas.height = height;

    particles = Array.from({ length: amount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.5,
        speed: Math.random() * 0.25 + 0.08,
        opacity: Math.random() * 0.5 + 0.2
    }));
}

function animateParticles() {
    if (!particleContext) return;

    particleContext.clearRect(
        0,
        0,
        particleCanvas.width,
        particleCanvas.height
    );

    particles.forEach(particle => {
        particle.y -= particle.speed;

        if (particle.y < 0) {
            particle.y = particleCanvas.height;
            particle.x = Math.random() * particleCanvas.width;
        }

        particleContext.beginPath();
        particleContext.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
        );

        particleContext.fillStyle =
            `rgba(190, 150, 255, ${particle.opacity})`;

        particleContext.fill();
    });

    particleAnimation = requestAnimationFrame(animateParticles);
}

if (
    particleContext &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
    createParticles();
    animateParticles();

    window.addEventListener("resize", createParticles);

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            cancelAnimationFrame(particleAnimation);
        } else {
            animateParticles();
        }
    });
}


// 2. SKILL PROGRESS BARS
const skillLevels = [
    { name: "Python", level: 45 },
    { name: "Git & GitHub", level: 50 },
    { name: "Roblox Studio", level: 65 },
    { name: "HTML", level: 55 },
    { name: "CSS", level: 40 },
    { name: "VS Code", level: 60 }
];

const skillCards = document.querySelectorAll(
    "#skills .skill-card"
);

skillCards.forEach((card, index) => {
    const skill = skillLevels[index];

    if (!skill) return;

    const progress = document.createElement("div");
    progress.className = "skill-progress";

    progress.innerHTML = `
        <div class="skill-progress-header">
            <span>Learning Progress</span>
            <span>${skill.level}%</span>
        </div>
        <div class="skill-progress-track"
             role="progressbar"
             aria-label="${skill.name} — indikator belajar"
             aria-valuemin="0"
             aria-valuemax="100"
             aria-valuenow="${skill.level}">
            <div class="skill-progress-fill"></div>
        </div>
    `;

    card.appendChild(progress);

    const fill = progress.querySelector(".skill-progress-fill");

    const progressObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fill.style.width = `${skill.level}%`;
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    progressObserver.observe(progress);
});


// 3. LIVE CLOCK
const clock = document.createElement("div");
clock.className = "nobel-clock";
clock.setAttribute("aria-label", "Waktu lokal perangkat");
clock.setAttribute("aria-live", "off");

const heroContent = document.querySelector(".hero-content");

if (heroContent) {
    clock.textContent = "Waktu lokal: --:--:--";
    heroContent.appendChild(clock);

    function updateClock() {
        clock.textContent = "Waktu lokal: " +
            new Intl.DateTimeFormat("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            }).format(new Date());
    }

    updateClock();
    setInterval(updateClock, 1000);
}


// 4. CONTACT TOAST
const toast = document.createElement("div");
toast.className = "nobel-toast";
toast.setAttribute("role", "status");
toast.setAttribute("aria-live", "polite");
document.body.appendChild(toast);

let toastTimeout;

function showNobelToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

document.querySelectorAll(
    '.contact a[href*="instagram.com"], .contact a[href*="github.com"]'
).forEach(link => {
    link.addEventListener("click", () => {
        showNobelToast(
            `Membuka ${link.textContent.trim()}...`
        );
    });
});

// =====================================
// NOBEL PORTFOLIO — UPDATE 3.0
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    // 1. PROJECT FILTER
    const projectSection = document.querySelector("#projects");
    const projectGrid = projectSection?.querySelector(".project-grid");
    const projectCards = projectGrid
        ? Array.from(projectGrid.querySelectorAll(".project-card"))
        : [];

    if (projectGrid && projectCards.length) {
        const filters = document.createElement("div");
        filters.className = "project-filters";
        filters.setAttribute("aria-label", "Filter proyek");

        const categories = [
            { label: "All Projects", value: "all" },
            { label: "Programming", value: "programming" },
            { label: "Game Development", value: "game" },
            { label: "Web Development", value: "web" }
        ];

        categories.forEach(category => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "project-filter";
            button.textContent = category.label;
            button.dataset.filter = category.value;

            if (category.value === "all") {
                button.classList.add("active");
                button.setAttribute("aria-pressed", "true");
            } else {
                button.setAttribute("aria-pressed", "false");
            }

            filters.appendChild(button);
        });

        projectGrid.parentNode.insertBefore(filters, projectGrid);

        function getCategory(card) {
            const text = (
                card.querySelector("h3")?.textContent + " " +
                card.querySelector(".project-image")?.textContent + " " +
                card.querySelector(".project-tags")?.textContent
            ).toLowerCase();

            if (text.includes("python")) return "programming";
            if (text.includes("roblox") || text.includes("game development")) {
                return "game";
            }
            if (text.includes("portfolio") || text.includes("web development")) {
                return "web";
            }

            return "all";
        }

        filters.addEventListener("click", event => {
            const button = event.target.closest(".project-filter");
            if (!button) return;

            filters.querySelectorAll(".project-filter").forEach(item => {
                const active = item === button;
                item.classList.toggle("active", active);
                item.setAttribute("aria-pressed", String(active));
            });

            projectCards.forEach(card => {
                const matches =
                    button.dataset.filter === "all" ||
                    getCategory(card) === button.dataset.filter;

                card.classList.toggle("filter-hidden", !matches);
            });
        });
    }


    // 2. PROJECT DETAIL MODAL
    const modal = document.createElement("div");
    modal.className = "project-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "project-modal-title");

    modal.innerHTML = `
        <div class="project-modal-content">
            <button class="project-modal-close"
                    type="button"
                    aria-label="Tutup detail proyek">&times;</button>
            <p class="section-label">PROJECT DETAILS</p>
            <h3 id="project-modal-title"></h3>
            <p class="project-modal-description"></p>
            <div class="project-modal-tags"></div>
            <a class="project-modal-link"
               target="_blank"
               rel="noopener noreferrer"
               hidden>View Source Code ↗</a>
        </div>
    `;

    document.body.appendChild(modal);

    const modalTitle = modal.querySelector("#project-modal-title");
    const modalDescription = modal.querySelector(".project-modal-description");
    const modalTags = modal.querySelector(".project-modal-tags");
    const modalLink = modal.querySelector(".project-modal-link");
    const closeButton = modal.querySelector(".project-modal-close");

    let previousFocus = null;

    function closeModal() {
        modal.classList.remove("open");
        document.body.style.overflow = "";

        if (previousFocus) previousFocus.focus();
    }

    function openModal(card, trigger) {
        previousFocus = trigger;

        modalTitle.textContent =
            card.querySelector("h3")?.textContent || "Project";

        modalDescription.textContent =
            card.querySelector(".project-info > p:not(.project-number)")?.textContent.trim()
            || "Detail proyek.";

        modalTags.replaceChildren();

        card.querySelectorAll(".project-tags span, .project-info > .tag")
            .forEach(tag => {
                const span = document.createElement("span");
                span.className = "tag";
                span.textContent = tag.textContent;
                modalTags.appendChild(span);
            });

        const sourceLink = card.querySelector(
            'a[href*="github.com"]'
        );

        if (sourceLink) {
            modalLink.href = sourceLink.href;
            modalLink.hidden = false;
        } else {
            modalLink.removeAttribute("href");
            modalLink.hidden = true;
        }

        modal.classList.add("open");
        document.body.style.overflow = "hidden";
        closeButton.focus();
    }

    projectCards.forEach(card => {
        const info = card.querySelector(".project-info");
        if (!info) return;

        const button = document.createElement("button");
        button.type = "button";
        button.className = "project-detail-btn";
        button.textContent = "View Project Details ↗";

        info.appendChild(button);

        button.addEventListener("click", () => {
            openModal(card, button);
        });
    });

    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", event => {
        if (event.target === modal) closeModal();
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && modal.classList.contains("open")) {
            closeModal();
        }
    });


    // 3. MOBILE NAVIGATION
    const navbar = document.querySelector(".navbar");
    const nav = navbar?.querySelector("nav");

    if (navbar && nav) {
        const menuButton = document.createElement("button");
        menuButton.type = "button";
        menuButton.className = "mobile-menu-toggle";
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "Buka menu navigasi");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-controls", "nobel-navigation");

        nav.id = "nobel-navigation";
        navbar.insertBefore(menuButton, nav);

        menuButton.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("mobile-nav-open");

            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
            );
            menuButton.textContent = isOpen ? "✕" : "☰";
        });

        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("mobile-nav-open");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Buka menu navigasi");
                menuButton.textContent = "☰";
            });
        });
    }


    // 4. MAGNETIC-LIKE BUTTON HOVER
    // Efek ringan untuk mouse; tidak mengganggu layar sentuh.
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    if (finePointer) {
        document.querySelectorAll(".btn, .project-detail-btn").forEach(button => {
            button.addEventListener("mousemove", event => {
                const rect = button.getBoundingClientRect();
                const x = event.clientX - rect.left - rect.width / 2;
                const y = event.clientY - rect.top - rect.height / 2;

                button.style.transform =
                    `translate(${x * 0.04}px, ${y * 0.08}px)`;
            });

            button.addEventListener("mouseleave", () => {
                button.style.transform = "";
            });
        });
    }

    console.log("NOBEL Portfolio Update 3.0 siap! 🚀");
    // ======================================
// NOBEL PORTFOLIO — UPDATE 4.0
// ======================================


// 1. CREATE THEME AND LANGUAGE CONTROLS
const portfolioNavbar = document.querySelector(".navbar");

if (portfolioNavbar && !document.querySelector(".portfolio-controls")) {

    const controls = document.createElement("div");
    controls.className = "portfolio-controls";

    controls.innerHTML = `
        <button type="button"
                class="portfolio-control-btn"
                id="theme-toggle"
                aria-label="Ganti tema">
            ☀️ Light
        </button>

        <button type="button"
                class="portfolio-control-btn"
                id="language-toggle"
                aria-label="Change language">
            🇬🇧 EN
        </button>
    `;

    portfolioNavbar.appendChild(controls);


    // 2. DARK / LIGHT MODE
    const themeButton = controls.querySelector("#theme-toggle");

    let savedTheme = "dark";

    try {
        savedTheme = localStorage.getItem("nobel-theme") || "dark";
    } catch (error) {
        console.warn("Preferensi tema tidak bisa disimpan.");
    }

    function applyTheme(theme) {
        const isLight = theme === "light";

        document.body.classList.toggle("light-theme", isLight);

        themeButton.textContent = isLight ? "🌙 Dark" : "☀️ Light";

        themeButton.setAttribute(
            "aria-label",
            isLight ? "Ganti ke tema gelap" : "Ganti ke tema terang"
        );
    }

    applyTheme(savedTheme);

    themeButton.addEventListener("click", () => {
        const nextTheme = document.body.classList.contains("light-theme")
            ? "dark"
            : "light";

        applyTheme(nextTheme);

        try {
            localStorage.setItem("nobel-theme", nextTheme);
        } catch (error) {
            console.warn("Preferensi tema tidak bisa disimpan.");
        }
    });


    // 3. INDONESIAN / ENGLISH
    const languageButton = controls.querySelector("#language-toggle");

    const translations = {
        id: {
            "Home": "Beranda",
            "About": "Tentang",
            "Skills": "Keahlian",
            "Projects": "Proyek",
            "Certificates": "Sertifikat",
            "Journey": "Perjalanan",
            "Contact": "Kontak",
            "HELLO, WORLD! I'M": "HALO, DUNIA! SAYA",
            "Explore My Projects ↗️": "Lihat Proyek Saya ↗️",
            "Download Portfolio PDF ↓": "Unduh Portofolio PDF ↓",
            "Mengenal Saya.": "Mengenal Saya.",
            "Keahlian Saya.": "Keahlian Saya.",
            "Proyek Pilihan.": "Proyek Pilihan.",
            "Sertifikasi & Pembelajaran.": "Sertifikasi & Pembelajaran.",
            "Perjalanan Saya.": "Perjalanan Saya.",
            "Ayo Kita Ngobrol.": "Ayo Kita Ngobrol.",
            "View Source Code ↗️": "Lihat Kode Sumber ↗️",
            "View Project Details ↗": "Lihat Detail Proyek ↗",
            "Personal Project": "Proyek Pribadi",
            "Website Portfolio": "Website Portofolio",
            "TECH ENTHUSIAST": "PENCINTA TEKNOLOGI",
            "Terus belajar, terus berkembang.": "Terus belajar, terus berkembang."
        },

        en: {
            "Beranda": "Home",
            "Tentang": "About",
            "Keahlian": "Skills",
            "Proyek": "Projects",
            "Sertifikat": "Certificates",
            "Perjalanan": "Journey",
            "Kontak": "Contact",
            "HALO, DUNIA! SAYA": "HELLO, WORLD! I'M",
            "Lihat Proyek Saya ↗️": "Explore My Projects ↗️",
            "Unduh Portofolio PDF ↓": "Download Portfolio PDF ↓",
            "Mengenal Saya.": "About Me.",
            "Keahlian Saya.": "My Skills.",
            "Proyek Pilihan.": "Selected Projects.",
            "Sertifikasi & Pembelajaran.": "Certificates & Learning.",
            "Perjalanan Saya.": "My Journey.",
            "Ayo Kita Ngobrol.": "Let's Connect.",
            "Lihat Kode Sumber ↗️": "View Source Code ↗️",
            "Lihat Detail Proyek ↗": "View Project Details ↗",
            "Proyek Pribadi": "Personal Project",
            "Website Portofolio": "Portfolio Website",
            "PENCINTA TEKNOLOGI": "TECH ENTHUSIAST",
            "Terus belajar, terus berkembang.": "Keep learning, keep growing."
        }
    };

    // Simpan teks asli supaya pergantian bahasa bisa dibalik.
    const translatableElements = [];

    function registerText(element) {
        if (!element || translatableElements.some(item => item.element === element)) {
            return;
        }

        translatableElements.push({
            element,
            originalText: element.textContent.trim()
        });
    }

    document.querySelectorAll(
        ".navbar nav a, .hero-content .intro, .hero-content .btn, " +
        ".about h2, .skills h2, .projects h2, .contact h2, " +
        ".project-link, .project-detail-btn, .tag, .hero-visual > p, " +
        ".footer-content > p"
    ).forEach(registerText);

    let savedLanguage = "id";

    try {
        savedLanguage = localStorage.getItem("nobel-language") || "id";
    } catch (error) {
        console.warn("Preferensi bahasa tidak bisa disimpan.");
    }

    function applyLanguage(language) {
        const dictionary = translations[language];

        translatableElements.forEach(item => {
            const text = item.originalText;
            let translated = text;

            if (language === "en") {
                translated = dictionary[text] || text;
            } else {
                translated = dictionary[text] || text;
            }

            // Pertahankan titik dekoratif pada judul jika ada.
            item.element.textContent = translated;
        });

        languageButton.textContent = language === "id" ? "🇬🇧 EN" : "🇮🇩 ID";

        document.documentElement.lang = language;
    }

    applyLanguage(savedLanguage);

    languageButton.addEventListener("click", () => {
        savedLanguage = savedLanguage === "id" ? "en" : "id";

        applyLanguage(savedLanguage);

        try {
            localStorage.setItem("nobel-language", savedLanguage);
        } catch (error) {
            console.warn("Preferensi bahasa tidak bisa disimpan.");
        }
    });

}

console.log("NOBEL Portfolio Update 4.0 siap! 🌗🌐");
});

// ==============================
// UPDATE 5.1 - PREMIUM LOADER
// ==============================

document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("nobel-loader");

    if (!loader) return;

    const progress = loader.querySelector(".loader-progress");
    const content = loader.querySelector(".loader-percent");

    // Tambahkan angka persentase
    if (content) {
        content.innerHTML = 'LOADING <strong>0%</strong>';
    }

    // Buat partikel dekoratif
    for (let i = 0; i < 24; i++) {
        const particle = document.createElement("span");
        particle.className = "loader-particle";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.animationDelay = Math.random() * 3 + "s";
        particle.style.animationDuration = (3 + Math.random() * 3) + "s";

        loader.appendChild(particle);
    }

    // Durasi animasi minimal 3 detik
    const duration = 3200;
    const startTime = performance.now();

    let finished = false;
    let animationFrame;

    function hideLoader() {
        if (finished) return;

        finished = true;
        cancelAnimationFrame(animationFrame);

        if (progress) progress.style.width = "100%";
        if (content) content.innerHTML = "LOADING <strong>100%</strong>";

        loader.classList.add("loader-hidden");

        setTimeout(() => {
            loader.remove();
        }, 850);
    }

    function updateProgress(now) {
        if (finished) return;

        const elapsed = now - startTime;
        const percentage = Math.min(elapsed / duration * 100, 100);

        if (progress) {
            progress.style.width = percentage + "%";
        }

        if (content) {
            content.innerHTML =
                'LOADING <strong>' + Math.floor(percentage) + '%</strong>';
        }

        if (elapsed >= duration) {
            hideLoader();
            return;
        }

        animationFrame = requestAnimationFrame(updateProgress);
    }

    // Mulai animasi persentase
    animationFrame = requestAnimationFrame(updateProgress);

    // Tunggu halaman selesai dimuat, lalu pastikan
    // loading screen tampil minimal selama 3,2 detik.
    const pageReady = document.readyState === "complete"
        ? Promise.resolve()
        : new Promise(resolve => {
            window.addEventListener("load", resolve, { once: true });
        });

    pageReady.then(() => {
        const remaining = Math.max(0, duration - (performance.now() - startTime));

        setTimeout(() => {
            hideLoader();
        }, remaining);
    });

    // Pengaman agar loader tidak menutupi halaman selamanya.
    setTimeout(hideLoader, 10000);
});
// ==============================
// UPDATE 6.0 - INTERACTIVE
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    // 1. SCROLL PROGRESS BAR
    let scrollBar = document.getElementById("nobel-scroll-progress");

    if (!scrollBar) {
        scrollBar = document.createElement("div");
        scrollBar.id = "nobel-scroll-progress";
        document.body.appendChild(scrollBar);
    }

    function updateScrollProgress() {
        const scrollableHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const percentage = scrollableHeight > 0
            ? (window.scrollY / scrollableHeight) * 100
            : 0;

        scrollBar.style.width = percentage + "%";
    }

    window.addEventListener("scroll", updateScrollProgress, {
        passive: true
    });

    window.addEventListener("resize", updateScrollProgress);
    updateScrollProgress();


    // 2. MOUSE GLOW EFFECT
    if (
        window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        let glow = document.getElementById("nobel-cursor-glow");

        if (!glow) {
            glow = document.createElement("div");
            glow.id = "nobel-cursor-glow";
            document.body.appendChild(glow);
        }

        document.addEventListener("mousemove", event => {
            glow.style.left = event.clientX + "px";
            glow.style.top = event.clientY + "px";
            glow.style.opacity = "1";
        });

        document.addEventListener("mouseleave", () => {
            glow.style.opacity = "0";
        });
    }


    // 3. MAGNETIC BUTTONS
    if (
        window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        const buttons = document.querySelectorAll(
            ".btn, button, .button"
        );

        buttons.forEach(button => {
            if (button.closest("#nobel-loader")) return;

            button.classList.add("magnetic-button");

            button.addEventListener("mousemove", event => {
                const rect = button.getBoundingClientRect();

                const x = event.clientX - rect.left - rect.width / 2;
                const y = event.clientY - rect.top - rect.height / 2;

                button.style.transform =
                    `translate(${x * 0.08}px, ${y * 0.08}px)`;
            });

            button.addEventListener("mouseleave", () => {
                button.style.transform = "";
            });
        });
    }


    // 4. STATISTICS COUNTER
    // Angka ini adalah contoh data portofolio,
    // silakan sesuaikan dengan progres sebenarnya.
    const statistics = [
        {
            number: 3,
            suffix: "+",
            label: "Project"
        },
        {
            number: 6,
            suffix: "+",
            label: "Skills"
        },
        {
            number: 1,
            suffix: "+",
            label: "Years Learning"
        }
    ];

    // Jangan buat bagian statistik dua kali.
    // Tambahkan hanya jika belum ada.
    if (!document.querySelector(".nobel-statistics")) {
        const aboutSection = document.querySelector("#about");

        if (aboutSection) {
            const statsContainer = document.createElement("div");
            statsContainer.className = "nobel-statistics";

            statistics.forEach(stat => {
                const card = document.createElement("div");
                card.className = "nobel-stat-card";

                card.innerHTML = `
                    <span class="nobel-stat-number"
                        data-target="${stat.number}"
                        data-suffix="${stat.suffix}">0${stat.suffix}</span>
                    <span class="nobel-stat-label">${stat.label}</span>
                `;

                statsContainer.appendChild(card);
            });

            aboutSection.appendChild(statsContainer);
        }
    }

    const counters = document.querySelectorAll(
        ".nobel-stat-number[data-target]"
    );

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function animateCounter(counter) {
        if (counter.dataset.animated === "true") return;

        counter.dataset.animated = "true";

        const target = Number(counter.dataset.target);
        const suffix = counter.dataset.suffix || "";

        if (reducedMotion) {
            counter.textContent = target + suffix;
            return;
        }

        const duration = 1200;
        const start = performance.now();

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(eased * target);

            counter.textContent = value + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target + suffix;
            }
        }

        requestAnimationFrame(update);
    }

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        counters.forEach(counter => observer.observe(counter));
    } else {
        counters.forEach(animateCounter);
    }

    console.log("NOBEL Portfolio Update 6.0 siap!");
});
// ==============================
// UPDATE 9.0 - NOBEL TERMINAL
// ==============================

document.addEventListener("DOMContentLoaded", () => {
    // Hindari membuat terminal dua kali.
    if (document.querySelector(".nobel-terminal")) return;

    // Cari bagian About.
    const aboutSection = document.querySelector("#about");

    if (!aboutSection) {
        console.warn("Bagian About belum ditemukan.");
        return;
    }

    // Buat terminal.
    const terminal = document.createElement("div");
    terminal.className = "nobel-terminal";

    terminal.innerHTML = `
        <div class="nobel-terminal-header">
            <span class="nobel-terminal-dot red"></span>
            <span class="nobel-terminal-dot yellow"></span>
            <span class="nobel-terminal-dot green"></span>
            <span class="nobel-terminal-title">
                nobel@portfolio: ~
            </span>
        </div>

        <div class="nobel-terminal-body"
             aria-label="Animasi terminal portofolio">
            <div class="nobel-terminal-output"></div>
            <div class="nobel-terminal-current">
                <span class="nobel-terminal-prompt">nobel@portfolio:~$</span>
                <span class="nobel-terminal-cursor"></span>
            </div>

            <div class="nobel-terminal-status">
                <span class="nobel-terminal-status-dot"></span>
                PORTFOLIO ONLINE
            </div>
        </div>
    `;

    aboutSection.appendChild(terminal);

    const output = terminal.querySelector(".nobel-terminal-output");

    const messages = [
        {
            text: "Initializing NOBEL Portfolio...",
            className: "nobel-terminal-info"
        },
        {
            text: "[OK] Profile loaded successfully.",
            className: "nobel-terminal-success"
        },
        {
            text: "[OK] Skills: Python, HTML, CSS, JavaScript.",
            className: "nobel-terminal-success"
        },
        {
            text: "[OK] Projects database initialized.",
            className: "nobel-terminal-success"
        },
        {
            text: "Status: Learning, building, improving.",
            className: "nobel-terminal-info"
        },
        {
            text: "System ready. Welcome to NOBEL Portfolio!",
            className: "nobel-terminal-success"
        }
    ];

    let messageIndex = 0;

    function typeNextMessage() {
        if (messageIndex >= messages.length) return;

        const message = messages[messageIndex];
        const line = document.createElement("p");

        line.className =
            "nobel-terminal-line " + message.className;

        output.appendChild(line);

        let characterIndex = 0;

        function typeCharacter() {
            if (characterIndex < message.text.length) {
                line.textContent += message.text.charAt(characterIndex);
                characterIndex++;

                terminal.querySelector(".nobel-terminal-body")
                    .scrollTop = terminal.querySelector(
                        ".nobel-terminal-body"
                    ).scrollHeight;

                setTimeout(typeCharacter, 22);
            } else {
                messageIndex++;
                setTimeout(typeNextMessage, 350);
            }
        }

        typeCharacter();
    }

    // Mulai animasi ketika terminal terlihat.
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) {
                observer.disconnect();
                typeNextMessage();
            }
        }, {
            threshold: 0.2
        });

        observer.observe(terminal);
    } else {
        typeNextMessage();
    }

    console.log("NOBEL Terminal Update 9.0 siap!");
});
// ==============================
// UPDATE 10.0 - CONTACT FORM
// ==============================

document.addEventListener("DOMContentLoaded", () => {
    // Cari bagian Contact yang sudah ada.
    const contactSection = document.querySelector(
        "#contact, .contact"
    );

    if (!contactSection) {
        console.warn("Bagian Contact belum ditemukan.");
        return;
    }

    // Hindari membuat form dua kali.
    if (contactSection.querySelector(".nobel-contact-form")) return;

    // GANTI dengan alamat email yang memang kamu gunakan.
    const recipientEmail = "Sutanndaru@gmail.com";

    const form = document.createElement("form");
    form.className = "nobel-contact-form";

    form.innerHTML = `
        <div class="form-heading">
            <h3>Let's Work Together</h3>
            <p>
                Punya pertanyaan atau ingin berkolaborasi?
                Kirim pesan melalui formulir ini.
            </p>
        </div>

        <div class="nobel-form-grid">
            <div class="nobel-form-field">
                <label for="nobel-contact-name">Nama</label>
                <input
                    id="nobel-contact-name"
                    name="name"
                    type="text"
                    maxlength="100"
                    placeholder="Masukkan nama"
                    autocomplete="name"
                    required
                >
            </div>

            <div class="nobel-form-field">
                <label for="nobel-contact-email">Email</label>
                <input
                    id="nobel-contact-email"
                    name="email"
                    type="email"
                    maxlength="254"
                    placeholder="nama@email.com"
                    autocomplete="email"
                    required
                >
            </div>

            <div class="nobel-form-field full-width">
                <label for="nobel-contact-subject">Subjek</label>
                <input
                    id="nobel-contact-subject"
                    name="subject"
                    type="text"
                    maxlength="150"
                    placeholder="Tujuan pesan"
                    required
                >
            </div>

            <div class="nobel-form-field full-width">
                <label for="nobel-contact-message">Pesan</label>
                <textarea
                    id="nobel-contact-message"
                    name="message"
                    maxlength="3000"
                    placeholder="Tulis pesan di sini..."
                    required
                ></textarea>
            </div>
        </div>

        <button class="nobel-form-submit" type="submit">
            Siapkan Email ↗
        </button>

        <p class="nobel-form-status"
           role="status"
           aria-live="polite"></p>
    `;

    contactSection.appendChild(form);

    const status = form.querySelector(".nobel-form-status");

    form.addEventListener("submit", event => {
        event.preventDefault();

        if (!form.reportValidity()) return;

        if (
            recipientEmail === "EMAIL_KAMU@example.com" ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)
        ) {
            status.style.color = "#ffb86b";
            status.textContent =
                "Atur recipientEmail di script.js dengan alamat email tujuan terlebih dahulu.";
            return;
        }

        const formData = new FormData(form);

        const name = formData.get("name").trim();
        const senderEmail = formData.get("email").trim();
        const subject = formData.get("subject").trim();
        const message = formData.get("message").trim();

        const emailBody = [
            "Nama: " + name,
            "Email pengirim: " + senderEmail,
            "",
            "Pesan:",
            message
        ].join("\n");

        const mailto =
            "mailto:" + recipientEmail +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(emailBody);

        status.style.color = "#67e8a5";
        status.textContent =
            "Membuka aplikasi email. Periksa kembali pesan sebelum mengirim.";

        window.location.href = mailto;
    });

    console.log("NOBEL Contact Form Update 10.0 siap!");
});

console.log("NOBEL Portfolio Update 5.1 siap!");

// ======================================
// NOBEL COMMAND CENTER 11.0
// ======================================

document.addEventListener("DOMContentLoaded", () => {
    // Hindari membuat Command Center dua kali.
    if (document.querySelector(".nobel-command-overlay")) return;

    const overlay = document.createElement("div");
    overlay.className = "nobel-command-overlay";

    overlay.innerHTML = `
        <div class="nobel-command-box"
             role="dialog"
             aria-modal="true"
             aria-label="NOBEL Command Center">

            <div class="nobel-command-header">
                <span class="nobel-command-icon">⌘</span>

                <input
                    class="nobel-command-input"
                    type="text"
                    placeholder="Cari bagian website..."
                    autocomplete="off"
                    aria-label="Cari bagian website"
                >
            </div>

            <div class="nobel-command-list"></div>

            <div class="nobel-command-footer">
                <span>↑ ↓ Pilih</span>
                <span><kbd>Enter</kbd> Buka</span>
                <span><kbd>Esc</kbd> Tutup</span>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    const input = overlay.querySelector(".nobel-command-input");
    const list = overlay.querySelector(".nobel-command-list");

    const commands = [
        { name: "Home", target: "#home", icon: "⌂" },
        { name: "About Me", target: "#about", icon: "◈" },
        { name: "Skills", target: "#skills", icon: "⚡" },
        { name: "Projects", target: "#projects", icon: "⌘" },
        { name: "Certificates", target: "#certificates", icon: "◇" },
        { name: "Journey", target: "#journey", icon: "↗" },
        { name: "Contact", target: "#contact", icon: "✉" }
    ];

    let filtered = [];
    let selected = 0;
    let previousFocus = null;

    function updateSelection() {
        const buttons = list.querySelectorAll(".nobel-command-item");

        buttons.forEach((button, index) => {
            button.classList.toggle("selected", index === selected);
            button.setAttribute(
                "aria-selected",
                String(index === selected)
            );
        });

        if (buttons[selected]) {
            buttons[selected].scrollIntoView({
                block: "nearest"
            });
        }
    }

    function navigateTo(command) {
        const target = document.querySelector(command.target);

        if (!target) return;

        closeCommandCenter();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        history.replaceState(null, "", command.target);
    }

    function renderCommands() {
        const query = input.value.trim().toLowerCase();

        filtered = commands.filter(command => {
            return (
                command.name.toLowerCase().includes(query) &&
                document.querySelector(command.target)
            );
        });

        selected = 0;
        list.replaceChildren();

        if (filtered.length === 0) {
            const empty = document.createElement("div");

            empty.className = "nobel-command-empty";
            empty.textContent = "Te kapanggih, bre. Coba kecap séjén.";

            list.appendChild(empty);
            return;
        }

        filtered.forEach((command, index) => {
            const button = document.createElement("button");

            button.type = "button";
            button.className = "nobel-command-item";
            button.setAttribute("role", "option");

            const label = document.createElement("span");
            label.textContent = command.icon + "  " + command.name;

            const targetLabel = document.createElement("small");
            targetLabel.textContent = command.target;

            button.append(label, targetLabel);

            button.addEventListener("mouseenter", () => {
                selected = index;
                updateSelection();
            });

            button.addEventListener("click", () => {
                navigateTo(command);
            });

            list.appendChild(button);
        });

        updateSelection();
    }

    function openCommandCenter() {
        previousFocus = document.activeElement;

        overlay.classList.add("active");
        input.value = "";

        renderCommands();
        input.focus();
    }

    function closeCommandCenter() {
        overlay.classList.remove("active");

        if (previousFocus && typeof previousFocus.focus === "function") {
            previousFocus.focus();
        }
    }

    input.addEventListener("input", renderCommands);

    input.addEventListener("keydown", event => {
        if (event.key === "ArrowDown" && filtered.length > 0) {
            event.preventDefault();

            selected = (selected + 1) % filtered.length;
            updateSelection();
        }

        if (event.key === "ArrowUp" && filtered.length > 0) {
            event.preventDefault();

            selected =
                (selected - 1 + filtered.length) % filtered.length;

            updateSelection();
        }

        if (event.key === "Enter" && filtered[selected]) {
            event.preventDefault();
            navigateTo(filtered[selected]);
        }

        if (event.key === "Escape") {
            closeCommandCenter();
        }
    });

    overlay.addEventListener("click", event => {
        if (event.target === overlay) {
            closeCommandCenter();
        }
    });

    document.addEventListener("keydown", event => {
        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {
            event.preventDefault();

            if (overlay.classList.contains("active")) {
                closeCommandCenter();
            } else {
                openCommandCenter();
            }
        }
    });

    console.log("NOBEL Command Center 11.0 siap! 🚀");
});
// ==========================================
// NOBEL COMMAND CENTER 11.0
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".nobel-command-overlay")) return;

    const commands = [
        {
            name: "Home",
            description: "Kembali ke halaman utama",
            keywords: "home beranda atas",
            action: () => window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        },
        {
            name: "About",
            description: "Lihat informasi tentang NOBEL",
            keywords: "about profil tentang saya",
            action: () => goToSection("about")
        },
        {
            name: "Skills",
            description: "Lihat kemampuan dan teknologi",
            keywords: "skills kemampuan teknologi",
            action: () => goToSection("skills")
        },
        {
            name: "Projects",
            description: "Lihat proyek yang sudah dibuat",
            keywords: "projects proyek karya",
            action: () => goToSection("projects")
        },
        {
            name: "Certificates",
            description: "Lihat sertifikat pembelajaran",
            keywords: "certificates sertifikat",
            action: () => goToSection("certificates")
        },
        {
            name: "Journey",
            description: "Lihat perjalanan belajar",
            keywords: "journey perjalanan pengalaman",
            action: () => goToSection("journey")
        },
        {
            name: "Contact",
            description: "Hubungi NOBEL",
            keywords: "contact kontak email",
            action: () => goToSection("contact")
        },
        {
            name: "GitHub",
            description: "Buka profil GitHub NOBEL",
            keywords: "github repository kode",
            action: () => window.open(
                "https://github.com/nobel2323",
                "_blank",
                "noopener,noreferrer"
            )
        },
        {
            name: "Instagram",
            description: "Buka Instagram NOBEL",
            keywords: "instagram sosial media",
            action: () => window.open(
                "https://www.instagram.com/ndaprnma_/",
                "_blank",
                "noopener,noreferrer"
            )
        },
        {
            name: "Back to Top",
            description: "Kembali ke bagian paling atas",
            keywords: "top atas kembali",
            action: () => window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }
    ];

    function goToSection(id) {
        const section = document.getElementById(id);

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        } else {
            console.warn("Bagian #" + id + " tidak ditemukan.");
        }
    }

    // Membuat Command Center secara otomatis
    const overlay = document.createElement("div");
    overlay.className = "nobel-command-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "NOBEL Command Center");

    overlay.innerHTML = `
        <div class="nobel-command-box">
            <div class="nobel-command-header">
                <span class="nobel-command-logo">N.</span>
                <span>NOBEL COMMAND CENTER</span>
                <button class="nobel-command-close"
                        type="button"
                        aria-label="Tutup Command Center">✕</button>
            </div>

            <input
                class="nobel-command-search"
                type="search"
                placeholder="Cari perintah..."
                autocomplete="off"
                aria-label="Cari perintah"
            >

            <div class="nobel-command-list"></div>

            <div class="nobel-command-footer">
                <span>↑ ↓ Navigasi</span>
                <span>ENTER Pilih</span>
                <span>ESC Tutup</span>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    const search = overlay.querySelector(".nobel-command-search");
    const list = overlay.querySelector(".nobel-command-list");
    const closeButton = overlay.querySelector(".nobel-command-close");

    let selectedIndex = 0;
    let filteredCommands = [];

    function closeCommandCenter() {
        overlay.classList.remove("active");
    }

    function openCommandCenter() {
        overlay.classList.add("active");
        search.value = "";
        renderCommands("");
        search.focus();
    }

    function renderCommands(query) {
        const normalizedQuery = query.trim().toLowerCase();

        filteredCommands = commands.filter(command => {
            const searchableText = (
                command.name + " " +
                command.description + " " +
                command.keywords
            ).toLowerCase();

            return searchableText.includes(normalizedQuery);
        });

        selectedIndex = 0;
        list.innerHTML = "";

        if (filteredCommands.length === 0) {
            list.innerHTML = `
                <div class="nobel-command-empty">
                    Tidak ada perintah yang cocok.
                </div>
            `;
            return;
        }

        filteredCommands.forEach((command, index) => {
            const item = document.createElement("button");

            item.type = "button";
            item.className = "nobel-command-item";
            item.innerHTML = `
                <span class="nobel-command-item-icon">›</span>
                <span class="nobel-command-item-info">
                    <strong></strong>
                    <small></small>
                </span>
                <span class="nobel-command-item-enter">↵</span>
            `;

            item.querySelector("strong").textContent = command.name;
            item.querySelector("small").textContent =
                command.description;

            item.addEventListener("click", () => {
                closeCommandCenter();
                command.action();
            });

            item.addEventListener("mouseenter", () => {
                selectedIndex = index;
                updateSelection();
            });

            list.appendChild(item);
        });

        updateSelection();
    }

    function updateSelection() {
        const items = list.querySelectorAll(".nobel-command-item");

        items.forEach((item, index) => {
            item.classList.toggle(
                "selected",
                index === selectedIndex
            );

            item.setAttribute(
                "aria-selected",
                index === selectedIndex ? "true" : "false"
            );
        });
    }

    function runSelectedCommand() {
        if (!filteredCommands.length) return;

        const command = filteredCommands[selectedIndex];

        closeCommandCenter();
        command.action();
    }

    search.addEventListener("input", () => {
        renderCommands(search.value);
    });

    closeButton.addEventListener("click", closeCommandCenter);

    overlay.addEventListener("click", event => {
        if (event.target === overlay) {
            closeCommandCenter();
        }
    });

    document.addEventListener("keydown", event => {
        const isMac = navigator.platform
            .toUpperCase()
            .includes("MAC");

        if (
            (isMac ? event.metaKey : event.ctrlKey) &&
            event.key.toLowerCase() === "k"
        ) {
            event.preventDefault();

            if (overlay.classList.contains("active")) {
                closeCommandCenter();
            } else {
                openCommandCenter();
            }

            return;
        }

        if (!overlay.classList.contains("active")) return;

        if (event.key === "Escape") {
            closeCommandCenter();
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();

            if (filteredCommands.length) {
                selectedIndex =
                    (selectedIndex + 1) % filteredCommands.length;

                updateSelection();
            }
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();

            if (filteredCommands.length) {
                selectedIndex =
                    (selectedIndex - 1 + filteredCommands.length) %
                    filteredCommands.length;

                updateSelection();
            }
        }

        if (event.key === "Enter") {
            event.preventDefault();
            runSelectedCommand();
        }
    });

    renderCommands("");

    console.log("NOBEL Command Center 11.0 siap!");
});
// ==========================================
// NOBEL COMMAND CENTER 11.0
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".nobel-command-overlay")) return;

    const commands = [
        {
            name: "Home",
            description: "Kembali ke halaman utama",
            keywords: "home beranda atas",
            action: () => window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        },
        {
            name: "About",
            description: "Lihat informasi tentang NOBEL",
            keywords: "about profil tentang saya",
            action: () => goToSection("about")
        },
        {
            name: "Skills",
            description: "Lihat kemampuan dan teknologi",
            keywords: "skills kemampuan teknologi",
            action: () => goToSection("skills")
        },
        {
            name: "Projects",
            description: "Lihat proyek yang sudah dibuat",
            keywords: "projects proyek karya",
            action: () => goToSection("projects")
        },
        {
            name: "Certificates",
            description: "Lihat sertifikat pembelajaran",
            keywords: "certificates sertifikat",
            action: () => goToSection("certificates")
        },
        {
            name: "Journey",
            description: "Lihat perjalanan belajar",
            keywords: "journey perjalanan pengalaman",
            action: () => goToSection("journey")
        },
        {
            name: "Contact",
            description: "Hubungi NOBEL",
            keywords: "contact kontak email",
            action: () => goToSection("contact")
        },
        {
            name: "GitHub",
            description: "Buka profil GitHub NOBEL",
            keywords: "github repository kode",
            action: () => window.open(
                "https://github.com/nobel2323",
                "_blank",
                "noopener,noreferrer"
            )
        },
        {
            name: "Instagram",
            description: "Buka Instagram NOBEL",
            keywords: "instagram sosial media",
            action: () => window.open(
                "https://www.instagram.com/ndaprnma_/",
                "_blank",
                "noopener,noreferrer"
            )
        },
        {
            name: "Back to Top",
            description: "Kembali ke bagian paling atas",
            keywords: "top atas kembali",
            action: () => window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }
    ];

    function goToSection(id) {
        const section = document.getElementById(id);

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        } else {
            console.warn("Bagian #" + id + " tidak ditemukan.");
        }
    }

    // Membuat Command Center secara otomatis
    const overlay = document.createElement("div");
    overlay.className = "nobel-command-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "NOBEL Command Center");

    overlay.innerHTML = `
        <div class="nobel-command-box">
            <div class="nobel-command-header">
                <span class="nobel-command-logo">N.</span>
                <span>NOBEL COMMAND CENTER</span>
                <button class="nobel-command-close"
                        type="button"
                        aria-label="Tutup Command Center">✕</button>
            </div>

            <input
                class="nobel-command-search"
                type="search"
                placeholder="Cari perintah..."
                autocomplete="off"
                aria-label="Cari perintah"
            >

            <div class="nobel-command-list"></div>

            <div class="nobel-command-footer">
                <span>↑ ↓ Navigasi</span>
                <span>ENTER Pilih</span>
                <span>ESC Tutup</span>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    const search = overlay.querySelector(".nobel-command-search");
    const list = overlay.querySelector(".nobel-command-list");
    const closeButton = overlay.querySelector(".nobel-command-close");

    let selectedIndex = 0;
    let filteredCommands = [];

    function closeCommandCenter() {
        overlay.classList.remove("active");
    }

    function openCommandCenter() {
        overlay.classList.add("active");
        search.value = "";
        renderCommands("");
        search.focus();
    }

    function renderCommands(query) {
        const normalizedQuery = query.trim().toLowerCase();

        filteredCommands = commands.filter(command => {
            const searchableText = (
                command.name + " " +
                command.description + " " +
                command.keywords
            ).toLowerCase();

            return searchableText.includes(normalizedQuery);
        });

        selectedIndex = 0;
        list.innerHTML = "";

        if (filteredCommands.length === 0) {
            list.innerHTML = `
                <div class="nobel-command-empty">
                    Tidak ada perintah yang cocok.
                </div>
            `;
            return;
        }

        filteredCommands.forEach((command, index) => {
            const item = document.createElement("button");

            item.type = "button";
            item.className = "nobel-command-item";
            item.innerHTML = `
                <span class="nobel-command-item-icon">›</span>
                <span class="nobel-command-item-info">
                    <strong></strong>
                    <small></small>
                </span>
                <span class="nobel-command-item-enter">↵</span>
            `;

            item.querySelector("strong").textContent = command.name;
            item.querySelector("small").textContent =
                command.description;

            item.addEventListener("click", () => {
                closeCommandCenter();
                command.action();
            });

            item.addEventListener("mouseenter", () => {
                selectedIndex = index;
                updateSelection();
            });

            list.appendChild(item);
        });

        updateSelection();
    }

    function updateSelection() {
        const items = list.querySelectorAll(".nobel-command-item");

        items.forEach((item, index) => {
            item.classList.toggle(
                "selected",
                index === selectedIndex
            );

            item.setAttribute(
                "aria-selected",
                index === selectedIndex ? "true" : "false"
            );
        });
    }

    function runSelectedCommand() {
        if (!filteredCommands.length) return;

        const command = filteredCommands[selectedIndex];

        closeCommandCenter();
        command.action();
    }

    search.addEventListener("input", () => {
        renderCommands(search.value);
    });

    closeButton.addEventListener("click", closeCommandCenter);

    overlay.addEventListener("click", event => {
        if (event.target === overlay) {
            closeCommandCenter();
        }
    });

    document.addEventListener("keydown", event => {
        const isMac = navigator.platform
            .toUpperCase()
            .includes("MAC");

        if (
            (isMac ? event.metaKey : event.ctrlKey) &&
            event.key.toLowerCase() === "k"
        ) {
            event.preventDefault();

            if (overlay.classList.contains("active")) {
                closeCommandCenter();
            } else {
                openCommandCenter();
            }

            return;
        }

        if (!overlay.classList.contains("active")) return;

        if (event.key === "Escape") {
            closeCommandCenter();
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();

            if (filteredCommands.length) {
                selectedIndex =
                    (selectedIndex + 1) % filteredCommands.length;

                updateSelection();
            }
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();

            if (filteredCommands.length) {
                selectedIndex =
                    (selectedIndex - 1 + filteredCommands.length) %
                    filteredCommands.length;

                updateSelection();
            }
        }

        if (event.key === "Enter") {
            event.preventDefault();
            runSelectedCommand();
        }
    });

    renderCommands("");

    console.log("NOBEL Command Center 11.0 siap!");
});
// ===== NOBEL DEVELOPER DASHBOARD 12.0 =====

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".nobel-dashboard")) return;

    const dashboard = document.createElement("section");

    dashboard.className = "nobel-dashboard";
    dashboard.setAttribute("aria-label", "Developer Dashboard");

    dashboard.innerHTML = `
        <div class="nobel-dashboard-header">
            <div>
                <h3 class="nobel-dashboard-title">
                    NOBEL DASHBOARD
                </h3>
                <p class="nobel-dashboard-subtitle">
                    Developer Control Panel
                </p>
            </div>

            <button class="nobel-dashboard-close" type="button">
                ✕
            </button>
        </div>

        <div class="nobel-dashboard-status">
            <span class="nobel-dashboard-dot"></span>
            <span>Portfolio aktif di browser ini</span>
        </div>

        <div class="nobel-dashboard-clock">00:00:00</div>
        <div class="nobel-dashboard-date">Memuat tanggal...</div>

        <div class="nobel-dashboard-grid">
            <div class="nobel-dashboard-stat">
                <span class="nobel-dashboard-number"
                      id="dashboard-projects">0</span>
                <span class="nobel-dashboard-label">Projects</span>
            </div>

            <div class="nobel-dashboard-stat">
                <span class="nobel-dashboard-number"
                      id="dashboard-skills">0</span>
                <span class="nobel-dashboard-label">Skills</span>
            </div>

            <div class="nobel-dashboard-stat">
                <span class="nobel-dashboard-number"
                      id="dashboard-sections">0</span>
                <span class="nobel-dashboard-label">Sections</span>
            </div>

            <div class="nobel-dashboard-stat">
                <span class="nobel-dashboard-number"
                      id="dashboard-year">2026</span>
                <span class="nobel-dashboard-label">Current Year</span>
            </div>
        </div>

        <div class="nobel-dashboard-footer">
            NOBEL • DEVELOPER MODE • VERSION 12.0
        </div>
    `;

    const toggle = document.createElement("button");

    toggle.className = "nobel-dashboard-toggle";
    toggle.type = "button";
    toggle.textContent = "⌘ Developer Dashboard";

    document.body.append(dashboard, toggle);

    const closeButton = dashboard.querySelector(
        ".nobel-dashboard-close"
    );

    const clock = dashboard.querySelector(
        ".nobel-dashboard-clock"
    );

    const date = dashboard.querySelector(
        ".nobel-dashboard-date"
    );

    function openDashboard() {
        dashboard.classList.add("active");
        toggle.hidden = true;
        closeButton.focus();
    }

    function closeDashboard() {
        dashboard.classList.remove("active");
        toggle.hidden = false;
        toggle.focus();
    }

    function updateClock() {
        const now = new Date();

        clock.textContent = now.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        });

        date.textContent = now.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        document.getElementById(
            "dashboard-year"
        ).textContent = now.getFullYear();
    }

    function countUniqueCards(selectors) {
        const elements = new Set();

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                elements.add(element);
            });
        });

        return elements.size;
    }

    function updateStatistics() {
        const projects = countUniqueCards([
            "#projects .project-card",
            "#projects .project"
        ]);

        const skills = countUniqueCards([
            "#skills .skill-card",
            "#skills .skill-item",
            "#skills .skill"
        ]);

        const sections = document.querySelectorAll(
            "main section, body > section"
        ).length;

        document.getElementById(
            "dashboard-projects"
        ).textContent = projects;

        document.getElementById(
            "dashboard-skills"
        ).textContent = skills;

        document.getElementById(
            "dashboard-sections"
        ).textContent = sections;
    }

    toggle.addEventListener("click", openDashboard);
    closeButton.addEventListener("click", closeDashboard);

    dashboard.addEventListener("click", event => {
        if (event.target === dashboard) {
            closeDashboard();
        }
    });

    document.addEventListener("keydown", event => {
        if (
            event.key === "Escape" &&
            dashboard.classList.contains("active")
        ) {
            closeDashboard();
        }
    });

    updateClock();
    updateStatistics();

    setInterval(updateClock, 1000);

    console.log("NOBEL Dashboard 12.0 siap!");
});
// =====================================
// NOBEL ACTIVITY SYSTEM 13.0
// =====================================

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".nobel-activity")) return;

    const activitySection = document.createElement("section");

    activitySection.className = "nobel-activity";
    activitySection.id = "nobel-activity";

    activitySection.innerHTML = `
        <div class="nobel-activity-header">
            <div class="nobel-activity-kicker">
                Developer Log
            </div>

            <h2 class="nobel-activity-title">
                My Development Journey
            </h2>

            <p class="nobel-activity-description">
                Perjalanan belajar, membangun proyek,
                dan mengembangkan kemampuan di bidang teknologi.
            </p>
        </div>

        <div class="nobel-activity-list">

            <article class="nobel-activity-item">
                <span class="nobel-activity-dot"></span>

                <div class="nobel-activity-card">
                    <div class="nobel-activity-card-top">
                        <h4>Membangun Personal Portfolio</h4>
                        <span class="nobel-activity-badge">
                            IN PROGRESS
                        </span>
                    </div>

                    <p>
                        Mengembangkan website portofolio pribadi
                        dengan HTML, CSS, dan JavaScript.
                    </p>

                    <span class="nobel-activity-date">
                        Current Project
                    </span>
                </div>
            </article>

            <article class="nobel-activity-item">
                <span class="nobel-activity-dot"></span>

                <div class="nobel-activity-card">
                    <div class="nobel-activity-card-top">
                        <h4>Python Age Calculator</h4>
                        <span class="nobel-activity-badge">
                            PROJECT
                        </span>
                    </div>

                    <p>
                        Membuat program Python untuk mengolah
                        input pengguna dan menghitung umur.
                    </p>

                    <span class="nobel-activity-date">
                        Python Learning
                    </span>
                </div>
            </article>

            <article class="nobel-activity-item">
                <span class="nobel-activity-dot"></span>

                <div class="nobel-activity-card">
                    <div class="nobel-activity-card-top">
                        <h4>Belajar Git dan GitHub</h4>
                        <span class="nobel-activity-badge">
                            LEARNING
                        </span>
                    </div>

                    <p>
                        Mempelajari commit, branch, merge,
                        dokumentasi, dan upload proyek ke GitHub.
                    </p>

                    <span class="nobel-activity-date">
                        Development Skills
                    </span>
                </div>
            </article>

            <article class="nobel-activity-item">
                <span class="nobel-activity-dot"></span>

                <div class="nobel-activity-card">
                    <div class="nobel-activity-card-top">
                        <h4>Roblox Studio Projects</h4>
                        <span class="nobel-activity-badge">
                            CREATIVE
                        </span>
                    </div>

                    <p>
                        Bereksperimen dengan desain map,
                        checkpoint, dan sistem gameplay Roblox.
                    </p>

                    <span class="nobel-activity-date">
                        Game Development
                    </span>
                </div>
            </article>

        </div>
    `;

    // Masukkan timeline sebelum bagian Contact jika ditemukan.
    const contactSection = document.querySelector("#contact");

    if (contactSection && contactSection.parentNode) {
        contactSection.parentNode.insertBefore(
            activitySection,
            contactSection
        );
    } else {
        document.body.appendChild(activitySection);
    }

    // Animasi saat aktivitas masuk ke layar.
    const items = activitySection.querySelectorAll(
        ".nobel-activity-item"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 100}ms`;
            observer.observe(item);
        });
    } else {
        items.forEach(item => item.classList.add("visible"));
    }

    console.log("NOBEL Activity System 13.0 siap!");
});
// =====================================
// NOBEL PROJECT SHOWCASE 14.0
// =====================================

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".nobel-showcase")) return;

    const projects = [
        {
            number: "PROJECT 01",
            title: "Python Age Calculator",
            description:
                "Program Python sederhana untuk mengolah input pengguna dan menghitung umur.",
            technologies: ["Python", "VS Code"],
            github:
                "https://github.com/nobel2323/program-umur-python",
            demo: ""
        },
        {
            number: "PROJECT 02",
            title: "Personal Portfolio",
            description:
                "Website portofolio pribadi untuk menampilkan profil, skill, dan proyek.",
            technologies: ["HTML", "CSS", "JavaScript"],
            github: "https://github.com/nobel2323",
            demo: ""
        },
        {
            number: "PROJECT 03",
            title: "Roblox Mountain Adventure",
            description:
                "Proyek pengembangan map petualangan gunung dengan checkpoint dan berbagai rintangan.",
            technologies: ["Roblox Studio", "Lua"],
            github: "",
            demo: ""
        }
    ];

    const showcase = document.createElement("section");
    showcase.className = "nobel-showcase";
    showcase.id = "nobel-project-showcase";

    showcase.innerHTML = `
        <h3 class="nobel-showcase-title">
            Featured Projects
        </h3>

        <p class="nobel-showcase-description">
            Beberapa proyek yang sedang dan pernah saya kembangkan.
        </p>

        <div class="nobel-showcase-grid"></div>
    `;

    const grid = showcase.querySelector(".nobel-showcase-grid");

    projects.forEach(project => {
        const card = document.createElement("article");
        card.className = "nobel-showcase-card";

        const number = document.createElement("span");
        number.className = "nobel-showcase-number";
        number.textContent = project.number;

        const title = document.createElement("h4");
        title.textContent = project.title;

        const description = document.createElement("p");
        description.textContent = project.description;

        const tags = document.createElement("div");
        tags.className = "nobel-showcase-tags";

        project.technologies.forEach(technology => {
            const tag = document.createElement("span");
            tag.textContent = technology;
            tags.appendChild(tag);
        });

        const actions = document.createElement("div");
        actions.className = "nobel-showcase-actions";

        if (project.github) {
            const github = document.createElement("a");
            github.className = "nobel-showcase-link";
            github.href = project.github;
            github.target = "_blank";
            github.rel = "noopener noreferrer";
            github.textContent = "GitHub ↗";
            actions.appendChild(github);
        }

        if (project.demo) {
            const demo = document.createElement("a");
            demo.className =
                "nobel-showcase-link primary";
            demo.href = project.demo;
            demo.target = "_blank";
            demo.rel = "noopener noreferrer";
            demo.textContent = "Live Demo ↗";
            actions.appendChild(demo);
        }

        card.append(number, title, description, tags, actions);
        grid.appendChild(card);
    });

    const projectsSection = document.getElementById("projects");

    if (projectsSection) {
        projectsSection.appendChild(showcase);
    } else {
        document.body.appendChild(showcase);
    }

    console.log("NOBEL Project Showcase 14.0 siap!");
});
// =====================================
// NOBEL ACHIEVEMENT CENTER 15.0
// =====================================

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".nobel-achievements")) return;

    // Data contoh. Sesuaikan dengan pencapaian asli.
    const achievements = [
        {
            icon: "🐍",
            title: "Python Fundamentals",
            category: "Learning",
            description:
                "Mempelajari dasar Python, input, output, dan validasi.",
            details:
                "Fokus pembelajaran: variabel, input(), print(), percabangan, dan validasi data."
        },
        {
            icon: "🔗",
            title: "Git & GitHub",
            category: "Learning",
            description:
                "Belajar version control dan pengelolaan repositori.",
            details:
                "Materi: commit, branch, merge, dokumentasi, dan push ke repositori GitHub."
        },
        {
            icon: "🌐",
            title: "Web Development",
            category: "Project",
            description:
                "Mengembangkan website portofolio pribadi.",
            details:
                "Menggunakan HTML, CSS, dan JavaScript untuk membangun tampilan interaktif."
        },
        {
            icon: "🎮",
            title: "Roblox Studio",
            category: "Project",
            description:
                "Bereksperimen membuat map petualangan dan sistem gameplay.",
            details:
                "Eksplorasi desain map, checkpoint, rintangan, dan pengembangan gameplay."
        }
    ];

    const section = document.createElement("section");
    section.className = "nobel-achievements";
    section.id = "nobel-achievement-center";

    section.innerHTML = `
        <div class="nobel-achievements-header">
            <div class="nobel-achievements-kicker">
                Growth & Recognition
            </div>

            <h2 class="nobel-achievements-title">
                Certificates & Achievements
            </h2>

            <p class="nobel-achievements-description">
                Dokumentasi proses belajar, proyek, dan
                pencapaian dalam perjalanan pengembangan diri.
            </p>
        </div>

        <div class="nobel-achievements-filters">
            <button class="nobel-achievement-filter active"
                    type="button"
                    data-filter="all">Semua</button>

            <button class="nobel-achievement-filter"
                    type="button"
                    data-filter="learning">Learning</button>

            <button class="nobel-achievement-filter"
                    type="button"
                    data-filter="project">Project</button>

            <button class="nobel-achievement-filter"
                    type="button"
                    data-filter="certificate">Certificate</button>
        </div>

        <div class="nobel-achievements-grid"></div>
    `;

    const grid = section.querySelector(
        ".nobel-achievements-grid"
    );

    achievements.forEach(item => {
        const card = document.createElement("article");
        card.className = "nobel-achievement-card";
        card.dataset.category = item.category.toLowerCase();

        const icon = document.createElement("div");
        icon.className = "nobel-achievement-icon";
        icon.textContent = item.icon;

        const category = document.createElement("span");
        category.className = "nobel-achievement-category";
        category.textContent = item.category;

        const title = document.createElement("h4");
        title.textContent = item.title;

        const description = document.createElement("p");
        description.textContent = item.description;

        const details = document.createElement("div");
        details.className = "nobel-achievement-details";
        details.textContent = item.details;

        const button = document.createElement("button");
        button.className = "nobel-achievement-button";
        button.type = "button";
        button.textContent = "Lihat Detail +";

        button.addEventListener("click", () => {
            const expanded = card.classList.toggle("expanded");

            button.textContent = expanded
                ? "Tutup Detail −"
                : "Lihat Detail +";

            button.setAttribute(
                "aria-expanded",
                String(expanded)
            );
        });

        card.append(
            icon,
            category,
            title,
            description,
            details,
            button
        );

        grid.appendChild(card);
    });

    const filters = section.querySelectorAll(
        ".nobel-achievement-filter"
    );

    filters.forEach(filterButton => {
        filterButton.addEventListener("click", () => {
            filters.forEach(button => {
                button.classList.remove("active");
            });

            filterButton.classList.add("active");

            const category = filterButton.dataset.filter;

            grid.querySelectorAll(
                ".nobel-achievement-card"
            ).forEach(card => {
                card.hidden = category !== "all" &&
                    card.dataset.category !== category;
            });
        });
    });

    const projectsSection = document.getElementById("projects");
    const contactSection = document.getElementById("contact");

    if (projectsSection) {
        projectsSection.appendChild(section);
    } else if (contactSection) {
        contactSection.parentNode.insertBefore(
            section,
            contactSection
        );
    } else {
        document.body.appendChild(section);
    }

    console.log("NOBEL Achievement Center 15.0 siap!");
});
/* =====================================
   NOBEL INTERACTIVE TERMINAL 17.0
   FIXED: INPUT + COMMAND HISTORY
===================================== */

document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.querySelector(".nobel-terminal");

    if (!terminal) {
        console.warn("NOBEL Terminal: elemen terminal teu kapanggih.");
        return;
    }

    // Ulah nyieun terminal duplikat.
    if (terminal.querySelector(".nobel-terminal-form")) return;

    let output = terminal.querySelector(".nobel-terminal-output");

    // Lamun output can aya, jieun otomatis.
    if (!output) {
        output = document.createElement("div");
        output.className = "nobel-terminal-output";
        terminal.appendChild(output);
    }

    // Jieun form input.
    const form = document.createElement("form");
    form.className = "nobel-terminal-form";

    const prompt = document.createElement("label");
    prompt.className = "nobel-terminal-prompt";
    prompt.htmlFor = "nobel-terminal-input";
    prompt.textContent = "nobel@portfolio:~$";

    const input = document.createElement("input");
    input.id = "nobel-terminal-input";
    input.className = "nobel-terminal-input";
    input.type = "text";
    input.autocomplete = "off";
    input.spellcheck = false;
    input.placeholder = "Type help and press Enter...";
    input.setAttribute("aria-label", "Terminal command");

    form.append(prompt, input);
    terminal.appendChild(form);

    // Riwayat paréntah.
    const commandHistory = [];
    let historyIndex = 0;

    function printLine(text, className = "") {
        const line = document.createElement("div");
        line.textContent = text;

        if (className) {
            line.className = className;
        }

        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }

    const commands = {
        help: () => [
            "AVAILABLE COMMANDS",
            "about        - About NOBEL",
            "skills       - View skills",
            "projects     - View projects",
            "certificates - Open certificates",
            "journey      - View development journey",
            "contact      - Open contact section",
            "github       - Open GitHub",
            "instagram    - Open Instagram",
            "home         - Back to homepage",
            "clear        - Clear terminal"
        ],

        about: () => [
            "NAME: Sutan Ndaru Purnama",
            "NICKNAME: NOBEL",
            "FOCUS: Programming and Web Development",
            "STATUS: Continuously Learning"
        ],

        skills: () => [
            "TECHNICAL SKILLS",
            "- Python",
            "- HTML and CSS",
            "- JavaScript",
            "- Git and GitHub",
            "- Roblox Studio"
        ],

        projects: () => [
            "FEATURED PROJECTS",
            "- Python Age Calculator",
            "- Personal Portfolio",
            "- Roblox Mountain Adventure"
        ],

        certificates: () => {
            goToSection(["certificates"]);
            return ["Opening certificates section..."];
        },

        journey: () => {
            goToSection([
                "journey",
                "nobel-activity",
                "activity"
            ]);

            return ["Opening development journey..."];
        },

        contact: () => {
            goToSection(["contact"]);
            return ["Opening contact section..."];
        },

        github: () => {
            window.open(
                "https://github.com/nobel2323",
                "_blank",
                "noopener,noreferrer"
            );

            return ["Opening GitHub profile..."];
        },

        instagram: () => {
            window.open(
                "https://www.instagram.com/ndaprnma_/",
                "_blank",
                "noopener,noreferrer"
            );

            return ["Opening Instagram profile..."];
        },

        home: () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            return ["Returning to homepage..."];
        }
    };

    function goToSection(ids) {
        for (const id of ids) {
            const section = document.getElementById(id);

            if (section) {
                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                return;
            }
        }

        printLine("Section not found on this page.", "terminal-error");
    }

    // Riwayat paréntah nganggo tombol panah.
    input.addEventListener("keydown", event => {
        if (event.key === "ArrowUp") {
            event.preventDefault();

            if (commandHistory.length === 0) return;

            historyIndex = Math.max(0, historyIndex - 1);
            input.value = commandHistory[historyIndex];
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();

            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                input.value = "";
            }
        }
    });

    // Jalankeun paréntah.
    form.addEventListener("submit", event => {
        event.preventDefault();

        const command = input.value.trim().toLowerCase();

        if (!command) return;

        commandHistory.push(command);
        historyIndex = commandHistory.length;

        printLine(
            "nobel@portfolio ➜ " + command,
            "terminal-command"
        );

        input.value = "";

        if (command === "clear") {
            output.replaceChildren();

            printLine(
                "Terminal cleared. Type 'help' to continue.",
                "terminal-success"
            );

            return;
        }

        if (commands[command]) {
            const results = commands[command]();

            results.forEach(text => {
                printLine(text, "terminal-success");
            });
        } else {
            printLine(
                "Command not found. Type 'help' to see available commands.",
                "terminal-error"
            );
        }
    });

    printLine(
        "Interactive terminal ready. Type 'help' to begin.",
        "terminal-success"
    );

    console.log("NOBEL Interactive Terminal 17.0 siap!");
});

    // Navigasi riwayat dengan tombol panah
input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        event.preventDefault();

        if (commandHistory.length === 0) return;

        historyIndex = Math.max(0, historyIndex - 1);
        input.value = commandHistory[historyIndex];
    }

    if (event.key === "ArrowDown") {
        event.preventDefault();

        if (commandHistory.length === 0) return;

        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            input.value = "";
        }
    }
});

    // Jalankan perintah saat form dikirim
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const command = input.value.trim().toLowerCase();
        // Simpan perintah ke riwayat
if (command) {
    commandHistory.push(command);
    historyIndex = commandHistory.length;
}

        if (!command) return;

        printLine(
            "nobel@portfolio ➜ " + command,
            "terminal-command"
        );

        input.value = "";

        // Bersihkan terminal
        if (command === "clear") {
            output.replaceChildren();
            printLine(
                "Terminal cleared. Type 'help' to continue.",
                "terminal-success"
            );
            return;
        }

        // Jalankan perintah yang dikenal
        if (commands[command]) {
            const results = commands[command]();

            results.forEach((text) => {
                printLine(text, "terminal-success");
            });
        } else {
            printLine(
                "Command not found. Type 'help' to see available commands.",
                "terminal-error"
            );
        }
    });