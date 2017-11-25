var intervalID1;
var intervalID2;
var count = 0;
var minuteCount = 0;
var hourCount = 0;
var currentHours = parseInt(document.getElementById("hours").textContent);
var currentMinutes = parseInt(document.getElementById("minutes").textContent);
var currentSeconds = parseInt(document.getElementById("seconds").textContent);
var startingHours;
var startingMinutes;
var startingSeconds;
var totalHours = parseInt(document.getElementById("totalHours").textContent);
var totalMinutes = parseInt(document.getElementById("totalMinutes").textContent);
var totalSeconds = parseInt(document.getElementById("totalSeconds").textContent);
var extraHours = parseInt(document.getElementById("extraHours").textContent);
var extraMinutes = parseInt(document.getElementById("extraMinutes").textContent);
var extraSeconds = parseInt(document.getElementById("extraSeconds").textContent);
var complete = false;
var ticking = false;



//Decrement Time
function decrementTime(){
  
  if(currentSeconds == 0 && currentMinutes == 0 && currentHours == 0){
    
    giveUp();
    startExtraTimeCount();
    resetMainClock();
    
  }else{
    
    if(currentSeconds == 0){         
      currentSeconds = 59;
      currentMinutes--;

      if(currentMinutes == 0 && currentHours > 0){
        currentMinutes = 59;
        currentHours--;
        
        if(currentHours == 0){
          $("#hours").css("display", "none");
          $("#mainHoursColon").css("display", "none");
          $("#mainScreen").css("font-size", 225);

        }
      }
    }else{ 
      currentSeconds--;
          
      if(currentSeconds == 0){      
        minuteCount++;
        
        if(minuteCount == 60){
          minuteCount = 0;
          hourCount++;
          
        }
            
      }
    }

     if(currentHours < 10 && currentHours.toString().length < 2){
       currentHours = "0" + currentHours;
       
     }if(currentMinutes < 10 && currentMinutes.toString().length < 2){
       currentMinutes = "0" + currentMinutes;
       
     }if(currentSeconds < 10 && currentSeconds.toString().length < 2){
       currentSeconds = "0" + currentSeconds;
     }
    
     document.getElementById("hours").textContent = currentHours;
     document.getElementById("minutes").textContent = currentMinutes;
     document.getElementById("seconds").textContent = currentSeconds;
    
   }
 
 }

//Increments extra time after oringinal clock was finished
function incrementTime(){
  
  if(extraSeconds == 59){
     extraSeconds = 0;
     extraMinutes++;
    
    if(extraMinutes == 59){
      extraMinutes = 0;
      extraHours++;
    }
    
   }else{   
     extraSeconds++;
   }
  
  if(extraHours > 0){
    $("#extraHours").css("display", "inline");
    $("#extraHoursColon").css("display", "inline");

  }
  
  if(extraHours < 10 && extraHours.toString().length < 2){
    extraHours = "0" + extraHours;
    
  }if(extraMinutes < 10 && extraMinutes.toString().length < 2){
    extraMinutes = "0" + extraMinutes;
    
  }if(extraSeconds < 10 && extraSeconds.toString().length < 2){
    extraSeconds = "0" + extraSeconds;
  }
  
  document.getElementById("extraHours").textContent = extraHours;
  document.getElementById("extraMinutes").textContent = extraMinutes;
  document.getElementById("extraSeconds").textContent = extraSeconds;
  
}


function startExtraTimeCount(){
  
  ticking = true;
  complete = true;
  intervalID2 = setInterval(incrementTime, 1000);
  
}

//Function that starts the countdown
function startClock(){

  if(count == 0 && (currentMinutes > 0 || currentHours > 0)){
    
    count++;
    ticking = true;
    startingHours = document.getElementById("hours").textContent;
    startingMinutes = document.getElementById("minutes").textContent;
    startingSeconds =  document.getElementById("seconds").textContent;

    intervalID1 = setInterval(decrementTime, 1000);

  }
  
}

//Function stops the ticking of the clock
function stopClock(){  
  
  count = 0;
  ticking = false;  
  clearInterval(intervalID1);
  
}

