var audio

export function clownLaugh() {
    audio = new Audio('8assets/sounds/EvilClownLaugh.wav');
    audio.play();
}

export function laughEnd() {
    return audio.ended
}