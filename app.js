/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevDice;
var gameInfo = document.getElementById('gameInfo');
var emojis = ['🤗', '😋', '😏', '😅', '😁'];

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {

        // // 1. Random Number
        var dice = Math.floor( Math.random() * 6 ) + 1;
        // var dice2 = Math.floor( Math.random() * 6 ) + 1;

        // // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        // // var dice2DOM = document.querySelector('.dice-2');
        
        diceDOM.style.display = 'block';
        // // dice2DOM.style.display = 'block';
        
        diceDOM.src = 'dice-' + dice + '.png';
        // // dice2DOM.src = 'dice-' + dice2 + '.png';    
        
        // // console.log(dice, dice2);

        // if (dice === 1) {
        //     gameInfo.textContent = 'Oh, no you rolled a 1. Next player\'s turn';
        //     nextPlayer();
        // } else if (dice === 6 && prevDice === 6) {
        //     gameInfo.textContent = 'You rolled 6 in a row. Next player\'s turn';
        //     scores[activePlayer] = 0;
        //     document.querySelector('#score-'+ activePlayer).textContent = '0';
        //     nextPlayer();
        // } else {
        //     // Add score 
        //     roundScore += dice;
        //     document.querySelector('#current-' + activePlayer).textContent = roundScore;
        //     gameInfo.textContent = insertRandomEmoji() + ' Awesome you gained '+ dice + '! ' + insertRandomEmoji();
        //     prevDice = dice;
        //     console.log(prevDice);
        // }

        // 3. Update the round score IF the rolled number was not a 1
        if (dice === 6 && prevDice === 6) {
            gameInfo.textContent = 'Oh, no. You rolled a double 6';
            scores[activePlayer] = 0;
            document.querySelector('#score-'+ activePlayer).textContent = '0';
            
            nextPlayer();
        } else if (dice !== 1) {
            // Add score 
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            gameInfo.textContent = insertRandomEmoji() + ' Awesome you gained '+ dice + '! ' + insertRandomEmoji();
            prevDice = dice; 
        } else {
            // Next player
            console.log('Rolled a 1');
            gameInfo.textContent = 'Oh, no you rolled a 1. Next player\'s turn';
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add current score to global score
        scores[activePlayer] += roundScore; 

        // Update the UI
        document.querySelector('#score-'+ activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;

        // Undefined, 0, null or "" are COERCED to false
        // Anything else is COERCED to true
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // Check if player won the game
        if(scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice-2').style.display = 'none';

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');     
            gamePlaying = false;   
        } else {
            // Next player
            nextPlayer();    
        }
    } 
});

function nextPlayer() {
    prevDice = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';     
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);
document.querySelector('.final-score').addEventListener('keyup', () => {
    var input = document.querySelector('.final-score').value;
    document.getElementById('goal-score').innerHTML = 'Goal: <strong>'+ input + '</strong>';
});

function init() {
    gamePlaying = true;
    scores =  [0,0];
    roundScore = 0;
    activePlayer = 0;

    gameInfo.textContent = 'Roll dice to start';

    document.querySelector('.final-score').value = 100;
    document.getElementById('goal-score').textContent = 'Goal: ' + 100;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    // Remove winner class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    // Remove active class
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    // Add active class to player 1
    document.querySelector('.player-0-panel').classList.add('active');     
}

function insertRandomEmoji() {
    return emojis[Math.floor( Math.random() * emojis.length )];
}








// document.querySelector('#current-' + activePlayer).textContent = dice;
