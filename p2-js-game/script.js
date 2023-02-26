const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "TEN", "J", "Q", "K"];
const types = ["C", "D", "H", "S"];
const playerCardsContainer = document.getElementById('player-cards');
const bankerCardsContainer = document.getElementById('banker-cards');
const playerHitCard = document.getElementById('player-hit-card');
const bankerHitCard = document.getElementById('banker-hit-card');
const backButton = document.getElementById('back-button');
const body = document.querySelector('body');
const creditBalance = document.getElementById('balance');
let credits = 10000;
const cancelPlayerBet = document.getElementById('cancel-player-bet');
const cancelBankerBet = document.getElementById('cancel-banker-bet');
const cancelTieBet = document.getElementById('cancel-tie-bet');
const cancelSuperBet = document.getElementById('cancel-super-bet');
// building deck (8 decks) (first)
let deck = [];
function buildDeck() {
    for(let x = 0; x <= 8; x++){
        for (let i = 0; i < types.length; i++) {
            for (let j = 0; j < values.length; j++) {
                deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
            }
        }
    }
}
buildDeck();

// shuffling deck (second)
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    // console.log(deck);
}
shuffleDeck()

// start game (third)
let playerSum = 0;
let bankerSum = 0;
const playButton = document.getElementById('play-button');
const playerBetBtn = document.getElementById('player-betting-btn');
const bankerBetBtn = document.getElementById('banker-betting-btn');
const tieBetBtn = document.getElementById('tie-betting-btn');
const superBetBtn = document.getElementById('super-betting-btn');
let playerBet = document.getElementById('player-bet');
let bankerBet = document.getElementById('banker-bet');
let tieBet = document.getElementById('tie-bet');
let superBet = document.getElementById('super-bet');
let announce = document.getElementById('announce');

playerBet.addEventListener('click', function(e){
    e.preventDefault();
    playButton.disabled = true;
});
bankerBet.addEventListener('click', function(e){
    e.preventDefault();
    playButton.disabled = true;
});
tieBet.addEventListener('click', function(e){
    e.preventDefault();
    playButton.disabled = true;
});
superBet.addEventListener('click', function(e){
    e.preventDefault();
    playButton.disabled = true;
});
playButton.addEventListener('click', function (e){
    e.preventDefault();
    if(playerBet.value == 0 && bankerBet.value == 0 && tieBet.value == 0 && superBet.value == 0){
        announce.innerHTML = `Please place your bet`
    }else if(playerBet.value != 0 && bankerBet.value != 0){
        announce.innerHTML = `Place your bet on either Player or Banker`
    }else{
        startGame();
    }
});

function resetField(){
    playerCardsContainer.innerHTML = '';
    bankerCardsContainer.innerHTML = '';
    playerHitCard.innerHTML = '';
    bankerHitCard.innerHTML = '';
    playerCardsContainer.style.visibility = 'visible'
    bankerCardsContainer.style.visibility = 'visible'
    bankerHitCard.style.visibility = 'visible';
    playerHitCard.style.visibility = 'visible';
    playerSum = 0;
    bankerSum = 0;
    let audio = new Audio('sounds/shuffle-cards.mp3');
    playButton.addEventListener('click', audio.play());
    closePopup();
}
let playerFirstCardImg = document.createElement('img');
let playerSecondCardImg = document.createElement('img');
let bankerFirstCardImg = document.createElement('img');
let bankerSecondCardImg = document.createElement('img');