function stopExtraTimeClock(){
  
  clearInterval(intervalID2);
  ticking = false;
  complete = false;
  
}

function addExtraTimeToTotalTime(){
  
  totalSeconds = parseInt(totalSeconds) +  parseInt(extraSeconds);
  
  if(totalSeconds >= 60){
    totalSeconds -= 60;
    totalMinutes++;
  }
  
  totalMinutes = parseInt(totalMinutes) + parseInt(extraMinutes);
  
  if(totalMinutes >= 60){
    totalMinutes -= 60;
    totalHours++;
  }
  
  totalHours = parseInt(totalHours) + parseInt(extraHours);
  
  if(totalHours > 0){
    $("#totalHours").css("display", "inline");
    $("#totalHoursColon").css("display", "inline");

  }

  var totalHoursString = totalHours.toString();
  var totalMinutesString = totalMinutes.toString();
  var totalSecondsString = totalSeconds.toString();
  
  if(parseInt(totalHours) < 10 && totalHoursString.length < 2){
    totalHours = "0" + totalHours;
    
  }if(parseInt(totalMinutes) < 10 && totalMinutesString.length < 2){
    totalMinutes = "0" + totalMinutes;
    
  }if(parseInt(totalSeconds) < 10 && totalSecondsString.length < 2){
    totalSeconds = "0" + totalSeconds;
  }
  
  extraHours = 00;
  extraMinutes = 00;
  extraSeconds = 00;
  document.getElementById("totalHours").textContent = totalHours;
  document.getElementById("totalMinutes").textContent = totalMinutes;
  document.getElementById("totalSeconds").textContent = totalSeconds;
 
  
}


function resetExtraTimeClock(){
  
  $("#extraHours").css("display", "none");
  $("#extraHoursColon").css("display", "none");
  
  extraHours = "00";
  extraMinutes = "00";
  extraSeconds = "00";
  document.getElementById("extraHours").textContent = extraHours;
  document.getElementById("extraMinutes").textContent = extraMinutes;
  document.getElementById("extraSeconds").textContent = extraSeconds;
  
}


function giveUp(){
  
  if(ticking == true){

    stopClock();
    updateTotalTime();
    resetMainClock();

    if(complete == true){
      updateTotalTime();
      startCountExtraTime();
      resetMainClock();
      
    }
  }
}



function updateTotalTime(){
  
  var secondsFocused;
  var adjustedSecondsFocused;
  if(parseInt(currentSeconds) == 0){
    secondsFocused = 0;  
    
  }else{
    secondsFocused = 60 - parseInt(currentSeconds);
    
  }

  adjustedSecondsFocused = parseInt(totalSeconds) + parseInt(secondsFocused);
  
  if(adjustedSecondsFocused >= 60){
    adjustedSecondsFocused -= 60;
    minuteCount++;

  }if(minuteCount >= 60){
    minuteCount -= 60;
    hourCount++;
    
  }if(hourCount > 0){
    $("#totalHours").css("display", "inline");
    $("#totalHoursColon").css("display", "inline");

  }
  
  totalHours = hourCount;
  totalMinutes = minuteCount;
  totalSeconds = adjustedSecondsFocused;
  
   if(totalHours < 10 && totalHours.toString().length < 2){
    totalHours = "0" + totalHours;
     
  }if(totalMinutes < 10 && totalMinutes.toString().length < 2){
    totalMinutes = "0" + totalMinutes;
    
  }if(totalSeconds < 10 && totalSeconds.toString().length < 2){
    totalSeconds = "0" + totalSeconds;
  }

  document.getElementById("totalHours").textContent = totalMinutes;
  document.getElementById("totalMinutes").textContent = totalMinutes;
  document.getElementById("totalSeconds").textContent = totalSeconds;  
}


function resetMainClock(){
    
  currentHours = "00";
  currentMinutes = "00";
  currentSeconds = "00";
  
  document.getElementById("hours").textContent = currentHours;
  document.getElementById("minutes").textContent = currentMinutes;
  document.getElementById("seconds").textContent = currentSeconds;
  
  $("#hours").css("display", "none");
  $("#mainColonHours").css("display", "none");
  $("#mainScreen").css("font-size", 225);
  
}



