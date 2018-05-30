let regularTimeInterval, bonusTimeInterval, minuteCount = -1, complete = false, ticking = false

let currentTime = {
  hours: +document.getElementById('hours').textContent,
  minutes: +document.getElementById('minutes').textContent,
  seconds: +document.getElementById('seconds').textContent
},
  totalTime = {
  hours: +document.getElementById('totalHours').textContent,
  minutes: +document.getElementById('totalMinutes').textContent,
  seconds: +document.getElementById('totalSeconds').textContent
},
  extraTime = {
  hours: 0,
  minutes: 0,
  seconds: 0
}

// functions that perform main clock functionalities

//Function that starts the countdown
function startClock(){
  minuteCount = -1

  if (ticking === false && (currentTime.minutes > 0 || currentTime.hours > 0)){

    ticking = true
    regularTimeInterval = setInterval(clockTick, 1000)
  }
}

//Function stops the ticking of the clock
function stopClock(){
  ticking = false
  clearInterval(regularTimeInterval)
}


//Decrement Time
function clockTick(){

  if (+currentTime.seconds === 0 && +currentTime.minutes === 0 && +currentTime.hours === 0){

    giveUp()
    startExtraTimeCount()
    resetMainClock()
  } else {

    if (+currentTime.seconds === 0){
      currentTime.seconds = 59
      currentTime.minutes--
      minuteCount++

      if (+currentTime.minutes === 0 && currentTime.hours > 0){
        currentTime.minutes = 59
        currentTime.hours--

      }
    } else {
      currentTime.seconds--
    }

    updateMainClockScreen()
   }
 }

 function giveUp(){

  if (ticking === true){

    stopClock()

    if (complete === true){
      startExtraTimeCount()
    }
  }
  updateTotalTime()
  resetMainClock()
}

function resetMainClock(){

  currentTime.hours = '00'
  currentTime.minutes = '00'
  currentTime.seconds = '00'

  document.getElementById('hours').textContent = currentTime.hours
  document.getElementById('minutes').textContent = currentTime.minutes
  document.getElementById('seconds').textContent = currentTime.seconds

  $('#hours').css('display', 'none')
  $('#mainColonHours').css('display', 'none')
  $('#mainScreen').css('font-size', 225)

}

function updateMainClockScreen(){

  if (+currentTime.hours === 0){

    $('#hours').css('display', 'none')
    $('#mainColonHours').css('display', 'none')
    $('#mainScreen').css('font-size', 225)
  } else {

    $('#hours').css('display', 'inline')
    $('#mainColonHours').css('display', 'inline')
    $('#mainScreen').css('font-size', 120) 
  }

  if (currentTime.seconds < 10 && currentTime.seconds.toString().length < 2){
    currentTime.seconds = '0' + currentTime.seconds
  }
  if (currentTime.minutes.toString().length < 2){
    currentTime.minutes = '0' + currentTime.minutes
  }
  if (currentTime.hours.toString().length < 2){
    currentTime.hours = '0' + currentTime.hours
  }

  document.getElementById('hours').textContent = currentTime.hours
  document.getElementById('minutes').textContent = currentTime.minutes
  document.getElementById('seconds').textContent = currentTime.seconds

}


// change start time

function increaseMinutes(amount){

  if (ticking === false){
    currentTime.minutes = +currentTime.minutes + amount

    if (currentTime.minutes >= 60){
      currentTime.hours++
      currentTime.minutes -= 60
    }

    updateMainClockScreen()
  }
}

 function decreaseMinutes(amount){

  if (ticking === false && (currentTime.minutes > 0 || currentTime.hours > 0)){

    currentTime.minutes -= amount

    if (currentTime.minutes < 0 && +currentTime.hours > 0){
      currentTime.hours--
      currentTime.minutes = 60 + currentTime.minutes
    }
    if (currentTime.minutes < 0 && +currentTime.hours === 0){
      currentTime.minutes = 0
    }

    updateMainClockScreen()
  }
}


//Increments extra time after oringinal clock was finished
function incrementBonusTime(){

  if (+extraTime.seconds === 59){
     extraTime.seconds = 0
     extraTime.minutes++

    if (+extraTime.minutes === 59){
      extraTime.minutes = 0
      extraTime.hours++
    }

   } else {
     extraTime.seconds++
   }
   updateExtraTimeClock()
}