function startGame(){
    resetField();
    playButton.disabled = true;
    backButton.disabled = true;
    playerBetBtn.disabled = true;
    bankerBetBtn.disabled = true;
    tieBetBtn.disabled = true;
    superBetBtn.disabled = true;
    cancelPlayerBet.disabled = true;
    cancelBankerBet.disabled = true;
    cancelTieBet.disabled = true;
    cancelSuperBet.disabled = true;
    playerBet.disabled = true;
    bankerBet.disabled = true;
    tieBet.disabled = true;
    superBet.disabled = true;
    let playerFirstCard = deck.pop();
    let playerSecondCard = deck.pop();
    playerSum += getValue(playerFirstCard) + getValue(playerSecondCard);  
    playerFirstCardImg.src = 'images/' + playerFirstCard + '.png';
    playerSecondCardImg.src = 'images/' + playerSecondCard + '.png';
    document.getElementById('player-cards').appendChild(playerFirstCardImg);
    document.getElementById('player-cards').appendChild(playerSecondCardImg);
    if(playerSum > 9){
        let score = playerSum.toString().split('');
        let playerScore = score.map(Number);
        playerSum = playerScore[1];
    }
    let bankerFirstCard = deck.pop();
    let bankerSecondCard = deck.pop();
    bankerSum += getValue(bankerFirstCard) + getValue(bankerSecondCard);
    bankerFirstCardImg.src = 'images/' + bankerFirstCard + '.png';
    bankerSecondCardImg.src = 'images/' + bankerSecondCard + '.png';
    document.getElementById('banker-cards').appendChild(bankerFirstCardImg);
    document.getElementById('banker-cards').appendChild(bankerSecondCardImg);
    if(bankerSum > 9){
        let score = bankerSum.toString().split('');
        let bankerScore = score.map(Number);
        bankerSum = bankerScore[1];
    }
    setTimeout(function(){
        canHit();
    }, 2000);
}

// hitting card (6th)
function playerHittingCard(){
    let playerThirdCard = deck.pop();
    playerSum += getValue(playerThirdCard);
    let playerThirdCardImg = document.createElement('img');
    playerThirdCardImg.src = 'images/' + playerThirdCard + '.png';
    document.getElementById('player-hit-card').appendChild(playerThirdCardImg);
    if(playerSum > 9){
        let score = playerSum.toString().split('');
        let playerScore = score.map(Number);
        playerSum = playerScore[1];
    }
    return getValue(playerThirdCard);
}

function bankerHittingCard(){
    let bankerThirdCard = deck.pop();
    bankerSum += getValue(bankerThirdCard);
    let bankerThirdCardImg = document.createElement('img');
    bankerThirdCardImg.src = 'images/' + bankerThirdCard + '.png';
    document.getElementById('banker-hit-card').appendChild(bankerThirdCardImg);
    if(bankerSum > 9){
        let score = bankerSum.toString().split('');
        let bankerScore = score.map(Number);
        bankerSum = bankerScore[1];
    }
    return getValue(bankerThirdCard);
}
// function to declare the winner (5th)
function declareWinner(){
    let result = document.getElementById('winner')
    let scores = document.getElementById('scores')
    document.getElementById("play-button").disabled = true;
    if (playerSum > bankerSum){
        result.innerHTML = `Player Wins`;
        scores.innerHTML = `Player wins ${playerSum} to ${bankerSum}`;       
        setTimeout(function(){
            openPopup();
        }, 1000);
        let amount = playerBet.value * 2;
        setTimeout(function(){
            creditBalance.innerHTML = credits += amount;
        }, 2000);
        if (playerBet.value != 0){
            setTimeout(function(){
            announce.innerHTML = `You won ${playerBet.value}`;
            }, 2000);
        }else{
            announce.innerHTML = `You lost`;
        }
        console.log('Player Wins'); 
    }else if(bankerSum > playerSum){
        if(bankerSum == 6){
            result.innerHTML = `Bank Wins Super Six`;
            scores.innerHTML = `Banker wins Super ${bankerSum} to ${playerSum}`;
            setTimeout(function(){
                openPopup();
            }, 1000);
            let amount = bankerBet.value * 1;
            let half = amount / 2;
            let superAmount = superBet.value * 13;
            setTimeout(function(){
                creditBalance.innerHTML = credits += (amount + half + superAmount);
            }, 2000);
            setTimeout(function(){
            announce.innerHTML = `You won ${half}`;
            }, 2000);
            return;
        }else{
            result.innerHTML = `Bank Wins`;
            scores.innerHTML = `Banker wins ${bankerSum} to ${playerSum}`;
            setTimeout(function(){
                openPopup();
            }, 1000);
            let amount = bankerBet.value * 2;
            setTimeout(function(){
                creditBalance.innerHTML = credits += amount;
            }, 2000);
        }
        
        if(bankerBet.value != 0){
            setTimeout(function(){
            announce.innerHTML = `You won ${bankerBet.value}`;
            }, 2000);
        }else{
            announce.innerHTML = `You lost`;
        } 
        console.log('Banker Wins');
    }else{
        scores.innerHTML = `Player and Banker is ${playerSum}`
        result.innerHTML = `Draw`
        setTimeout(function(){
            openPopup();
        }, 1000);
        let playerAmount = playerBet.value * 1;
        creditBalance.innerHTML = credits += playerAmount;
        let bankAmount = bankerBet.value * 1;
        creditBalance.innerHTML = credits += bankAmount;
        let tieAmount = tieBet.value * 9;
        setTimeout(function(){
            creditBalance.innerHTML = credits += tieAmount;
        }, 2000);
        if(tieBet.value != 0){
            setTimeout(function(){
            announce.innerHTML = `You won ${tieBet.value * 8}`;
            }, 2000);
        }else{
            announce.innerHTML = `It\'s a tie`;

        }
        console.log('It\'s a tie');
    }
}
// declareWinner();

