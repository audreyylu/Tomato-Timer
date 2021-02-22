let timerObj = {
    minutes: 0,
    seconds: 0,
    timerId: 0 
}

function soundAlarm() {
    let amount = 1; 
    let audio = new Audio("kim_possible.mp3");  

    function playSound() {      
        audio.pause();          
        audio.currentTime = 0;  
        audio.play();           
    }

    for(let i = 0; i < amount; i++) {       
        setTimeout(playSound, 1002 * i);    
    }   
}      

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
                return stopTimer(); 
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

function buttonManager(...buttonsArray) {
    for (let i = 0; i < buttonsArray.length; i++) {
        let button = "#" + buttonsArray[i][0] + "-button";  
        if (buttonsArray[i][1]) { 
            $(button).removeAttr("disabled");
        } else {
            $(button).attr("disabled", "disabled"); 
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