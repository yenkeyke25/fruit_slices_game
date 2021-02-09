var playing = false;
var score ;
var trialLeft;
var steps;
var action;
var fruits = ["apple","banana","grapes","mango","pineaple","orange",
"pear","watermelon","cherries"];

$(function(){
$( "#startreset" ).on("click",function(){
// check if we are playing
if(playing == true){
    location.reload(); // reload the page
}else{
      //no
      playing=true;
      score = 0;
      $("#scorevalue").html(score);

        // show trial left
        $("#leftTrial").show();
        //hearts
        trialLeft = 3;
        $("#gameover").hide();
        // change button to reset game
        $("#startreset").html("Reset Game");
addHearts();
startAction();

}
});
$("#fruit1").on("mouseover",function(){
    score++;
    $("#scorevalue").html(score); // updating the score
    $("#audio")[0].play(); // play sound
    // stop fruit going down
   clearInterval(action);
   // hide fruit with animation
   $("#fruit1").hide("explode",500);
   setTimeout(startAction, 500);

})

        // functions here below
       function addHearts(){
           $("#leftTrial").empty();
        for(i=0; i<trialLeft; i++){
            $("#leftTrial").append('<img src="images/heart.png" class="life">');
        }
       }
       function startAction(){
           $("#fruit1").show();
           chooseFruits();
           $("#fruit1").css({'left':Math.round(Math.random()*550), 'top':-40});

           //generate a random steps for fruits
         steps = 1+ Math.round(Math.random()*5);
         // move fruits down every 10ms
         action = setInterval(function(){
             // fruit move one step
            $("#fruit1").css('top',$("#fruit1").position().top +steps) 
            // check if fruit is too low
            if($("#fruit1").position().top > $("#fruitContainer").height()){
                // check trials left
                if(trialLeft >1){
                    $("#fruit1").show();
                    chooseFruits();
                    $("#fruit1").css({'left':Math.round(Math.random()*550), 'top':-40});
         
                    //generate a random steps for fruits
                  steps = 1+ Math.round(Math.random()*5);
                  trialLeft--; // decrease trial
                  // populate trial left heart
                  addHearts();

                }else{
                    playing = false;

                    
                    // change button to reset game
        $("#startreset").html("Start Game");
        $("#gameover").show();
        $("#gameover").html('<p>Game Over!</p><p>Your score is: '+score+'</p>');
        $("#leftTrial").hide();
        stopAction();
                }
            }
         }, 10);

         
       }
       function chooseFruits(){ // generate randon fruits
        $("#fruit1").attr('src','images/'+
        fruits[Math.round(Math.random()*8)]+'.png');

       }
       // stoping the fruit drop
       function stopAction(){
        clearInterval(action);
        $("#fruit1").hide();
       }
    });