// Hitting Rules (6th)
// Player and Banker will stay (Declare winner)
// 6-7-8-9
// Player & Bank will hit if score is
// 0-1-2
// Player will hit a card if score is
// 3-4-5
// Bank will hit if score is 3-4-5 
// if player score is 6-7
// if player score is 1-2-3-4-5
// - and bankers sum is 3
// it will not hit if the hit card of player is 8.
// - and bankers sum is 4
// it will hit a card if player hit card is 2-3-4-5-6-7
// -and bankers sum is 5
// it wil hit a card if player hit card is 4-5-6-7
// - and bankers sum is 6
// it will hit a card if player hit card is 6-7

// switch case
function canHit(){
    switch (true){
        case (playerSum <= 5 && bankerSum <= 2):
            playerHittingCard();
            bankerHittingCard();
            declareWinner();
            break;
        case(playerSum <= 5 && bankerSum == 7):
            playerHittingCard();
            declareWinner();
            break;
        case(playerSum >= 8 || bankerSum >= 8):
            declareWinner();
            break;
        case(playerSum >= 6 && bankerSum >= 6):
            declareWinner();
            break;    
        case(playerSum == 6 && bankerSum <= 5):
            bankerHittingCard();
            declareWinner();
            break;
        case(playerSum == 7 && bankerSum <= 5):
            bankerHittingCard();
            declareWinner();
            break;
        case (playerSum <= 5 && bankerSum == 3):
            let playerHitValue3 = playerHittingCard();
            if(playerHitValue3 == 8){
                declareWinner();
            }else{
            bankerHittingCard();  
            declareWinner();      
            }
            break;
        case (playerSum <= 5 && bankerSum == 4):
            let playerHitValue = playerHittingCard();
            if(playerHitValue <= 1 || playerHitValue >= 8){
                declareWinner();
            }else{
            bankerHittingCard();
            declareWinner();
            }
            break;
        case (playerSum <= 5 && bankerSum == 5):
            let playerHitValue1 = playerHittingCard();
            if(playerHitValue1 <= 3 || playerHitValue1 >= 8){
                declareWinner();
            }else{
            bankerHittingCard();
            declareWinner();
            }    
            break;
        case (playerSum <= 5 && bankerSum == 6):
            let playerHitValue2 = playerHittingCard();
            if(playerHitValue2 <= 5 || playerHitValue2 >= 8){
                declareWinner();
            }else{
            bankerHittingCard();
            declareWinner();
            }      
            break;
        default:
    }
}
// to get the value of player and banker (4th)
function getValue(card){
    let data = card.split('-');
    let value = data[0];
    if(isNaN(value)){
        if(value == 'A'){
            return 1;
        }
        return 0;
    }
    return parseInt(value);
}
// popup winner
let openPopUp = document.getElementById('pop-up')
let closePopUp = document.getElementById('pop-up-btn')
function openPopup(){
    openPopUp.classList.add('open-popup');
}
function closePopup(){
    closePopUp.addEventListener('click', function(){
        openPopUp.classList.remove('open-popup');
        backButton.disabled = false;
        playerFirstCardImg.src = 'images/BACK.png';
        playerSecondCardImg.src = 'images/BACK.png';
        bankerFirstCardImg.src = 'images/BACK.png';
        bankerSecondCardImg.src = 'images/BACK.png';
        playerHitCard.style.visibility = 'hidden';
        bankerHitCard.style.visibility = 'hidden'; 
        announce.innerHTML = '';     
        playerBet.value = 0;
        bankerBet.value = 0;
        tieBet.value = 0; 
        superBet.value = 0;
        playButton.disabled = false; 
        playerBetBtn.disabled = false;
        bankerBetBtn.disabled = false;
        tieBetBtn.disabled = false;
        superBetBtn.disabled = false;
        cancelPlayerBet.disabled = true;
        cancelBankerBet.disabled = true;
        cancelTieBet.disabled = true;
        cancelSuperBet.disabled = true;
        playerBet.disabled = false;
        bankerBet.disabled = false;
        tieBet.disabled = false;
        superBet.disabled = false;
    });
}
// game start button
const landing = document.getElementById('landing-section');
let back = document.getElementById('back-button');
let header = document.getElementById('header');
let super6 = document.getElementById('super6');
let gameContainer = document.getElementById('game-container');
let bettingContainer = document.getElementById('betting-container');
let playContainer = document.getElementById('play-container');
let footer = document.querySelector('footer');
const startGameButton = document.getElementById('start-game');
    startGameButton.addEventListener('click', function(){
        showGame();
});
function showGame(){
    landing.classList.remove('active');
    landing.classList.add('hidden');
    back.classList.remove('hidden');
    header.classList.remove('hidden');
    gameContainer.classList.remove('hidden');
    gameContainer.classList.add('active');
    bettingContainer.classList.remove('hidden');
    playerFirstCardImg.style.visibility = 'visible';
    playerSecondCardImg.style.visibility = 'visible';
    bankerFirstCardImg.style.visibility = 'visible';
    bankerSecondCardImg.style.visibility = 'visible';
    super6.classList.remove('hidden');
    playContainer.classList.remove('hidden');
    document.getElementById('cancel-player-bet').disabled = true;
    document.getElementById('cancel-banker-bet').disabled = true;
    document.getElementById('cancel-tie-bet').disabled = true;
    footer.classList.remove('hidden');
}
//  back button
function hideGame(){
    playerFirstCardImg.style.visibility = 'hidden';
    playerSecondCardImg.style.visibility = 'hidden';
    bankerFirstCardImg.style.visibility = 'hidden';
    bankerSecondCardImg.style.visibility = 'hidden';
    landing.classList.add('active');
    landing.classList.remove('hidden');
    back.classList.add('hidden');
    header.classList.add('hidden');
    gameContainer.classList.add('hidden');
    gameContainer.classList.remove('active');
    bettingContainer.classList.add('hidden');
    rulesContainer.classList.add('hidden');
    playContainer.classList.add('hidden');
    super6.classList.add('hidden');
    footer.classList.add('hidden');
}
backButton.addEventListener('click', function(e){
    e.preventDefault();
    hideGame()
});
// rules
let rules = document.getElementById('rules');
let rulesContainer = document.getElementById('rules-container');
function rulesOfTheGame(){
    landing.classList.remove('active');
    landing.classList.add('hidden');
    rulesContainer.classList.remove('hidden');
    rules.classList.remove('hidden');
    back.classList.remove('hidden');
    super6.classList.add('hidden');
}
rules.addEventListener('click', function(){
    rulesOfTheGame();
});

