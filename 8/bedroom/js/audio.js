export function playBack() {
    var audio = new Audio('assets/sounds/BackgroundMusic.wav');
    audio.loop = true
    audio.play();
}


export function playDoor() {
    var audio = new Audio('assets/sounds/DoorKnob.wav');
    audio.play();
}