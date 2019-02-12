// Simple JS Code for Date and Time

// ==================== Date & Time Variables ==================== 
function time(){
  var today = new Date();
  var day = today.getDay();
  var dateList = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday",
  "Friday", "Saturday"];
  console.log("Today is : " + dateList[day] + ".");
  var hour = today.getHours();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();
  var AMPM;

  // Check for AM or PM
  if (hour >= 12){
    AMPM = " PM ";
  } else {
    AMPM = " AM ";
  }
  
  // Calculate 12 hour time
  if(hour >= 12){
    hour = hour - 12;
  }
  
  // Check for 12:00 PM/AM for Noon or Midnight
  if(hour === 0 && AMPM === ' PM '){
    if(minutes === 0 && seconds === 0){
      hour = 12;
      AMPM = " Noon ";
    } else {
      hour = 12;
      AMPM = " PM ";
    }
  } else if (hour === 0 && AMPM === ' AM '){
    if(minutes === 0 && seconds === 0){
      hour = 12;
      AMPM = " Midnight ";
    } else {
      hour = 12;
      AMPM = " AM ";
    }
  } 
  
  var output = hour + ":" + minutes + ":" + seconds + AMPM;
  if(seconds < 10){
    output = hour + ":" + minutes + ":0" + seconds + AMPM;
  }
  
  console.log(output);
  document.getElementById("Time").innerHTML = output;
  document.getElementById("Day").innerHTML = dateList[day];
}
setInterval(time, 1000);