function updateExtraTimeClock(){

  if (extraTime.hours > 0){
    $('#extraHours').css('display', 'inline')
    $('#extraHoursColon').css('display', 'inline')
  }

  if (extraTime.hours < 10 && extraTime.hours.toString().length < 2){
    extraTime.hours = '0' + extraTime.hours

  } if (extraTime.minutes < 10 && extraTime.minutes.toString().length < 2){
    extraTime.minutes = '0' + extraTime.minutes

  } if (extraTime.seconds < 10 && extraTime.seconds.toString().length < 2){
    extraTime.seconds = '0' + extraTime.seconds
  }
  document.getElementById('extraHours').textContent = extraTime.hours
  document.getElementById('extraMinutes').textContent = extraTime.minutes
  document.getElementById('extraSeconds').textContent = extraTime.seconds
}


function startExtraTimeCount(){

  ticking = true
  complete = true
  bonusTimeInterval = setInterval(incrementBonusTime, 1000)
}

function stopExtraTimeClock(){

  clearInterval(bonusTimeInterval)
  ticking = false
  complete = false
}

function addExtraTimeToTotalTime(){

  totalTime.seconds = +totalTime.seconds +  +extraTime.seconds

  if (totalTime.seconds >= 60){
    totalTime.seconds -= 60
    totalTime.minutes++
  }

  totalTime.minutes = +totalTime.minutes + +extraTime.minutes

  if (totalTime.minutes >= 60){
    totalTime.minutes -= 60
    totalTime.hours++
  }

  totalTime.hours = +totalTime.hours + +extraTime.hours

  if (totalTime.hours > 0){
    $('#totalHours').css('display', 'inline')
    $('#totalHoursColon').css('display', 'inline')
  }

  updateTotalClockScreen()
}


function resetExtraTimeClock(){

  $('#extraHours').css('display', 'none')
  $('#extraHoursColon').css('display', 'none')

  extraTime.hours = '00'
  extraTime.minutes = '00'
  extraTime.seconds = '00'
  document.getElementById('extraHours').textContent = extraTime.hours
  document.getElementById('extraMinutes').textContent = extraTime.minutes
  document.getElementById('extraSeconds').textContent = extraTime.seconds
}


function updateTotalTime(){

  let secondsFocused = +currentTime.seconds === 0 ? 0 : 60 - currentTime.seconds,
    minutesFocused = minuteCount % 60,
    hoursFocused = Math.floor(minuteCount / 60)


  totalTime.seconds = +totalTime.seconds + secondsFocused
  totalTime.minutes = +totalTime.minutes + minutesFocused
  totalTime.hours = +totalTime.hours + hoursFocused

  if (totalTime.seconds >= 60){
    totalTime.minutes += 1
    totalTime.seconds -= 60
  }

  if (totalTime.minutes >= 60){
    totalTime.hours += 1
    totalTime.minutes -= 60
  }
  updateTotalClockScreen()
}


function updateTotalClockScreen(){
  var totalHoursString = totalTime.hours.toString()
  var totalMinutesString = totalTime.minutes.toString()
  var totalSecondsString = totalTime.seconds.toString()

  if (totalTime.hours > 0){
    $('#totalHours').css('display', 'inline')
    $('#totalHoursColon').css('display', 'inline')

  }

  if (+totalTime.hours < 10 && totalHoursString.length < 2){
    totalTime.hours = '0' + totalTime.hours

  } if (+totalTime.minutes < 10 && totalMinutesString.length < 2){
    totalTime.minutes = '0' + totalTime.minutes

  } if (+totalTime.seconds < 10 && totalSecondsString.length < 2){
    totalTime.seconds = '0' + totalTime.seconds
  }

  extraTime.hours = '00'
  extraTime.minutes = '00'
  extraTime.seconds = '00'
  document.getElementById('totalHours').textContent = totalTime.hours
  document.getElementById('totalMinutes').textContent = totalTime.minutes
  document.getElementById('totalSeconds').textContent = totalTime.seconds
}

$('#screen').click(function(){

  if (ticking === false){
    startClock()
    $('h3').text('Click the Screen to Stop')

  } else if ( complete === true){
    stopExtraTimeClock()
    addExtraTimeToTotalTime()
    resetExtraTimeClock()
    $('h3').text('Click the Screen to Begin')

  } else {
    giveUp()
    $('h3').text('Click the Screen to Begin')
  }
})

$('#plus1').click(function(){
  increaseMinutes(1)
})
$('#plus5').click(function(){
  increaseMinutes(5)
})
$('#minus1').click(function(){
  decreaseMinutes(1)
})
$('#minus5').click(function(){
  decreaseMinutes(5)
})
