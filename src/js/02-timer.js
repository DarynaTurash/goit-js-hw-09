import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    dateInput: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('button[data-start]'),
    days: document.querySelector("span[data-days]"),
    hours: document.querySelector("span[data-hours]"),
    minutes: document.querySelector("span[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),
};

refs.btnStart.setAttribute('disabled', 'disabled');

flatpickr(refs.dateInput, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];

        if(selectedDate <= new Date()) {
            alert("Please choose a date in the future");
            return;
        } 
    
        refs.btnStart.removeAttribute('disabled');
        refs.btnStart.addEventListener('click', () => {
            refs.dateInput.setAttribute('disabled', 'disabled');
            startCutdown(selectedDate);
        })
    },
});

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
};

function startCutdown(chosenDate) {
    function updateTimer() {
            const currentDate = new Date();
            const timeDifference = chosenDate.getTime() - currentDate.getTime();
        
            if (timeDifference <= 0) {
                clearInterval(timer);
                refs.days.textContent = "00";
                refs.hours.textContent = "00";
                refs.minutes.textContent = "00";
                refs.seconds.textContent = "00";
                return;
            }
        
            const { days, hours, minutes, seconds } = convertMs(timeDifference);
            refs.days.textContent = addLeadingZero(days);
            refs.hours.textContent = addLeadingZero(hours);
            refs.minutes.textContent = addLeadingZero(minutes);
            refs.seconds.textContent = addLeadingZero(seconds);
        }

    const timer = setInterval(updateTimer, 1000);
    updateTimer();
};

function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
};

