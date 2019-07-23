////////////////////////////
///    Question Setup    ///
///                      ///
////////////////////////////


////////////////////////////
///    Object Setup      ///
///                      ///
////////////////////////////
    
function getMessageText() {
    return $('#message').text;
  }
  
 // document.body.innerHTML = '<div id="message">The message</div>';
 // console.log(getMessageText());
    
    let card = {
        questions:  [
            {
                question: "Question 1: Which race has zerglings?",
                choice1: "Zerg",
                choice2: "Protoss",
                choice3: "Terran",
                choice4: "Orcs",
                answer: "Zerg",
            },
            {
                question: "Question 2: Which race has zealots?",
                choice1: "Zerg",
                choice2: "Protoss",
                choice3: "Terran",
                choice4: "Orcs",
                answer: "Zealots",
            },
    
        ],
        round: 0,
        getCard: () => 
             `
             
             <h3 class="timer ${fontColor}"> 10 </h3>
             <h1 class="${fontColor}"> Score: ${game.score} </h1>
            <h1 class="${fontColor}"> ${card.questions[card.round].question} </h1> 
           
            
        <ol class="list-inline">
           <li  class="list-inline"> <button id="choice1" class="btn btn-danger btn-block mb-3 choice" > ${card.questions[card.round].choice1} </button> </li>
           <li  class="list-inline"> <button id="choice2" class="btn btn-danger btn-block mb-3 choice"> ${card.questions[card.round].choice2} </button></li>
           <li class="list-inline"> <button id="choice3" class="btn btn-danger btn-block mb-3 choice"> ${card.questions[card.round].choice3} </button></li>
           <li class="list-inline"> <button id="choice4" class="btn btn-danger btn-block mb-3 choice"> ${card.questions[card.round].choice4} </button></li>
        </ol>
            `,
        
    };

  let bgColor = "" ; 
  let fontColor = "text-white";

    let game = {
        score: 0,
        playerChoice: '',
        time: 10,
        clickID: '',
        startBgMusic: () => {
            $(document).ready(function() {
                $("#bg-music").prop("volume", 0.3);
                $("#bg-music").get(0).play();
            });
        },
        timer: () => {
            setInterval(() => {
                game.time -= 1;
                $('.timer').text(game.time);
             },1000);
        },
        setTime: (time) => {
            game.time = time;
        },
        //Adds listeners to buttons, evaluates button.
        setupBindings: () => {
            $('.choice').bind("click", function() {
                 game.clickID = "#" + $(this).attr('id');
                game.playerChoice = $(this).text().trim();
                game.evaluate();
                game.nextQuestion();

            })
            
        },
        nextQuestion: function newQuestion() {
            card.round +=1
            $('#game-col').empty();
            $('#game-col').append(card.getCard());
            
            game.setTime(11);
            game.setupBindings();
        },
        evaluate:  () => {
            
 
             if ( $(game.clickID).text().trim() == card.questions[card.round].answer) {
                $(game.clickID).addClass('btn-success');
                $(game.clickID).removeClass('btn-danger');
                let tempArray = $('.choice').html;
             } else {
                $(game.clickID).addClass('btn-primary');
                $(game.clickID).removeClass('btn-danger');
             }
            

            if (game.playerChoice == card.questions[card.round].answer) {
            //    $('#choice1').addClass('btn-success');
            //    $('#choice1').removeClass('btn-danger');
                alert("Correct!")
                game.score += 1;
                
               

            } else {
                alert("Wrong!");
               
            }
        },
        clearScreen: () => {
            $('body').empty();

        },
        getScreen: (screen) => {
                switch(screen) {
                    case 'MainMenu':                    
                    $('#javascript-disabled').remove()
                    $('body').append(
                    `
                    <div id="game" class="container-fluid ${bgColor} mx-auto text-center">
                    <div class="row" style="height:100%;">
                        <div class="col-12">
                        <div class="mx-auto" id="logo">
                            <h1 id="game-title" class="mb-4"> Quiz <div id="logodown"> Down </div> </h1>
                                  </div>
                        </div>
                        <div class="col-12">
                                <button type="button" id="btn-new-game" class=" mt-4 btn btn-danger btn-lg">  New Game</button>
                        </div>
                                
                                
                        </div>
                    </div>
                    `
                    )
                    break;

                    case 'Game1':
                            $('body').prepend(
                                `
                                <div id="game"  class="container-fluid ${bgColor} mx-auto text-center">
                                <div class="row" >
                                    <div id="game-col" class="col">
                                    
                      
                                    </div>
                                    </div>
                                </div>
                                <audio id="bg-music">
                                <source src="sound/bensound-actionable.mp3" type="audio/mpeg">
                                </audio>
                                
                                
                                
                                `)
                    break;

                }
        },
        anotherMethod: '0',
}
            
            
            game.getScreen('MainMenu');
            
         //   game.clearScreen();
           // $('#game').append(card.getCard());

////////////////////////////
///    Button Listeners  ///
///                      ///
////////////////////////////

let choiceButton = document.querySelectorAll("choice");

//Starts the main game, and sets up the timer.
$('#btn-new-game').click(function() {
    game.clearScreen();
    game.getScreen('Game1');
   
 
  //  game.start('Game1');
  $('#game-col').append(card.getCard());
  game.setupBindings();
  game.timer();
  game.startBgMusic();
})


