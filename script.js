@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:root {
    --bg: #08080d;
    --card: #11111b;
    --purple: #a855f7;
    --white: #f5f3ff;
    --gray: #a1a1b5;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
}

body {
    background: var(--bg);
    color: var(--white);
    font-family: 'Inter', sans-serif;
    line-height: 1.7;
}

a {
    text-decoration: none;
    color: inherit;
}

.navbar {
    width: 100%;
    padding: 24px 9%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(8, 8, 13, 0.9);
    backdrop-filter: blur(15px);
    border-bottom: 1px solid #ffffff0d;
}

.logo {
    font-size: 26px;
    font-weight: 800;
    letter-spacing: 2px;
}

.logo span,
.hero h1 span {
    color: var(--purple);
}

.navbar nav {
    display: flex;
    gap: 30px;
}

.navbar nav a {
    color: var(--gray);
    font-size: 14px;
    transition: 0.3s;
}

.navbar nav a:hover {
    color: var(--purple);
}

.hero {
    min-height: 90vh;
    padding: 80px 9%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 50px;
}

.hero-content {
    max-width: 600px;
}

.intro,
.section-label {
    color: var(--purple);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 3px;
}

.hero h1 {
    font-size: clamp(70px, 10vw, 120px);
    line-height: 1.2;
    font-weight: 800;
    letter-spacing: -5px;
}

.hero h2 {
    font-size: 25px;
    margin: 10px 0 20px;
}

.description {
    color: var(--gray);
    max-width: 470px;
    margin-bottom: 30px;
}

.btn {
    display: inline-block;
    padding: 13px 25px;
    background: var(--purple);
    color: white;
    border-radius: 8px;
    font-weight: 600;
    transition: 0.3s;
}

.btn:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px #a855f744;
}

.hero-visual {
    position: relative;
    width: 300px;
    text-align: center;
}

.glow {
    position: absolute;
    width: 280px;
    height: 280px;
    background: var(--purple);
    filter: blur(110px);
    opacity: 0.25;
    border-radius: 50%;
    z-index: -1;
}

.profile-placeholder {
    width: 260px;
    height: 300px;
    display: grid;
    place-items: center;
    margin: auto;
    border: 1px solid #a855f755;
    border-radius: 25px;
    background: linear-gradient(145deg, #1c1230, #101018);
    font-size: 110px;
    font-weight: 800;
    color: var(--purple);
    box-shadow: 0 0 50px #a855f71a;
}

.hero-visual > p {
    margin-top: 20px;
    font-size: 11px;
    letter-spacing: 4px;
    color: var(--gray);
}

.about,
.skills,
.projects {
    padding: 100px 9%;
}

.about h2,
.skills h2,
.projects h2 {
    font-size: 38px;
    margin: 12px 0 25px;
}

.about > p:last-child {
    color: var(--gray);
    max-width: 750px;
}

.skill-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
}

.skill-card,
.project-card {
    padding: 28px;
    background: var(--card);
    border: 1px solid #ffffff12;
    border-radius: 15px;
    transition: 0.3s;
}

.skill-card:hover,
.project-card:hover {
    border-color: var(--purple);
    transform: translateY(-5px);
}

.skill-card span {
    color: var(--purple);
    font-size: 13px;
}

.skill-card h3,
.project-card h3 {
    margin: 15px 0 10px;
    font-size: 20px;
}

.skill-card p,
.project-card > p:not(.project-number) {
    color: var(--gray);
    font-size: 14px;
}

.project-card {
    max-width: 750px;
    margin-bottom: 20px;
}

.project-number {
    color: var(--purple);
    font-size: 11px;
    letter-spacing: 2px;
}

.tag {
    display: inline-block;
    margin-top: 20px;
    padding: 5px 12px;
    border: 1px solid #a855f755;
    border-radius: 5px;
    color: #c084fc;
    font-size: 11px;
}

footer {
    padding: 30px 9%;
    border-top: 1px solid #ffffff12;
    text-align: center;
    color: var(--gray);
    font-size: 12px;
}

@media (max-width: 768px) {
    .navbar {
        padding: 20px 6%;
        flex-direction: column;
        gap: 15px;
    }

    .navbar nav {
        gap: 18px;
        flex-wrap: wrap;
        justify-content: center;
    }

    .hero {
        padding: 70px 7%;
        flex-direction: column;
        align-items: flex-start;
    }

    .hero h1 {
        letter-spacing: -3px;
    }

    .hero-visual {
        align-self: center;
        margin-top: 30px;
    }

    .about,
    .skills,
    .projects {
        padding: 70px 7%;
    }

    .skill-grid {
        grid-template-columns: 1fr;
    }

    .about h2,
    .skills h2,
    .projects h2 {
        font-size: 30px;
    }
}