// ========== Multi-Steps Logic ==========
const steps = document.querySelectorAll(".step");
const stepIndicators = document.querySelectorAll(".step-indicator");
const prevButtons = document.querySelectorAll(".step-prev");
const nextButtons = document.querySelectorAll(".step-next");
const heroStepButtons = document.querySelectorAll(".hero-step-btn");

let currentStep = 0;

function updateStepsUI() {
    steps.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep);
    });

    stepIndicators.forEach((tab, index) => {
        tab.classList.toggle("active", index === currentStep);
    });

    prevButtons.forEach((btn) => {
        if (currentStep === 0) {
            btn.setAttribute("disabled", "disabled");
        } else {
            btn.removeAttribute("disabled");
        }
    });

    const hero = document.querySelector(".hero");
    if (hero) {
        hero.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function goToStep(index) {
    if (index < 0) index = 0;
    if (index > steps.length - 1) index = steps.length - 1;
    currentStep = index;
    updateStepsUI();
}

// التابات فوق
stepIndicators.forEach((tab) => {
    tab.addEventListener("click", () => {
        const stepIndex = parseInt(tab.getAttribute("data-step"), 10);
        goToStep(stepIndex);
    });
});

// أزرار "رجوع"
prevButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        goToStep(currentStep - 1);
    });
});

// أزرار "التالي" + زر إنهاء
nextButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (btn.classList.contains("step-finish")) {
            goToStep(0);
        } else {
            goToStep(currentStep + 1);
        }
    });
});

// أزرار البداية في الـ Hero
heroStepButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const target = parseInt(btn.getAttribute("data-step-target"), 10);
        goToStep(target);
    });
});

// أول تحديث
updateStepsUI();

// ========== Quiz (اختبار الحب) ==========
const quizButtons = document.querySelectorAll(".quiz-btn");
const quizResult = document.getElementById("quiz-result");

quizButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const answer = button.getAttribute("data-answer");
        if (!quizResult) return;

        if (answer === "right") {
            quizResult.textContent = "عارفة طبعًا 😌❤️… ومافيش حد يحبك زيي.";
        } else {
            quizResult.textContent = "مستحيل 😱 جرّبي تضغطي على الزر التاني يا شقية…";
        }
    });
});

// ========== Hearts Rain ==========
const heartsBtn = document.getElementById("hearts-btn");

function createHeart() {
    const heart = document.createElement("span");
    heart.classList.add("heart");
    heart.textContent = "💗";

    const x = Math.random() * window.innerWidth;
    const duration = 3 + Math.random() * 2;

    heart.style.left = `${x}px`;
    heart.style.animationDuration = `${duration}s`;

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

if (heartsBtn) {
    heartsBtn.addEventListener("click", () => {
        for (let i = 0; i < 25; i++) {
            setTimeout(createHeart, i * 120);
        }
        heartsBtn.textContent = "أنا كمان بحبّك 😍";
    });
}

// ========== Music Global Toggle ==========
const music = document.getElementById("bg-music");
const musicToggleBtn = document.getElementById("music-toggle");

if (music && musicToggleBtn) {
    musicToggleBtn.addEventListener("click", () => {
        // التشغيل بعد ضغط المستخدم (لتفادي منع الـ Autoplay)
        if (music.paused) {
            music
                .play()
                .then(() => {
                    musicToggleBtn.textContent = "إيقاف الموسيقى ⏸";
                })
                .catch(() => {
                    musicToggleBtn.textContent = "تأكد من ملف music.mp3 🎵";
                });
        } else {
            music.pause();
            musicToggleBtn.textContent = "تشغيل الموسيقى 🎵";
        }
    });
}
