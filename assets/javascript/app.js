$('#start').on('click',function() {
    $('#start').remove();
    game.loadQuestion();
})

$(document).on('click','.answer-button',function(e){
    game.clicked(e);
})

$(document).on('click','#reset',function() {
    game.reset();
})

var questions = [{
  question: "What is the name of Han Solo's Ship?",
  answers: ["The Rocket", "The Millenium Falcon", "Falcon Force", "Speed Saucer"],
  correctAnswer: "The Millenium Falcon",
  image:"assets/images/"
}, {
  question: "What is the weapon used by Jedi Knights?",
  answers: ["Stab Sword", "Laser Blade", "Light Saber", "Godsword"],
  correctAnswer: "Light Saber",
  image:"assets/images/"
}, {
  question: "Which young Jedi Knight becomes Darth Vader in Star Wars Episode III, Revenge of the Sith?",
  answers: ["Han Solo", "Luke Skywalker", "Anakin Skywalker", "Chewbacca"],
  correctAnswer: "Anakin Skywalker",
  image:"assets/images/"
}, {
  question: "Which Jedi Master spent 800 years training pupils such as Qui-Gon Jinn, Count Dooku, and Luke Skywalker?",
  answers: ["Yoda", "Darth Vader", "Darth Sidious", "Han Solo"],
  correctAnswer: "Yoda",
  image:"assets/images"
},
{
  question: "Who is Han Solo's loyal friend and first mate?",
  answers: ["Captain Ginyu", "Obi-Wan Kenobi","Chewbacca","Princess Leia"],
  correctAnswer: "Chewbacca",
  image:"assets/images"
},
{
  question: "What is the name of Like and Leia's mother?",
  answers: ["Padme Amidala", "Lady Stark", "Danerys","Cersei"],
  correctAnswer: "Padme Amidala",
  image:"assets/images"
},
{
  question: "How many members are there in the Jedi Council?",
  answers: ["12", "13", "6", "9"],
  correctAnswer: ["12"],
  image:"assets/images"
},
{
  question: "Why didn't Yoda say he want to train Luke Skywalker?",
  answers: ["He lacked the patience", "His father was evil", "He was too old", "He was joining the dark side"],
  correctAnswer: "He lacked the patience",
  image:"assets/images"
},
{
  question: "What invisible power binds the Galaxy together?",
  answers: ["The Darkness", "The Force", "The Light", "God"],
  correctAnswer: "The Force",
  image:"assets/images"
},
{
  question: "Who are the masters of the dark side who want to rule the galaxy?",
  answers: ["The Sith", "The Jedi", "The Lannisters", "The Hutts"],
  correctAnswer: "The Sith",
  image:"assets/images"
}];

var game = {
    questions:questions,
    currentQuestion:0,
    counter:30,
    correct:0,
    incorrect:0,
    unanswered:0,
    countdown: function(){
        game.counter--;
        $('#counter').html(game.counter);
        if(game.counter<=0){
            console.log("Time Up");
            game.timeUp();
        }
    },
    loadQuestion: function(){
        timer = setInterval(game.countdown,1000);
        $('#subwrapper').html("<h2>Time Remaining: <span id= 'counter'>30</span> Seconds</h2>");
        $('#subwrapper').append('<h2>'+questions[game.currentQuestion].question+'</h2>');
        for(var i=0;i<questions[game.currentQuestion].answers.length;i++){
            $('#subwrapper').append('<button class="answer-button" id="button-'+i+'" data-name="'+questions[game.
                currentQuestion].answers[i]+'">'+questions[game.
                currentQuestion].answers[i]+'</button>');
        }
    },
    nextQuestion: function(){
        game.counter = 30;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function(){
        clearInterval(timer);
        game.unanswered++;
        $('#subwrapper').html('<h2>You Must Be More Swift<h2>');
        $('#subwrapper').append('<h3>The Answer You Seek Is: '+questions[game.currentQuestion].correctAnswer+'</h3>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,5*1000);
        }
        else {
            setTimeout(game.nextQuestion,5*1000);
        }
    },
    results: function(){
        clearInterval(timer);
        $('#subwrapper').html("<h2>Your Training is Over</h2>");
        $('#subwrapper').append("<h3>Correct: " +game.correct+"</h3>");
        $('#subwrapper').append("<h3>Incorrect: "+game.incorrect+"</h3>");
        $('#subwrapper').append("<h3>Unanswered: "+game.unanswered+"</h3>");
        $('#subwrapper').append("<button id='reset'>RESET</button>");
    },
    clicked: function(e){
        clearInterval(timer);
        if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        }
    },
    answeredCorrectly: function(){
        console.log("Good Job Young Padawan");
        clearInterval(timer);
        game.correct++;
        $('#subwrapper').html('<h2>Good Job Young Padawan</h2>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        }
        else {
            setTimeout(game.nextQuestion,3*1000);
        }
    },
    answeredIncorrectly: function(){
        console.log("You Have Much to Learn");
        clearInterval(timer);
        game.incorrect++;
        $('#subwrapper').html('<h2>You Have Much to Learn</h2>');
        $('#subwrapper').append('<h3>The Answer You Seek Is: '+questions[game.currentQuestion].correctAnswer+'</h3>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,5*1000);
        }
        else {
            setTimeout(game.nextQuestion,5*1000);
        }
    },
    reset: function(){
        game.currentQuestion = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;

    }
}