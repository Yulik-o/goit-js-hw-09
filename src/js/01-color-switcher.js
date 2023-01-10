const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

buttonStart.addEventListener('click', onButtonStartClick);
buttonStop.addEventListener('click', onButtonStopClick);

function onButtonStartClick(event) {
  

  timerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    bodyEl.style.backgroundColor = randomColor;
  }, 1000);
  buttonStart.setAttribute("disabled", true);
  buttonStop.removeAttribute("disabled");
}

function onButtonStopClick(event) {
  buttonStart.removeAttribute("disabled");
  buttonStop.setAttribute("disabled", true);
  clearInterval(timerId);
}
