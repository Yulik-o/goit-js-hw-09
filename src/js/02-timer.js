import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const flatpickrSelector = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
buttonStart.addEventListener('click', onButtonClick);

let timerId = null;
let selected = null;
buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      buttonStart.disabled = true;
    } else {
      console.log(selectedDates[0]);
      selected = selectedDates[0];
      buttonStart.disabled = false;
    }
  },
};

const fp = flatpickr(flatpickrSelector, options);
function onButtonClick() {
  buttonStart.disabled = true;
  flatpickrSelector.disabled = true;
  Notiflix.Notify.success("Let's start!");
//}
timerId = setInterval(() => {
  const timeDecrement = selected.getTime() - Date.now();
  if (timeDecrement <= 0) {
    clearInterval(timerId);
    Notiflix.Notify.info("Time's up!");
    return;
  }
const { days, hours, minutes, seconds } = convertMs(timeDecrement);

daysEl.textContent = addLeadingZero(days);
hoursEl.textContent = addLeadingZero(hours);
minutesEl.textContent = addLeadingZero(minutes);
secondsEl.textContent = addLeadingZero(seconds);
}, 1000);
}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
