const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const types = ["C", "D", "H", "S"];
let playerSum = 0;
let bankerSum = 0;
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

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}
shuffleDeck()


