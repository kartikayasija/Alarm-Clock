let alarms = [];
let music = new Audio("Alarm-ringtone.mp3");
const select = document.querySelectorAll("select");

const updateTime = () => {
  let today = new Date();
  let date = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  let amPm = "AM";
  if(hours==0) hours=12;
  if(hours>12) {
    hours-=12;
    amPm="PM";
  }
  if(hours==12){
    amPm="PM";
  }

  let currentDate = date + "/" + month + "/" + year;
  document.querySelector(".date").innerHTML = currentDate;

  let currentTime = hours + ":" + minutes + ":" + seconds + ":"+amPm;
  document.querySelector(".time").innerHTML = currentTime;

  alarms.forEach((alarm)=>{
    if(alarm==currentTime){
      console.log("aaaaa");
      music.load();
      music.play();
      document.querySelector("#stopButton").style.display="block";
    }
  })
};
updateTime();
setInterval(updateTime, 1000);

const setOptions = () => {
  document.querySelector("#hours").innerHTML= "<option selected hidden>Hour</option>";
  document.querySelector("#minutes").innerHTML= "<option selected hidden>Min</option>";
  for (let i = 12; i > 0; i--) {
    let option = `<option value="${i}">${i}</option>`;
    select[0].firstElementChild.insertAdjacentHTML("afterend", option);
  }
  for (let i = 59; i > 0; i--) {
    let option = `<option value="${i}">${i}</option>`;
    select[1].firstElementChild.insertAdjacentHTML("afterend", option);
  }
};
setOptions();

const refresh = ()=>{
  let alarmList = document.querySelector(".alarmList");
  alarmList.innerHTML = "";

  alarms.forEach((alarm,index)=>{
    let input = document.querySelector("#note").value;
    alarmList.innerHTML += `<li> ${alarm} <button class="deleteAlarm" onclick="deleteAlarm(${index})">❌</button> <br> ${input} </li>`;
    console.log(`added ${alarm}`)
  })
}
const addAlarm = () => {
  document.querySelector(".alarmHeading").innerHTML = "All Alarms";
  let time = `${select[0].value}:${select[1].value}:0:${select[2].value}`;

  if(!alarms.includes(time)){
    alarms.push(time);
  }else{
    alert("already added")
  }
  refresh();
  setOptions();
};
const deleteAlarm =(index)=>{
  alarms.splice(index,1);
  refresh();
}
const stopAlarm=()=>{
  music.pause();
  document.querySelector("#stopButton").style.display="none";
};
