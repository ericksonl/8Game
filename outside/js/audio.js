export function step() {
    var audio = new Audio('assets/sounds/Walking.wav');
    audio.play();
}

export function party() {
    var audio = new Audio('assets/sounds/PartyBackground.wav');
    audio.loop = true
    audio.play();
}

export function candle() {
    var audio = new Audio('assets/sounds/CandleBlow.wav');
    audio.play();
}