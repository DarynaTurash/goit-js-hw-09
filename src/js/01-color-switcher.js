const refs = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    bodyEl: document.querySelector('body'),
};

let timerId = null;
let currentColor = '';
refs.btnStop.setAttribute('disabled', 'disabled');


refs.btnStart.addEventListener('click', onChangeColor);
refs.btnStop.addEventListener('click', onStopChanging);

function onChangeColor() {
    timerId = setInterval(() => {
        currentColor = getRandomHexColor();
        refs.bodyEl.style.backgroundColor = currentColor;
        refs.btnStart.setAttribute('disabled', 'disabled');
        refs.btnStop.removeAttribute('disabled');
    }, 1000);
};

function onStopChanging() {
    clearInterval(timerId);
    refs.btnStart.removeAttribute('disabled');
    refs.btnStop.setAttribute('disabled', 'disabled');
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}


