let timerObj = {
    minutes: 0,
    seconds: 0,
    timerId: 0 
}

function soundAlarm() {
    let amount = 1; 
    let audio = new Audio("kim_possible.mp3");  

    function playSound() {      // child function: declare and called within a function 
        audio.pause();          // pause any audio
        audio.currentTime = 0;  // sets the current position in seconds in the audio file (= 0)
        audio.play();           // play audio 
    }

    for(let i = 0; i < amount; i++) {       // for amount of times,
        setTimeout(playSound, 1002 * i);    // play the audio 
    }   // because for loop does it all at once, and the audio needs to be played one after the other,
}       // use setTimeout to play it after a 1000 * i ms has passed 

function updateValue(key, value) {
    if (value < 0) {
        value = 0; 
    }
    if (key == "seconds") {
        if (value < 10) {
            value = "0" + value; 
        }
        if (value > 59) {
            value = 59; 
        }
    }

    $("#" + key).html(value || 0); 
    timerObj[key] = value;  

    console.log("Min", timerObj.minutes);
    console.log("Sec", timerObj.seconds);
}

// self-calling function
(function detectChanges(key) {
    console.log("Detect changes")

    let input = "#" + key + "-input";

    $(input).change(function() {
        updateValue(key, $(input).val()); 
    });

    $(input).keyup(function() {
        updateValue(key, $(input).val()); 
    });
    
    return arguments.callee; 
})("minutes")("seconds"); 

function startTimer() { 
    buttonManager(["start", false], ["pause", true], ["stop", true]);
    freezeInputs(); 

    timerObj.timerId = setInterval(function() {
        timerObj.seconds--; 
        if(timerObj.seconds < 0) {
            if (timerObj.minutes == 0) {
                soundAlarm();
                return stopTimer(); // return from this function and call stopTimer()
            }
            timerObj.seconds = 59; 
            timerObj.minutes--;
        }

        updateValue("minutes", timerObj.minutes);
        updateValue("seconds", timerObj.seconds);
    }, 1000);
}

function stopTimer() {
    clearInterval(timerObj.timerId);
    buttonManager(["start", true], ["pause", false], ["stop", false]);
    unfreezeInputs();
    updateValue("minutes", $("#minutes-input").val());
    updateValue("seconds", $("#seconds-input").val());
}

function pauseTimer() {
    buttonManager(["start", true], ["pause", false], ["stop", true]);
    clearInterval(timerObj.timerId); 
}

// ie: [start, false], [pause, true]

function buttonManager(...buttonsArray) {
    for (let i = 0; i < buttonsArray.length; i++) {
        let button = "#" + buttonsArray[i][0] + "-button";  // #start-button
        if (buttonsArray[i][1]) { // true or false
            $(button).removeAttr("disabled");
        } else {
            $(button).attr("disabled", "disabled"); // like adding the attribute 
        }
    }
}

function freezeInputs() {
    $("#minutes-input").attr("disabled", "disabled");
    $("#seconds-input").attr("disabled", "disabled");
}

function unfreezeInputs() {
    $("#minutes-input").removeAttr("disabled", "disabled");
    $("#seconds-input").removeAttr("disabled", "disabled");
}

// rest operator: 
// pass in as many arguments as you want to a function 
// variable number of arguments 
// separate other arguments with commas before the rest operator

function setTimer25() {
    clearInterval(timerObj.timerId);
    timerObj.seconds = 0; 
    timerObj.minutes = 25; 
}

function setTimer10() {
    clearInterval(timerObj.timerId);
    timerObj.seconds = 0; 
    timerObj.minutes = 10;
}

function setTimer5() {
    clearInterval(timerObj.timerId);
    timerObj.seconds = 0; 
    timerObj.minutes = 5;
}