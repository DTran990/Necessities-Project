const timer = document.querySelector("#timer");
const startbutton = document.querySelector("#startbutton");
const stopbutton = document.querySelector("#stopbutton");
const resetbutton = document.querySelector("#resetbutton");
const lapbutton = document.querySelector("#lapbutton");
const start = document.querySelector(".start");
const s = document.querySelector(".stop");
const reset = document.querySelector(".reset");
const lap = document.querySelector(".lap");
const timelist = document.querySelector("#timelist");
let milliseconds=0;
let seconds = 0;
let minutes = 0;
let lapmilliseconds=0;
let lapseconds = 0;
let lapminutes = 0;
let intervalID = null;
let lapnum = 0;
let split = "0:0.00";
let total = "0:0.00";

const timeconverter = (milliseconds, seconds, minutes) =>{
  let newtotal = "";
  if (milliseconds<10 && seconds<10 && minutes <10){
    newtotal = `0${minutes}:0${seconds}.0${milliseconds}`;
  }
  else if (milliseconds>=10 && seconds<10 && minutes <10){
    newtotal = `0${minutes}:0${seconds}.${milliseconds}`;
  }
  else if (milliseconds<10 && seconds>=10 && minutes <10){
    newtotal=`0${minutes}:${seconds}.0${milliseconds}`;
  }
  else if (milliseconds<10 && seconds<10 && minutes >=10){
    newtotal = `${minutes}:0${seconds}.0${milliseconds}`;
  }
  else if (milliseconds>=10 && seconds>=10 && minutes <10){
    newtotal = `0${minutes}:${seconds}.${milliseconds}`;
  }
  else if (milliseconds>=10 && seconds<10 && minutes >=10){
    newtotal =`${minutes}:0${seconds}.${milliseconds}`;
  }
  else if (milliseconds>=10 && seconds>=10 && minutes >=10){
    newtotal = `${minutes}:${seconds}.${milliseconds}`;
  }
  else if (milliseconds<10 && seconds>=10 && minutes >=10){
    newtotal = `${minutes}:${seconds}.0${milliseconds}`;
  }
  return newtotal;
}
const timerstart = () =>{
  milliseconds++;

  if (milliseconds === 100){
    milliseconds=0;
    seconds++;
  }
  if (seconds === 60){
    seconds=0;
    minutes++;
  }
  total=timeconverter(milliseconds,seconds, minutes);
  timer.innerHTML = `<h1>${total}</h1>`;
}

startbutton.addEventListener("click", (e) => {
  e.preventDefault();
  start.classList.add("d-none");
  s.classList.remove("d-none");
  reset.classList.add("d-none");
  lap.classList.remove("d-none");
  
  intervalID = setInterval(timerstart, 10);
})
stopbutton.addEventListener("click", (e) =>{
  e.preventDefault();
  start.classList.remove("d-none");
  s.classList.add("d-none");
  reset.classList.remove("d-none");
  lap.classList.add("d-none");

  clearInterval(intervalID);
})
lapbutton.addEventListener("click", (e) =>{
  e.preventDefault();
  lapnum++;
  if (lapnum === 1){
    timelist.innerHTML+=`<li>
    <p class="lapnumber">${lapnum}</p>
    <p class="splittime">${total}</p>
    <p class="totaltime">${total}</p>
    </li>`;
    lapmilliseconds=milliseconds;
    lapminutes=minutes;
    lapseconds=seconds;
  }
  else {
    let millisecondsdiff = milliseconds - lapmilliseconds;
    let tempminutes = minutes;
    let tempseconds = seconds;
    if (millisecondsdiff <0){
      tempseconds--;
      millisecondsdiff= 100 - (millisecondsdiff * -1);
    }
    let secondsdiff = tempseconds - lapseconds;
    if (secondsdiff <0){
      tempminutes--;
      secondsdiff = 60 - (secondsdiff * -1);
    }
    split = timeconverter(millisecondsdiff, secondsdiff, tempminutes - lapminutes);
    timelist.innerHTML+=`<li>
    <p class="lapnumber">${lapnum}</p>
    <p class="splittime">${split}</p>
    <p class="totaltime">${total}</p>
    </li>`;

    let timelist2 = document.querySelector("#timelist");
    timelist2.scrollTop = timelist2.scrollHeight;
  }
})
resetbutton.addEventListener("click", (e) =>{
  e.preventDefault();
  timer.innerHTML = "<h1>00:00.00</h1>";
  milliseconds=0;
  seconds = 0;
  minutes = 0;
  intervalID = null;
  lapnum = 0;
  split = "0:0.00";
  total = "0:0.00";
  timelist.innerHTML="";
})

