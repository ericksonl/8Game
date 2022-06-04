export function playBack() {
    var audio = new Audio('8assets/sounds/BackgroundMusic.wav');
    audio.loop = true
    audio.play();
}


export function playDoor() {
    var audio = new Audio('8assets/sounds/DoorKnob.wav');
    audio.play();
}