var start = 0, score = 0;



//Actions of click on the start/reset button
document.getElementById('startReset').onclick = function () {

    if (start<1) { // if the game has not yet started

        start=0;
        genNewQnAnsw();
        startGame();
        reduceTime();

    } else if (start>0){ //if game has ending

        resetGame(); //button will reset game
    }


};

//generates new questions and answers
function genNewQnAnsw() {

        var qn1 = 1+ Math.round(Math.random()*11),
            qn2 = 1 + Math.round(Math.random()*11),
            correctPos = 1 + Math.round(3 * Math.random()),
            answ = qn1 * qn2;



        //set question
        document.getElementById("question").innerHTML = qn1 + 'x' + qn2;

        //sets answer in correct position
        document.getElementById("box" + correctPos ).value = answ;
        document.getElementById("box" + correctPos ).innerHTML = answ;

        var answers = [answ];

        //loads wrong answers in boxes
        for (i =1; i<5; i++){
            if(i !== correctPos){
               var wrongAnsw;

               //Makes sure wrong answer is never equal to correct answer
               do {
                   wrongAnsw = (1 + Math.round(12 * Math.random())) * (1 + Math.round(12 * Math.random()));
               }while (answers.indexOf(wrongAnsw)>-1);

                    //makes sure two of the same wrong answers appear in the boxes


                       document.getElementById("box" + i).value = wrongAnsw;
                       document.getElementById("box" + i).innerHTML = wrongAnsw;

                   answers.push(wrongAnsw);





            }
        }


        //tests to see if box 1 has the correct answer
        document.getElementById("box1").onclick = function () {

        if (start == 0){

            if (document.getElementById("box1").value == answ){
                correctAnswMsg();
            } else {
                worngAnswMsg()
            }

        }
    };

        document.getElementById("box2").onclick = function () {

            if (start == 0) {

                if (document.getElementById("box2").value == answ) {
                    correctAnswMsg();

                } else {
                    worngAnswMsg()
                }

            }

        };

        document.getElementById("box3").onclick = function () {

            if (start == 0) {

                if (document.getElementById("box3").value == answ) {
                    correctAnswMsg();




                } else {
                    worngAnswMsg()
                }
            }
    };

        document.getElementById("box4").onclick = function () {

            if (start == 0) {

                if (document.getElementById("box4").value == answ) {
                    correctAnswMsg();

                } else {
                    worngAnswMsg()
                }


            }

        }
}


//changes start button text to reset
function startGame() {
    document.getElementById("startReset").innerHTML = "Reset Game";
}

//reloads game
function resetGame() {
    location.reload();
}

//function to start timer
function reduceTime() {
    //displays timer
    document.getElementById("timeRemaining").style.display = "block";

        //sets start time value
        var time = 60;

        //sets location to display timer
        document.getElementById("timeRemainingValue").innerHTML = time + "s";



        var timeCounter = setInterval(function () {

            //set time to be deducted
            time --;


            if (time>=0){
                // sets timer in the location that was set
                document.getElementById("timeRemainingValue").innerHTML = time + "s";
                //Game reloads if reset button is clicked while game is running
                document.getElementById('startReset').onclick = function () {
                    resetGame();
                }
            } else{ // when timer hits zero
                // displays game over text
                document.getElementById("gameOver").style.display = "block";
                //changes reset button to start button
                document.getElementById("startReset").innerHTML = "Start Game";
                //displays final score in game over text
                document.getElementById("endScoreValue").innerHTML = score;
                //stops and clears the counter
                clearInterval(timeCounter);
                //Adds one to start variable
                start++;
            }

        },1000);

}

//function to display correct message
function correctAnswMsg(){
    //set correct text to visible
    hide("wrong");
    show("correct");
    // document.getElementById("correct").style.display = "block";
    //displays correct text for one second
    setTimeout(function () {
        hide("correct");

    },1000);

    //increases score
    increaseScore();
    //generates new question and answers
    genNewQnAnsw();

}

function worngAnswMsg(){
    //displays wrong answer message
    hide("correct");
    show("wrong");
    // document.getElementById("wrong").style.display = "block";

    //displays wrong answer message for one second
    setTimeout(function () {
        hide("wrong");
    },1000);

}

//function to increase score
function increaseScore() {

    //adds one to score
    score++;

    //displays current score
    document.getElementById("scoreValue").innerHTML = score;

}

function hide(id) {
    document.getElementById(id).style.display = "none";
}

function show(id) {
    document.getElementById(id).style.display = "block";
}

