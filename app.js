const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

let startTime = 0, elapsed = 0, timerInterval, lapCount = 0;

function updateDisplay(ts) {
  const ms = Math.floor((ts % 1000) / 10);
  const sec = Math.floor((ts / 1000) % 60);
  const min = Math.floor((ts / (1000 * 60)) % 60);
  const hrs = Math.floor(ts / (1000 * 60 * 60));
  display.textContent = 
    `${hrs.toString().padStart(2,0)}:` +
    `${min.toString().padStart(2,0)}:` +
    `${sec.toString().padStart(2,0)}.` +
    `${ms.toString().padStart(2,0)}`;
}

function start() {
  startTime = Date.now() - elapsed;
  timerInterval = setInterval(() => {
    elapsed = Date.now() - startTime;
    updateDisplay(elapsed);
  }, 10);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
  lapBtn.disabled = false;
}

function pause() {
  clearInterval(timerInterval);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function reset() {
  clearInterval(timerInterval);
  elapsed = 0; lapCount = 0;
  updateDisplay(0);
  lapsList.innerHTML = '';
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  lapBtn.disabled = true;
}

function lap() {
  lapCount++;
  const li = document.createElement('li');
  li.textContent = `Lap ${lapCount}: ${display.textContent}`;
  lapsList.appendChild(li);
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);