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

btnStart.addEventListener("click", function () {
  cdownfunc();
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

btnReset.addEventListener("click", function () {
  time = 0;
  calcTime(time);
  inputSec.value = "";
  clearInterval(cdown);
  temp = 0;
  btnStart.style.display = "block";
  btnStop.style.display = "none";
  btnReset.style.display = "none";
});
