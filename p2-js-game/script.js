const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "TEN", "J", "Q", "K"];
const types = ["C", "D", "H", "S"];
const playerCardsContainer = document.getElementById('player-cards');
const bankerCardsContainer = document.getElementById('banker-cards');
const playerHitCard = document.getElementById('player-hit-card');
const bankerHitCard = document.getElementById('banker-hit-card');
const backButton = document.getElementById('back-button');
const body = document.querySelector('body');
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
let playButton = document.getElementById('play-button');

playButton.addEventListener('click', function (e){
    e.preventDefault();
    startGame();
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
    document.getElementById("play-button").disabled = true;
    backButton.disabled = true;
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
// startGame();

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
        openPopup();
        console.log('Player Wins'); 
    }else if(bankerSum > playerSum){
        result.innerHTML = `Bank Wins`;
        scores.innerHTML = `Bank wins ${bankerSum} to ${playerSum}`;
        openPopup()
        console.log('Banker Wins');
    }else{
        scores.innerHTML = `Player and Banker is ${playerSum}`
        result.innerHTML = `Draw`
        openPopup()
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
        document.getElementById("play-button").disabled = false;
        backButton.disabled = false;
        playerFirstCardImg.src = 'images/BACK.png';
        playerSecondCardImg.src = 'images/BACK.png';
        bankerFirstCardImg.src = 'images/BACK.png';
        bankerSecondCardImg.src = 'images/BACK.png';
        playerHitCard.style.visibility = 'hidden';
        bankerHitCard.style.visibility = 'hidden';        
    });
}

const landing = document.getElementById('landing-section');
let contains = landing.classList.contains('active');
let back = document.getElementById('back-button');
let header = document.getElementById('header');
let gameContainer = document.getElementById('game-container');
let bettingContainer = document.getElementById('betting-container');
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
}
backButton.addEventListener('click', function(e){
    e.preventDefault();
    hideGame()
});