// betting button

function betting(){
    playerBetBtn.addEventListener('click', function(e){
        e.preventDefault();
        if(credits <= 0){
            announce.innerHTML = `Not enough credits`;
            playButton.disabled = true;
            cancelPlayerBet.disabled = false;
            playerBetBtn.disabled = true;
            playerBet.disabled = true;
            playerBet.value = 0;
        }else if(playerBet.value == 0 && bankerBet.value == 0){
            announce.innerHTML = `Place your bet`;
        }else if(playerBet.value == 0 && bankerBet != 0){
                announce.innerHTML = `You place your bet on Banker`;
        }else if(playerBet.value != 0 && bankerBet.value != 0){
            announce.innerHTML = `Place your bet on either Player or Banker`;
        }else if(playerBet.value == 0 && bankerBet.value == 0 && tieBet.value == 0){
            announce.innerHTML = `Please place your bet`;
        }else if(playerBet.value > credits) {
                announce.innerHTML = `Not enough credits`;
                playButton.disabled = true;
                credits -= playerBet.value;
                playerBetBtn.disabled = true;
                document.getElementById("cancel-player-bet").disabled = false;
        }else{
            announce.innerHTML = `You bet ${playerBet.value} on Player`;
            credits -= playerBet.value;
            creditBalance.innerHTML = `${credits}`;
            playerBetBtn.disabled = true;
            document.getElementById("cancel-player-bet").disabled = false;
            document.getElementById("play-button").disabled = false;
            }
        } 
    );
    bankerBetBtn.addEventListener('click', function(e){
        e.preventDefault();
        if(credits <= 0){
            announce.innerHTML = `Not enough credits`;
            playButton.disabled = true;
            cancelBankerBet.disabled = false;
            bankerBetBtn.disabled = true;
            bankerBet.disabled = true;
            bankerBet.value = 0;
        }else if(playerBet.value == 0 && bankerBet.value == 0){
            announce.innerHTML = `Place your bet`;
        }else if(bankerBet.value == 0 && playerBet != 0){
                announce.innerHTML = `You place your bet on Player`;
        }else if(playerBet.value != 0 && bankerBet.value != 0){
            announce.innerHTML = `Place your bet on either Player or Banker`;
        }else if(playerBet.value == 0 && bankerBet.value == 0 && tieBet.value == 0){
            announce.innerHTML = `Please place your bet`;
        }else if(bankerBet.value > credits) {
            announce.innerHTML = `Not enough credits`;
            playButton.disabled = true;
            credits -= bankerBet.value;
            bankerBetBtn.disabled = true;
            document.getElementById("cancel-banker-bet").disabled = false;
        }else{
            announce.innerHTML = `You bet ${bankerBet.value} on Banker`;
            credits -= bankerBet.value;
            creditBalance.innerHTML = `${credits}`
            bankerBetBtn.disabled = true;
            document.getElementById('cancel-banker-bet').disabled = false;
            document.getElementById("play-button").disabled = false;   
            }
        }
    );
    tieBetBtn.addEventListener('click', function(e){
        e.preventDefault();
        if(credits <= 0){
            announce.innerHTML = `Not enough credits`;
            playButton.disabled = true;
            cancelTieBet.disabled = false;
            tieBetBtn.disabled = true;
            tieBet.disabled = true;
            tieBet.value = 0;
        }else if(playerBet.value == 0 && bankerBet.value == 0 && tieBet.value == 0){
            announce.innerHTML = `Please place your bet`;
        }else if(playerBet.value != 0 && bankerBet.value != 0){
            announce.innerHTML = `Place your bet on either Player or Banker`;
        }else if(tieBet.value > credits) {
            announce.innerHTML = `Not enough credits`;
            playButton.disabled = true;
            credits -= tieBet.value;
            tieBetBtn.disabled = true;
            document.getElementById("cancel-tie-bet").disabled = false;
        }else{
            announce.innerHTML = `You bet ${tieBet.value} on Tie`;
            credits -= tieBet.value;
            creditBalance.innerHTML = `${credits}`;
            tieBetBtn.disabled = true;
            document.getElementById('cancel-tie-bet').disabled = false;
            document.getElementById("play-button").disabled = false;
            }
    });
    superBetBtn.addEventListener('click', function(e){
        e.preventDefault();
        if(credits <= 0){
            announce.innerHTML = `Not enough credits`;
            playButton.disabled = true;
            cancelSuperBet.disabled = false;
            superBetBtn.disabled = true;
            superBet.disabled = true;
            superBet.value = 0;
        }else if(playerBet.value != 0 && bankerBet.value != 0){
            announce.innerHTML = `Place your bet on either Player or Banker`;
        }else if(playerBet.value == 0 && bankerBet.value == 0 && tieBet.value == 0 && superBet.value == 0){
            announce.innerHTML = `Please place your bet`;
        }else if(superBet.value > credits) {
            announce.innerHTML = `Not enough credits`;
            playButton.disabled = true;
            credits -= superBet.value;
            superBetBtn.disabled = true;
            document.getElementById("cancel-super-bet").disabled = false;
        }else{
            announce.innerHTML = `You bet ${superBet.value} on Super Six`;
            credits -= superBet.value;
            creditBalance.innerHTML = `${credits}`
            superBetBtn.disabled = true;
            document.getElementById('cancel-super-bet').disabled = false;
            document.getElementById("play-button").disabled = false;   
            }
        }
    );
}
betting();
//  credit balance 
creditBalance.innerHTML = `${credits}`;

