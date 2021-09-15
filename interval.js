const selector = document.getElementById("selector");
const btnCountDown = document.getElementById("btn-countDown");
const btnStopWatch = document.getElementById("btn-stopWatch");
const welcome = document.getElementById("welcome");
let select = 0;

let msg = document.getElementById("msg");
let inputHour = document.getElementById("input-hour");
let inputMin = document.getElementById("input-min");
let inputSec = document.getElementById("input-sec");
let btnStart = document.getElementById("btn-start");
let btnReset = document.getElementById("btn-reset");
let btnStop = document.getElementById("btn-pause");

let hour = document.getElementById("hour");
let min = document.getElementById("min");
let sec = document.getElementById("sec");

let time;
let temp = 0;
let cdown;

let cdownfunc = function () {
  let hr = inputHour.value || 0;
  let mn = inputMin.value || 0;
  let sc = inputSec.value || 0;

  totalTime = parseFloat(hr) * 3600 + parseFloat(mn) * 60 + parseFloat(sc);
  console.log(totalTime);
  time = totalTime || temp;
  console.log(time);
  inputSec.value = "";
  inputMin.value = "";
  inputHour.value = "";
  cdown = setInterval(function () {
    calcTime(time);
    time--;

    if (time < 0) {
      clearInterval(cdown);
      btnStart.style.display = "block";
      btnStop.style.display = "none";
      btnReset.style.display = "none";
      temp = 0;
    }
  }, 1000);
};

let swatchfunc = function () {
  let hr = inputHour.value || 0;
  let mn = inputMin.value || 0;
  let sc = inputSec.value || 0;

  totalTime = parseFloat(hr) * 3600 + parseFloat(mn) * 60 + parseFloat(sc);

  let fTime = totalTime;
  time = temp || 0;

  inputSec.value = "";
  inputMin.value = "";
  inputHour.value = "";
  cdown = setInterval(function () {
    calcTime(time);
    time++;
    if (fTime == 0) return;
    if (time > fTime) {
      clearInterval(cdown);
      btnStart.style.display = "block";
      btnStop.style.display = "none";
      btnReset.style.display = "none";
      temp = 0;
    }
  }, 1000);
};

btnStart.addEventListener("click", function () {
  if (select === 0) cdownfunc();
  if (select == 1) swatchfunc();
  btnStart.style.display = "none";

  btnStop.style.display = "block";
  btnReset.style.display = "block";
});

btnStop.addEventListener("click", function () {
  temp = time;
  clearInterval(cdown);
  btnStart.style.display = "block";
  btnStop.style.display = "none";
});

function calcTime(seconds) {
  if (seconds < 0) {
    inputSec.value = "";
    inputMin.value = "";
    inputHour.value = "";
    btnStart.style.display = "block";
    msg.style.display = "block";
    return;
  }
  let h = String(Math.trunc(seconds / 3600)).padStart(2, 0);
  let m = String(Math.trunc((seconds % 3600) / 60)).padStart(2, 0);
  let s = String(Math.trunc((seconds % 3600) % 60)).padStart(2, 0);
  hour.textContent = h;
  min.textContent = m;
  sec.textContent = s;
  msg.style.display = "none";
}

function reset() {
  time = 0;
  calcTime(time);
  inputSec.value = "";
  clearInterval(cdown);
  temp = 0;
  btnStart.style.display = "block";
  btnStop.style.display = "none";
  btnReset.style.display = "none";
}

btnReset.addEventListener("click", reset);

btnStopWatch.addEventListener("click", function () {
  btnStopWatch.style.display = "none";
  btnCountDown.style.display = "block";
  welcome.innerText = "Stopwatch";
  welcome.style.backgroundColor = "cornflowerblue";
  select = 1;
  reset();
  working();
});

btnCountDown.addEventListener("click", function () {
  btnStopWatch.style.display = "block";
  btnCountDown.style.display = "none";
  welcome.innerText = "Countdown";
  welcome.style.backgroundColor = "crimson";
  select = 0;
  reset();
  working();
});

function working() {
  const mainPart = document.getElementById("main");
  mainPart.style.display = "block";
  selector.classList.remove("center");
  selector.classList.add("below");
}
