function toggleSection(id) {
    const section = document.getElementById(id);
    section.classList.toggle("hidden");
}

let currentStep = 0;
let timerInterval;
let stepInterval;

function startCooking() {
    const steps = document.querySelectorAll("#steps li");
    if (steps.length === 0) return;

    clearInterval(timerInterval);
    clearInterval(stepInterval);
    document.getElementById("timer").textContent = "⏱ Time Left: 45:00";
    steps.forEach(step => {
        step.classList.remove("active");
        step.style.backgroundColor = "";
    });

    currentStep = 0;
    steps[currentStep].classList.add("active");
    updateProgressBar(steps.length);
    startTimer(45 * 60);

    stepInterval = setInterval(() => {
        if (currentStep < steps.length - 1) {
            nextStep(true); // indicate auto
        } else {
            clearInterval(stepInterval);
        }
    }, 10000);
}

function nextStep(isAuto = false) {
    if (!isAuto) clearInterval(stepInterval); // cancel auto if manual click

    const steps = document.querySelectorAll("#steps li");
    if (currentStep < steps.length - 1) {
        steps[currentStep].classList.remove("active");
        currentStep++;
        steps[currentStep].classList.add("active");
        updateProgressBar(steps.length);
    }
}

function updateProgressBar(totalSteps) {
    const progress = ((currentStep + 1) / totalSteps) * 100;
    document.getElementById("progress-fill").style.width = progress + "%";
}

function startTimer(duration) {
    let timeLeft = duration;
    const display = document.getElementById("timer");

    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        display.textContent = `⏱ Time Left: ${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

        if (--timeLeft < 0) {
            clearInterval(timerInterval);
            display.textContent = "✅ Done!";
        }
    }, 1000);
}
