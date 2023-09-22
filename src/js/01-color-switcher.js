const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');
let intervalId = null;

btnStartEl.addEventListener('click', onClickStartChangeColor)
    function onClickStartChangeColor(event) {
  btnStartEl.disabled = true;
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

btnStopEl.addEventListener('click', onClickStopChangeColor);
    function onClickStopChangeColor(event) {
    btnStartEl.disabled = false;
  clearInterval(intervalId);
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
