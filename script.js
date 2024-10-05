let startTime, updatedTime, difference, interval;
let isRunning = false;
let savedTime = 0;
let lapCounter = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

startButton.addEventListener('click', function() {
    if (!isRunning) {
        startTime = new Date().getTime();
        interval = setInterval(updateDisplay, 1000);
        isRunning = true;
    }
});

stopButton.addEventListener('click', function() {
    if (isRunning) {
        clearInterval(interval);
        savedTime += new Date().getTime() - startTime;
        isRunning = false;
    }
});

resetButton.addEventListener('click', function() {
    clearInterval(interval);
    isRunning = false;
    savedTime = 0;
    display.textContent = "00:00:00";
    lapsContainer.innerHTML = "";
    lapCounter = 0;
});

lapButton.addEventListener('click', function() {
    if (isRunning) {
        const lapTime = getTimeString(savedTime + (new Date().getTime() - startTime));
        lapCounter++;
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    }
});

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = savedTime + (updatedTime - startTime);
    display.textContent = getTimeString(difference);
}

function getTimeString(timeInMs) {
    const time = new Date(timeInMs);

    const hours = String(time.getUTCHours()).padStart(2, '0');
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

