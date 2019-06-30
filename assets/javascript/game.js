function celebrityGame() {
    var words = ["drake", "trevor noah", "rihanna", "leonardo dicaprio", "scarlett johansson", "brad pitt", "kanye west", "robin williams", "oprah", "meryl streep", "michael jackson", "ellen degeneres", "jamie foxx", "keanu reeves", "arnold schwarzenegger", "will smith"];

    game = {
        solution: words[Math.floor(Math.random() * words.length)],
        reveal: [],
        guessed: [],
        right: [],
        lives: 7
    };

    var showLives = document.getElementById("lives");
    var showGame = document.getElementById("gameDisplay");
    var showGuessed = document.getElementById("guessed");
    var showLastGuess = document.getElementById("lastGuess");
    var showStatus = document.getElementById("gameStatus");
    var showGuessCheck = document.getElementById("letterCheck");
    var loseAudio = new Audio('assets/images/LOSER.mp3');
    var winAudio = new Audio('assets/images/WIN.mp3');
    var replay = document.getElementById("replay");

    //check if the letters in solution are in the alphabet, so people don't have to guess numbers/hyphens/spaces

    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    // render the game, substituting letters to guess with "_"      
    for (var i = 0; i < game.solution.length; i++) {
        if (alphabet.indexOf(game.solution[i]) == -1) {
            game.reveal.push(game.solution[i]);
        } else {
            game.reveal.push("_");
        }
    }

    replay.className = "hidden";

    //show t\he game display with spaces and hyphens.
    showGame.innerHTML = game.reveal.join("");

    console.log("Game Rendered!");

    //play the game

    document.onkeyup = function(event) {
        var guess = String.fromCharCode(event.keyCode).toLowerCase();
        // Try again message
        if(game.guessed.indexOf(guess) != -1) {
            showStatus.innerHTML = "You tried " + guess + ". Try again.";
            // Add to the line of wrong answers
        } else {
            showStatus.innerHTML = "";
            game.guessed.push(guess);
            showLastGuess.innerHTML = guess;
            showGuessed.innerHTML = game.guessed.join("&middot; ");

            if (game.solution.indexOf(guess) == -1) {
                // Guess is wrong, take a life
                game.lives--;
                showLives.innerHTML = game.lives;
                showGuessCheck.innerHTML = "<span class='text-danger'>There is no " + guess + ".</span>";

                if(game.lives < 1) {
                    showStatus.innerHTML = "Game Over :(";
                    showGame.innerHTML = "<span class=text-danger>" + game.solution + "</span>";
                    loseAudio.play();
                    replay.className = "text-center";
                }
            } else {
                // Guess is correct. Show Letter
                showLives.innerHTML = game.lives;
                showGuessCheck.innerHTML = "<span class='text-success'>" + guess + " is good!</span>";
                game.right.push(guess);

                for(i=0; i < game.solution.length; i++){
                    if(game.solution[i] == guess){
                        game.reveal[i] = guess;
                        replay.className = "text-center";
                    }
                }
                // Displays the correct answer
                showGame.innerHTML = game.reveal.join("");

                if(game.reveal.indexOf("_") == -1) {
                    showStatus.innerHTML = "You are one with the Stars!";
                    showGame.innerHTML = "<span class=text-success>" + game.solution + "</span>";
                    replay.className = "text-center";
                    winAudio.play();
                }
            }
        }
    }
}


window.onLoad = celebrityGame();