function increaseMinutes(){
    
  if(ticking == false){
    currentMinutes++;
    
    if(currentMinutes == 60){
      currentHours++;
      currentMinutes = 0;
      
    }
    if(currentHours > 0){
      $("#hours").css("display", "inline");
      $("#mainColonHours").css("display", "inline");
      $("#mainScreen").css("font-size", 120);
      
    } 
    
    if(currentMinutes < 10){
      currentMinutes = "0" + currentMinutes;
      
    }if(currentHours < 10 && currentHours.toString().length < 2){
      currentHours = "0" + currentHours;
      
    }
    
    document.getElementById("hours").textContent = currentHours;
    document.getElementById("minutes").textContent = currentMinutes;

  }
  
}

function increaseMinutesBy5(){
  
    if(ticking == false){
      currentMinutes = parseInt(currentMinutes) + 5;

      if(currentMinutes >= 60){
        currentHours++;
        currentMinutes -= 60;
        
      }
      if(currentHours > 0){
        $("#hours").css("display", "inline");
        $("#mainColonHours").css("display", "inline");
        $("#mainScreen").css("font-size", 120);
        
      }
      if(currentMinutes < 10){
      currentMinutes = "0" + currentMinutes;
        
      }
      if(currentHours < 10 && currentHours.toString().length < 2){
        currentHours = "0" + currentHours;
        
      }
      
      document.getElementById("hours").textContent = currentHours;
      document.getElementById("minutes").textContent = currentMinutes;
    }

}

//Decreases the starting minutes value
function decreaseMinutes(){
  
    if(ticking == false && (currentMinutes > 0 || currentHours > 0)){
            
      if(currentMinutes == 0 && currentHours > 0){
        currentMinutes = 59;
        currentHours--;
       
      }else{
        currentMinutes--;
      }
      if(currentHours == 0){       
        $("#hours").css("display", "none");
        $("#mainColonHours").css("display", "none");
        $("#mainScreen").css("font-size", 225);
        
      }      
      if(currentMinutes < 10 && currentMinutes.toString().length < 2){
        currentMinutes = "0" + currentMinutes;
      }      
      if(currentHours < 10 && currentHours.toString().length < 2){
        currentHours = "0" + currentHours;
      }
          
      document.getElementById("hours").textContent = currentHours;
      document.getElementById("minutes").textContent = currentMinutes;
    }
  
}

//Decreases the minutes by 5
 function decreaseMinutesBy5(){
   
     if(ticking == false && (currentMinutes > 0 || currentHours > 0)){
       currentMinutes-=5;
       if(currentMinutes < 0 && currentHours > 0){
         currentHours--;
         currentMinutes = 60 + currentMinutes;
         
       }
       
       if(currentMinutes < 0 && currentHours == 0){
         currentMinutes = 0;
         
       }
       if(currentHours == 0){
           $("#hours").css("display", "none");
           $("#mainColonHours").css("display", "none");
           $("#mainScreen").css("font-size", 225);
         
       }
       
       if(currentMinutes < 10 && currentMinutes.toString().length < 2){
         currentMinutes = "0" + currentMinutes;
         
       }if(currentHours < 10 && currentHours.toString().length < 2){
         currentHours = "0" + currentHours;
         
       } 
       
       document.getElementById("hours").textContent = currentHours;
       document.getElementById("minutes").textContent = currentMinutes;
     }
   
 }



$("#screen").click(function(){
    
  if(ticking == false){ 
    startClock();
    $("h3").text("Click the Screen to Stop");
    
  }else if(ticking == true && complete == false){
    giveUp();
    $("h3").text("Click the Screen to Begin");
    
  }else if(ticking == true && complete == true){
    stopExtraTimeClock();
    addExtraTimeToTotalTime();
    resetExtraTimeClock();
    $("h3").text("Click the Screen to Begin");

  }
})

$("#plus1").click(function(){ 
  increaseMinutes();
})
$("#plus5").click(function(){ 
  increaseMinutesBy5();
})
$("#minus1").click(function(){ 
  decreaseMinutes();
})
$("#minus5").click(function(){ 
  decreaseMinutesBy5();
})
