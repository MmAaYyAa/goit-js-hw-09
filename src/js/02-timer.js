import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const datetimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

const daysTimerFields = document.querySelector('[data-days]');
const hoursTimerFields = document.querySelector('[data-hours');
const minutesTimerFields = document.querySelector('[data-minutes]');
const secondsTimerFields = document.querySelector('[data-seconds');


startBtn.disabled = true;
let countdownInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const currentDate = new Date();

    if (selectedDates[0] - currentDate > 0) {
      startBtn.disabled = false;
       
    } else {
      startBtn.disabled = true;
      Notify.failure('Please choose a date in the future');
     
    }
  },
};

startBtn.addEventListener('click', onTimerStart);

//initialisation de library

const fplib = flatpickr(datetimePicker, options);


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
//add 0 au debut

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

//lancement de timer

function onTimerStart() {
  const selectedDate = fplib.selectedDates[0];

  countdownInterval = setInterval(() => {
    const startTime = new Date();
    const countdown = selectedDate - startTime;
    startBtn.disabled = true;

    if (countdown < 0) {
      clearInterval(countdownInterval);
      return;
    }
    updateTimerInterface(convertMs(countdown));
  }, 1000);
}

//mise à jour interface

function updateTimerInterface({ days, hours, minutes, seconds }) {
  daysTimerFields.textContent = addLeadingZero(days);
  hoursTimerFields.textContent = addLeadingZero(hours);
  minutesTimerFields.textContent = addLeadingZero(minutes);
  secondsTimerFields.textContent = addLeadingZero(seconds);
}
