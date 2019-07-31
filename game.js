////////////////////////////
///    Question Setup    ///
///                      ///
////////////////////////////

////////////////////////////
///    Object Setup      ///
///                      ///
////////////////////////////

function getMessageText() {
    return $("#message").text;
  }
  
  // document.body.innerHTML = '<div id="message">The message</div>';
  // console.log(getMessageText());
  
  let card = {
      category: 0,
    questions: [
      //Overwatch questions
      [{
        question: "When was Overwatch released?",
        choice1: "June 7, 2016",
        choice2: "May 24, 2016",
        choice3: "August 24, 2016",
        choice4: "May 9, 2017",
        answer: "May 24, 2016"
      },
      {
        question: "How much health does Mercy heal per second?",
        choice1: "30",
        choice2: "70",
        choice3: "50",
        choice4: "120",
        answer: "50"
      },
      {
        question: "What is the max damage for Doomfists Seismic Slam ability?",
        choice1: "300",
        choice2: "125",
        choice3: "50",
        choice4: "75",
        answer: "125"
      },
      {
        question:
          "How many maps does Overwatch currently have? (Not including Arcade)",
        choice1: "21",
        choice2: "18",
        choice3: "25",
        choice4: "16",
        answer: "21"
      },
  
      {
        question: "How long does a Junkrat trap last for?",
        choice1: "5 seconds",
        choice2: "1 second",
        choice3: "Forever",
        choice4: "3 seconds",
        answer: "3 seconds"
      },
      {
        question: "What was the first new map released for Overwatch?",
        choice1: "Oasis",
        choice2: "Rialto",
        choice3: "Eichenwalde",
        choice4: "Route 66",
        answer: "Eichenwalde"
      },
      {
        question: "How much health does baby D.Va have?",
        choice1: "150",
        choice2: "100",
        choice3: "125",
        choice4: "200",
        answer: "150"
      },
      {
        question: "Lucio's ultimate Sound Barrier gives you...",
        choice1: "1000 shields",
        choice2: "400 shields",
        choice3: "100 armor, 500 shields",
        choice4: "750 shields",
        answer: "750 shields"
      }],
      //JoJo Bizarre Adventure questions
      [{
        question: "Who owns the stand Star Platinum",
        choice1: "DIO",
        choice2: "Joseph",
        choice3: "Jotaro",
        choice4: "Koichi",
        answer: "Jotaro"
      },
      {
        question: "What is the longest time DIO can stop time? ",
        choice1: "3 seconds",
        choice2: "9 seconds",
        choice3: "As long as he's holding his breathe",
        choice4: "Forever",
        answer: "9 seconds"
      },
      {
        question: "Which animal is definitely not surviving this season?",
        choice1: "The dog",
        choice2: "The cat",
        choice3: "The turtle",
        choice4: "The horse",
        answer: "The dog"
      },
      {
        question:
          "Which character willingly leaves the protagonists party?",
        choice1: "Hol Horse",
        choice2: "Avdol",
        choice3: "Uncle Iroh",
        choice4: "Fugo",
        answer: "Fugo"
      }]
    ],
    round: 0,
    getCard: () =>
      `
              <div >
               <h3 class="timer  text-primary font-weight-bold"> <p> Time Left </p> 10 </h3>
               <h1 style="position:absolute;top:0;" class="text-warning"> Score: ${game.score} </h1>
              </div>
              <h1 class="${fontColor}" style="text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;margin-bottom:5rem;margin-top:5rem;"> ${card.questions[card.category][card.round].question} </h1> 
             
              
          <ol class="list-inline mt-4">
             <li  class="list-inline"> <button id="choice1" class="btn btn-light btn-block mb-3 choice" > ${card.questions[card.category][card.round].choice1} </button> </li>
             <li  class="list-inline"> <button id="choice2" class="btn btn-light btn-block mb-3 choice"> ${card.questions[card.category][card.round].choice2} </button></li>
             <li class="list-inline"> <button id="choice3" class="btn btn-light btn-block mb-3 choice"> ${card.questions[card.category][card.round].choice3} </button></li>
             <li class="list-inline"> <button id="choice4" class="btn btn-light btn-block mb-3 choice"> ${card.questions[card.category][card.round].choice4} </button></li>
          </ol>
              `
  };
  
  let bgColor = "";
  let fontColor = "text-white";
  
  let game = {
    score: 0,
    playerChoice: "",
    time: 10,
    clickID: "",
    soundMuted: false,
    timerPaused: false,
    startBgMusic: () => {
      $(document).ready(function() {
        if (game.soundMuted == false) {
        $("#bg-music").prop("volume", 0.3);
        $("#bg-music")
          .get(0)
          .play();
      }});
    },
    triggerSound: sound => {
        if (game.soundMuted == false) {
      $(sound)
        .get(0)
        .play();
    }},
    timer: () => {
      console.log("Timer has begun.");
      setInterval(() => {
        //If the timer reaches 0...
        if (game.time == 0) {
          game.triggerSound("#wrongSound");
          game.playerChoice = '';
          game.evaluate();
          game.timerPaused = true;
          setTimeout(function() {
            game.nextQuestion();
          }, 950);
          console.log("Timer expired.");
        }
        //As long as timer is not paused, run down the clock.
        if (game.timerPaused == false) {
          game.time -= 1;
          $(".timer").prop("white-space", "pre-line");
          $(".timer").html(`<p> Time Left </p> ${game.time}`);
        }
      }, 1000);
    },
    setTime: time => {
      game.time = time;
    },
    //Adds listeners to buttons, evaluates button.
    setupBindings: () => {
      $(".choice").bind("click", function() {
        if (game.timerPaused == false) {
          game.clickID = "#" + $(this).attr("id");
          game.playerChoice = $(this)
            .text()
            .trim();
        
          game.evaluate();
          game.timerPaused = true;
          setTimeout(function() {
            game.nextQuestion();
            game.timerPaused = false;
          }, 3000);
        }
      });
    },
    scoreFeedback: () => {
      if (game.score < 30) {
        $("#feedback").text("You need more practice.");
        $("#scoreColor").addClass("text-danger");
      } else if (game.score < 50) {
        $("#feedback").text("You are blossoming into an overwatch master.");
        $("#scoreColor").addClass("text-warning");
      } else if (game.score < 65) {
        $("#feedback").text(
          "You are an overwatch master! There is nothing more to learn."
        );
        $("#scoreColor").addClass("text-success");
      }
    },
    end: () => {
      game.clearScreen();
      $("body").append(`
              <div id="game"  class="container-fluid ${bgColor} mx-auto text-center">
              <div class="row" style="height:100%;align-items:center;" >
                  <div id="game-col" style="background-color:rgba(0,0,0,0.7);" class="col">
                  <h1 class="text-white"> Final Score: <span id="scoreColor" class="${
                    game.scoreColor
                  }">${game.score}</span>/${card.questions[card.category].length * 10} </h1>
                  
                  <h1 class="text-warning border-bottom-1">  Zenyatta Says.. </h1>
                  <p id="feedback" class="text-white h2"> </p>
                  </div>
                  </div>
              </div>
              <audio id="bg-music">
              <source src="sound/bensound-theduel.mp3" type="audio/mpeg">
              </audio>
              <audio id="correctSound">
              <source src="sound/correct.wav" type="audio/wav">
              </audio>
              <audio id="wrongSound">
              <source src="sound/wrong2.mp3" type="audio/mpeg">
              </audio>
  
              `);
      game.scoreFeedback();
    },
    nextQuestion: function newQuestion() {
      if (card.questions[card.category].length > card.round + 1) {
        card.round += 1;
        $("#game-col").empty();
        $("#game-col").append(card.getCard());
        game.timerPaused = false;
        game.setTime(11);
        game.setupBindings();
      } else {
        alert("The game is over!");
        game.setTime(5000);
        game.timerPaused = true;
        game.end();
      }
    },
    evaluate: () => {
      if (
        $(game.clickID)
          .text()
          .trim() == card.questions[card.category][card.round].answer
      ) {
        $(game.clickID).addClass("btn-primary");
        $(game.clickID).removeClass("btn-light");
      } else {
        $(game.clickID).addClass("btn-danger");
        $(game.clickID).removeClass("btn-light");
      }
  
      if (game.playerChoice == card.questions[card.category][card.round].answer) {
        //    $('#choice1').addClass('btn-success');
        //    $('#choice1').removeClass('btn-light');
        game.triggerSound("#correctSound");
        game.score += game.time;
      } else {
        game.triggerSound("#wrongSound");
      }
    },
    clearScreen: () => {
      $("body").empty();
    },
    getScreen: screen => {
      switch (screen) {
        case "MainMenu":
          $("#javascript-disabled").remove();
          $("body").append(
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
                                 <br> <button type="button" id="btn-mute-game" class=" mt-4 btn btn-danger btn-lg">  Mute Game</button>
                                  </div>
                                  
                                  
                          </div>
                      </div>
                      `
          );
          break;
  
        case "game-screen":
          $("body").prepend(
            `
                                  <div id="game"  class="container-fluid ${bgColor} mx-auto text-center">
                                  <div class="row" >
                                      <div id="game-col" class="col">
                                      
                                      
                        
                                      </div>
                                      </div>
                                  </div>
                                  <audio id="bg-music">
                                  <source src="sound/bensound-theduel.mp3" type="audio/mpeg">
                                  </audio>
                                  <audio id="correctSound">
                                  <source src="sound/correct.wav" type="audio/wav">
                                  </audio>
                                  <audio id="wrongSound">
                                  <source src="sound/wrong2.mp3" type="audio/mpeg">
                                  </audio>
                                  
                                  
                                  
                                  `
          );
          break;

          case "category-screen":
          $("body").prepend(
            `
                                  <div id="game"  class="container-fluid ${bgColor} mx-auto text-center">
                                  <div class="row" >
                                      <div id="game-col" class="col">
                                      
                                      <button type="button" id="btn-start-overwatch" class=" mt-4 btn btn-danger btn-lg">  Overwatch</button>
                                      <button type="button" id="btn-start-jojo" class=" mt-4 btn btn-danger btn-lg">  Jojo's Bizarre Adventure</button>
                                      </div>
                                      </div>
                                  </div>
                                  <audio id="bg-music">
                                  <source src="sound/bensound-theduel.mp3" type="audio/mpeg">
                                  </audio>
                                  <audio id="correctSound">
                                  <source src="sound/correct.wav" type="audio/wav">
                                  </audio>
                                  <audio id="wrongSound">
                                  <source src="sound/wrong2.mp3" type="audio/mpeg">
                                  </audio>
                                  
                                  
                                  
                                  `
          );
          break;
      }
    },
    anotherMethod: "0"
  };
  
  game.getScreen("MainMenu");
  
  //   game.clearScreen();
  // $('#game').append(card.getCard());
  
  ////////////////////////////
  ///    Button Listeners  ///
  ///                      ///
  ////////////////////////////
  
  let choiceButton = document.querySelectorAll("choice");
  
  //Starts the main game, and sets up the timer.
  $("#btn-new-game").on( "click", function() {
    game.clearScreen();
    game.getScreen("category-screen");
  
    //  game.start('Game1');
   // $("#game-col").append(card.getCard());
   // game.setupBindings();
   // game.timer();
   // game.startBgMusic();

//add the event listeners for the categories

   $("#btn-start-overwatch").on( "click", function() {
    game.clearScreen();
    game.getScreen("game-screen");
    $("#game-col").append(card.getCard());
    game.setupBindings();
    game.timer();
    game.startBgMusic();
  });

  $("#btn-start-jojo").on( "click", function() {
    game.clearScreen();
    card.category = 1;
    game.getScreen("game-screen");
    $("#game-col").append(card.getCard());
    game.setupBindings();
    game.timer();
    game.startBgMusic();
  });


  });



  $("#btn-mute-game").click(function() {
    if (game.soundMuted == false) {
        game.soundMuted = true;
        $(this).css("background-color", "green");
    } else {
        game.soundMuted = false;
        $(this).css("background-color", "red");
    }
    
  });
  