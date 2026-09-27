
/* =========================
   PAGE NAVIGATION
========================= */

function goToPage(page) {
    document.body.style.opacity = "0";

    setTimeout(() => {
        window.location.href = page;
    }, 350);
}


/* =========================
   CONFETTI
========================= */

const confettiContainer =
    document.getElementById("confetti-container");

if (confettiContainer) {

    for (let i = 0; i < 80; i++) {

        const confetti = document.createElement("div");

        confetti.style.position = "fixed";
        confetti.style.width = "8px";
        confetti.style.height = "14px";

        confetti.style.background =
            ["#ffeb3b", "#ff4081", "#40c4ff",
             "#69f0ae", "#ea80fc"][Math.floor(Math.random() * 5)];

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.top =
            Math.random() * -100 + "px";

        confetti.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        confetti.style.opacity =
            Math.random();

        confetti.style.animation =
            `confettiFall ${3 + Math.random() * 5}s linear infinite`;

        confettiContainer.appendChild(confetti);
    }

    const style = document.createElement("style");

    style.innerHTML = `
        @keyframes confettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
            }

            100% {
                transform: translateY(110vh) rotate(720deg);
            }
        }
    `;

    document.head.appendChild(style);
}


/* =========================
   GIFT
========================= */

function openGift() {

    const gift = document.querySelector(".gift");
    const message = document.getElementById("gift-message");
    const finalMessage = document.getElementById("final-message");

    if (!gift || gift.classList.contains("open")) {
        return;
    }

    gift.classList.add("open");

    if (message) {
        message.style.display = "none";
    }

    setTimeout(() => {

        if (finalMessage) {
            finalMessage.style.display = "block";
        }

        createFireworks();

    }, 700);
}


/* Allow keyboard interaction with the gift */

const gift = document.querySelector(".gift");

if (gift) {

    gift.addEventListener("keydown", function(event) {

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openGift();
        }

    });
}


/* =========================
   FIREWORKS
========================= */

const canvas = document.getElementById("fireworks");

let ctx;

if (canvas) {

    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    });
}


function createFireworks() {

    if (!canvas || !ctx) {
        return;
    }

    const colors = [
        "#ff7675",
        "#fdcb6e",
        "#74b9ff",
        "#55efc4",
        "#fd79a8",
        "#a29bfe"
    ];

    let particles = [];

    const centerX =
        Math.random() * canvas.width * 0.6 +
        canvas.width * 0.2;

    const centerY =
        Math.random() * canvas.height * 0.4 +
        canvas.height * 0.15;

    for (let i = 0; i < 180; i++) {

        const angle =
            Math.random() * Math.PI * 2;

        const speed =
            Math.random() * 7 + 2;

        particles.push({

            x: centerX,
            y: centerY,

            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,

            life: 100,

            color:
                colors[Math.floor(Math.random() * colors.length)]

        });
    }

    animateFireworks(particles);
}


function animateFireworks(particles) {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach((p) => {

        p.x += p.vx;
        p.y += p.vy;

        p.vy += 0.05;

        p.life--;

        ctx.globalAlpha =
            Math.max(p.life / 100, 0);

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            3,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = p.color;

        ctx.fill();
    });

    ctx.globalAlpha = 1;

    particles =
        particles.filter(p => p.life > 0);

    if (particles.length > 0) {

        requestAnimationFrame(() =>
            animateFireworks(particles)
        );

    } else {

        setTimeout(createFireworks, 500);
    }
}

/* =========================================
   SECRET ENVELOPE
========================================= */

function openEnvelope() {

    const envelope =
        document.querySelector(".secret-envelope");

    const hint =
        document.getElementById("envelope-hint");

    const secretMessage =
        document.getElementById("secret-message");

    if (!envelope || !secretMessage) {
        return;
    }

    // Prevent opening it more than once
    if (envelope.classList.contains("open")) {
        return;
    }

    // Open envelope
    envelope.classList.add("open");

    // Hide instruction
    if (hint) {
        hint.style.opacity = "0";

        setTimeout(() => {
            hint.style.display = "none";
        }, 400);
    }

    // Show secret message
    setTimeout(() => {

        secretMessage.style.display = "block";

        // Scroll smoothly to the message
        setTimeout(() => {

            secretMessage.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 100);

    }, 800);
}


/* =========================================
   ENVELOPE KEYBOARD SUPPORT
========================================= */

const secretEnvelope =
    document.querySelector(".secret-envelope");

if (secretEnvelope) {

    secretEnvelope.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openEnvelope();
            }

        }
    );
}

