const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "TEN", "J", "Q", "K"];
const types = ["C", "D", "H", "S"];

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

playButton.addEventListener('click', startGame());

function startGame(){
    let playerFirstCard = deck.pop();
    let playerSecondCard = deck.pop();
    playerSum += getValue(playerFirstCard) + getValue(playerSecondCard);
    let playerFirstCardImg = document.createElement('img');
    let playerSecondCardImg = document.createElement('img');
    // playerFirstCardImg.classList.add('hidden');
    // playerSecondCardImg.classList.add('hidden');
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
    let bankerFirstCardImg = document.createElement('img');
    let bankerSecondCardImg = document.createElement('img');
    // bankerFirstCardImg.classList.add('hidden');
    // bankerSecondCardImg.classList.add('hidden');
    bankerFirstCardImg.src = 'images/' + bankerFirstCard + '.png';
    bankerSecondCardImg.src = 'images/' + bankerSecondCard + '.png';
    document.getElementById('banker-cards').appendChild(bankerFirstCardImg);
    document.getElementById('banker-cards').appendChild(bankerSecondCardImg);
    if(bankerSum > 9){
        let score = bankerSum.toString().split('');
        let bankerScore = score.map(Number);
        bankerSum = bankerScore[1];
    }
    // declareWinner();
    // console.log(playerFirstCard);
    // console.log(playerSecondCard);
    setTimeout(function(){
        canHit();
    }, 2000);
    
    // console.log(playerSum); 
    // console.log(bankerFirstCard);
    // console.log(bankerSecondCard);
    // console.log(bankerSum);
}
// startGame();
// let audio = new Audio('sounds/shuffle-cards.mp3');
// playButton.addEventListener('click', audio.play());

// hitting card (6th)
function playerHittingCard(){
    let playerThirdCard = deck.pop();
    playerSum += getValue(playerThirdCard);
    let playerThirdCardImg = document.createElement('img');
    // playerThirdCardImg.classList.add('hidden');
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
    // bankerThirdCardImg.classList.add('hidden');
    bankerThirdCardImg.src = 'images/' + bankerThirdCard + '.png';
    document.getElementById('banker-hit-card').appendChild(bankerThirdCardImg);
    if(bankerSum > 9){
        let score = bankerSum.toString().split('');
        let bankerScore = score.map(Number);
        bankerSum = bankerScore[1];
    }
    return getValue(bankerThirdCard);
    // console.log(bankerThirdCard);
    // console.log(bankerSum);
}
// function to declare the winner (5th)
function declareWinner(){
    if (playerSum > bankerSum){
        console.log('Player Wins'); 
    }else if(bankerSum > playerSum){
        console.log('Banker Wins');
    }else{
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
// let playerHit = playerHittingCard();
// function canHit(){
//     if (playerSum <= 5 && bankerSum <= 2){
//         playerHittingCard();
//         bankerHittingCard();
//         declareWinner();
//     }else if(playerSum <= 5 && bankerSum == 7){
//         playerHittingCard();
//         declareWinner();
//     }else if (playerSum >= 8 || bankerSum >= 8){
//         declareWinner();
//     }else if (playerSum >= 6 && bankerSum >= 6){
//         declareWinner();    
//     }else if(playerSum == 6 && bankerSum <= 5){
//         bankerHittingCard();
//         declareWinner();
//     }else if (playerSum == 7 && bankerSum <= 5){
//         bankerHittingCard();
//         declareWinner();
//     }else if (playerSum <= 5 && bankerSum == 3){
//         playerHittingCard();
//         if(playerHittingCard() == 8){
//             declareWinner();
//         }else{
//         bankerHittingCard();  
//         declareWinner();      
//         }
//     }else if(playerSum <= 5 && bankerSum == 4){
//         playerHittingCard();
//         if(playerHittingCard() <= 1 && playerHittingCard() >= 8){
//             declareWinner();
//         }else{
//         bankerHittingCard();
//         declareWinner();
//         }
//     }else if(playerSum <= 5 && bankerSum == 5){
//         playerHittingCard();
//         if(playerHittingCard() <= 3 && playerHittingCard() >= 8){
//             declareWinner();
//         }else{
//         bankerHittingCard();
//         declareWinner();
//         }
//     }else if(playerSum <= 5 && bankerSum == 6){
//         playerHittingCard();
//         if(playerHittingCard() <= 5 && playerHittingCard() >= 8){
//             declareWinner();
//         }else{
//         bankerHittingCard();
//         declareWinner();
//         }    
//     }
// }

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
// let card = deck.pop();
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
