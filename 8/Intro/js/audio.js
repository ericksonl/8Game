var audio

export function playBack() {
    audio = new Audio('assets/sounds/IntroBackground.wav');
    audio.loop = true
    audio.play();
}

// export function decreaseVolume() {
//    var i = 10000
//    for (i; i > 0; i--) {
//         audio.volume = (i/10000)
//    }
       
// }
