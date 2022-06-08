export function step() {
    var audio = new Audio('assets/sounds/Walking.wav');
    audio.play();
}

export function ticking() {
    var audio = new Audio('assets/sounds/ticking.wav');
    audio.loop = true
    audio.play();
}

export function playDoor() {
    var audio = new Audio('assets/sounds/DoorKnob.wav');
    audio.play();
}

export function clownLaugh() {
    var audio = new Audio('assets/sounds/ClownLaugh1.wav');
    audio.play();
}

export function doorHandleJiggle() {
    var audio = new Audio('assets/sounds/DoorHandleJiggle.wav');
    audio.play();
}