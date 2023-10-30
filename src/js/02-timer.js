import flatpickr from 'flatpickr';

import Notiflix from 'notiflix';

import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

const fieldDays = document.querySelector('span[data-days]');
const fieldHours = document.querySelector('span[data-hours]');
const fieldMinutes = document.querySelector('span[data-minutes]');
const fieldSeconds = document.querySelector('span[data-seconds]');

let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = new Date().getTime();

    const finishTime = selectedDates[0].getTime();
    if (finishTime <= currentTime) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener('click', () => {
        timerId = setInterval(() => {
          counterTime(finishTime);
        }, 1000);
      });
    }
  },
};

flatpickr('#datetime-picker', options);

function counterTime(finish) {
  const currentTime = new Date().getTime();
  const timeDifference = finish - currentTime;
  if (timeDifference <= 0) {
    clearInterval(timerId);
    return;
  }

  const objForFields = convertMs(timeDifference);

  addTextContent(objForFields);
}
function addTextContent(object) {
  fieldDays.textContent = addLeadingZero(object.days);
  fieldHours.textContent = addLeadingZero(object.hours);
  fieldMinutes.textContent = addLeadingZero(object.minutes);
  fieldSeconds.textContent = addLeadingZero(object.seconds);
}
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