// cancel bet
function cancelBet(){
    cancelPlayerBet.addEventListener('click', function(e){
        e.preventDefault();
        let amount = playerBet.value * 1;
        creditBalance.innerHTML = credits += amount;
        playerBet.value = 0;
        document.getElementById('cancel-player-bet').disabled = true;
        playerBetBtn.disabled = false;
        announce.innerHTML = `You cancel your bet. Please place your bets`
    });
    cancelBankerBet.addEventListener('click', function(e){
        e.preventDefault();
        let amount = bankerBet.value * 1;
        creditBalance.innerHTML = credits += amount;
        bankerBet.value = 0;
        document.getElementById('cancel-banker-bet').disabled = true;
        bankerBetBtn.disabled = false;
        document.getElementById("play-button").disabled = true;
        announce.innerHTML = `You cancel your bet. Please place your bets`
    });
    cancelTieBet.addEventListener('click', function(e){
        e.preventDefault();
        let amount = tieBet.value * 1;
        creditBalance.innerHTML = credits += amount;
        tieBet.value = 0;
        document.getElementById('cancel-tie-bet').disabled = true;
        tieBetBtn.disabled = false;
        document.getElementById("play-button").disabled = true;
        announce.innerHTML = `You cancel your bet. Please place your bets`
    });
    cancelSuperBet.addEventListener('click', function(e){
        e.preventDefault();
        let amount = superBet.value * 1;
        creditBalance.innerHTML = credits += amount;
        superBet.value = 0;
        document.getElementById('cancel-super-bet').disabled = true;
        superBetBtn.disabled = false;
        document.getElementById("play-button").disabled = true;
        announce.innerHTML = `You cancel your bet. Please place your bets`
    });
}    
cancelBet();