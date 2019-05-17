$(function () {

    var playing = false,
        score,
        health,
        step,
        action,
        fruits = ['apple','cherries','grapes','mango','melon',
        'peach','pear','pineapple','strawberry'];


//click on start/reset button
    $('#startReset').click(function () {

        //if game is running and reset button is pressed
        if (playing == true){

            //reload game when clicked
            location.reload()

            //if game is not running and start button is pressed
        } else {
            // if (playing == false)
            playing = true;

            score = 0;

            $('#scoreValue').html(score);

            hideItem('#gameOver');

            //displays remaining hearts
            showItem('#lifeRemaining');

            health = 3;
            addHearts();

            //changes 'start game' to 'reset game
            changeText();

            createFruit();

            moveFruit();

            // sliceFruit();




        }
    });

    function showItem(id) {
        $(id).show()
    }

    function hideItem(id) {
        $(id).hide();
    }

    function changeText() {
        $('#startReset').text('Reset Game');
    }

    function increaseScore() {
        score++;

        $('#scoreValue').html(score);
    }

    function addHearts() {
        $('#lifeRemaining').empty();
        for (i = 0; i < health; i++){
            $('#lifeRemaining').append('<img src="images/heart.png" class="hearts">');
        }
    }
    
    function removeHeart() {
        health --;
        addHearts();
    }

    function createFruit() {

        // $('#fruit1').show();
        showItem('#fruit1');
        chooseFruit();
        //selects random horizontal position 
        $('#fruit1').css({'left' : Math.round(750 * Math.random()), 'top': 0});


    }


    function chooseFruit() {
        //selects random fruit image 
        $('#fruit1').attr('src','images/' + fruits[Math.round(8 * Math.random())] + '.png')
    }
    
    function moveFruit() {
        //generates random step
        step = 1 + Math.round(5 * Math.random());

        //moves fruit down by one step every 10ms
        action = setInterval(function () {
            $('#fruit1').css('top',$('#fruit1').position().top + step);

            //check if fruit is too low
            if ($('#fruit1').position().top > $('#fruitContainer').height()){

                //if user has health remaining
                if(health > 1){

                    createFruit();
                    step = 1 + Math.round(5 * Math.random());
                    removeHeart();

                }else{
                    //game over
                    playing = false;
                    hideItem('#fruit1');
                    $('#endScoreValue').html(score);
                    showItem('#gameOver');
                    hideItem('#lifeRemaining');
                    $('#startReset').click(function () {
                        location.reload();
                    });


                }

            }

        },10);





    }

    // function sliceFruit(){

        $('#fruit1').mouseover(function () {
            increaseScore();
            //play sound
            $('#sliceSound')[0].play();

            //stop fruit
            clearInterval(action);

            //destroy fruit
            $('#fruit1').hide();

            //create new fruit
            createFruit();
            moveFruit();
            // setTimeout(createFruit,500);




        });

    // }

});