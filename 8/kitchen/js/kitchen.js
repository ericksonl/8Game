//pictures
import { background, boyAlive, boyDead, brain, freezerOpen, fridgeOpen, frozenBrain, key, meltingBrain, transparent, walkArea} from "./picJs/kitchenPics.js"

//classes
import GenericObject from "../../GlobalAssets/js/genericObject.js"
import WalkArea from "../../GlobalAssets/js/walkArea.js"
import Player from "../../GlobalAssets/js/player.js"

import Microwave from "./spriteSheets/microwave.js"
//functions
import { updateText, updateNPCText } from "../../GlobalAssets/js/displayText.js"
import { step, playDoor, explosion, squeak, microwaveOn, defrost, placeBrain } from "./audio.js"
import { updateTimer, startTime, timer } from "../../GlobalAssets/js/updateTimer.js"


const canvas = document.querySelector('canvas')

var myFont = new FontFace('WhoAsksSatan', 'url(../GlobalAssets/fonts/WhoAsksSatan.ttf)')

myFont.load().then(function (font) {

    document.fonts.add(font)

    const c = canvas.getContext('2d')

    canvas.width = 1850
    canvas.height = 900

    let player = new Player()
    let microwave = new Microwave()
    let walkAreas = []
    let genericObjects = []
    let topText = " "
    let botText = " "
    let topNPCText = " "
    let botNPCText = " "
    let fridgeOpenOBJ = false
    let freezerOpenOBJ = false
    let frozenBrainOBJ = false
    let thawedBrain = false
    let wait = false
    let rBrain = false
    let alive = false
    let holdKey = false

    let th = startTime.setSeconds(startTime.getSeconds() + 90);

    let lastKey
    const keys = {
        right: {
            pressed: false
        },
        left: {
            pressed: false
        },
    }

    function displayTimer() {
        c.fillStyle = 'rgba(0, 0, 0, 0.25)';
        c.fillText(timer, 1000, 875);
    }


    function init() {
        microwave = new Microwave()

        player = new Player()
        setTimeout(function () {
            microwave.currentSprite = microwave.sprites.run.image
        }, 1000);
        walkAreas = [
            new WalkArea({
                x: 0,
                y: 845,
                image: walkArea
            })
        ]

        //background goes here
        genericObjects = [
            new GenericObject({
                x: 0,
                y: 0,
                image: background
            })
        ]
    }
    init()

    function animate() {
        requestAnimationFrame(animate)
        c.fillStyle = 'white'
        c.fillRect(0, 0, canvas.width, canvas.height)

        walkAreas.forEach(walkArea => {
            walkArea.draw()
        })

        genericObjects.forEach((genericObject) => {
            genericObject.draw()
        })
        microwave.update()
        if (microwave.frames == 30) {
            microwaveOn()
        }
        if (microwave.frames == 60) {
            squeak()
        }

        if (microwave.frames == 134) {
            explosion()
        }

        player.update()
        if ((player.currentSprite == player.sprites.run.right || player.currentSprite == player.sprites.run.left) && player.frames == 10 && player.velocity.y == 1) {
            step()
        }

        updateTimer(th, 'Kitchen')
        displayTimer()

        updateNPCText(c, topNPCText, botNPCText)
        updateText(c, topText, botText)


        if (keys.right.pressed && player.position.x <= 1600) {
            player.velocity.x = player.speed
        } else if (keys.right.pressed && player.position.x > 0) {
            player.velocity.x = -player.speed
        }
        else if ((keys.left.pressed && player.position.x > 50)) {
            player.velocity.x = -player.speed
        }
        else {
            player.velocity.x = 0
        }

        //walkArea collision detection
        walkAreas.forEach(walkArea => {
            if (player.position.y + player.height <= walkArea.position.y &&
                player.position.y + player.height + player.velocity.y >= walkArea.position.y &&
                player.position.x + player.width >= walkArea.position.x &&
                player.position.x <= walkArea.position.x + walkArea.width) {
                player.velocity.y = 0
            }
        })

        //switching sprites
        if (keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.run.right) {
            player.frames = 1
            player.currentSprite = player.sprites.run.right
            player.currentCropWidth = player.sprites.run.cropWidth
            player.width = player.sprites.run.width
        } else if (!keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.stand.right) {
            player.currentSprite = player.sprites.stand.right
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width

        } else if (keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.run.left) {
            player.currentSprite = player.sprites.run.left
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
        } else if (!keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.stand.left) {
            player.currentSprite = player.sprites.stand.left
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
        }

        if (microwave.frames >= 110 && fridgeOpenOBJ == false) {
            topText = "Fluffy?? NOOOO!"
            botText = " "
        } else if (fridgeOpenOBJ == true && freezerOpenOBJ == false) {
            topText = "AHHH! A DEAD GUY!"
            botText = "And he's holding the door key!"
        } else if (freezerOpenOBJ == true && wait == false) {
            topText = "Gross a brain!"
            botText = "It's frozen solid!"
        } else if (wait == true && alive == false) {
            topText = "That did the trick"
            botText = ""
        } else if (alive == true && holdKey == false) {
            topText = ''
            topNPCText = "Graagrrr... I'm alive! Thanks! Here take my ke-"
            botText = "AAAAAH"
        } else if (holdKey == true) {
            topNPCText = "Happy birthday!"
            botText = ". . . thanks . . ."
        } else {
            topText = " "
            botText = " "
        }
    }

    animate()

    window.addEventListener('keydown', ({ keyCode }) => {
        switch (keyCode) {
            //left, 'a' keycode = 65, '<-' keycode = 37
            case 65:
                keys.left.pressed = true
                lastKey = 'left'
                break
            case 37:
                keys.left.pressed = true
                lastKey = 'left'
                break
            //right, 'd' keycode = 68, '->' keycode = 30
            case 68:
                keys.right.pressed = true
                lastKey = 'right'

                break
            case 39:
                keys.right.pressed = true
                lastKey = 'right'
                break
            //up, 'w' keycode = 87, 'space' keycode = 32, '^' keycode = 38
            case 87:
                if (event.repeat || player.velocity.y != 0) {
                    return
                }
                player.velocity.y -= 15
                break
            case 32:
                if (event.repeat || player.velocity.y != 0) {
                    return
                }
                player.velocity.y -= 15
                break
            case 38:
                if (event.repeat || player.velocity.y != 0) {
                    return
                }
                player.velocity.y -= 15
                break
            //interaction
            case 69:
                lastKey = 'interact'
                if (player.position.x >= 40 && player.position.x < 160 && fridgeOpenOBJ == false) {
                    genericObjects.push(new GenericObject({
                        x: 0,
                        y: 350,

                        image: fridgeOpen
                    }))
                    genericObjects.push(new GenericObject({
                        x: 80,
                        y: 363,

                        image: boyDead
                    }))
                    genericObjects.push(new GenericObject({
                        x: 146,
                        y: 565,

                        image: key
                    }))
                    fridgeOpenOBJ = true
                    return
                }
                if (player.position.x >= 40 && player.position.x < 160 && player.position.y < 400 && freezerOpenOBJ == false) {
                    genericObjects.push(new GenericObject({
                        x: 0,
                        y: 215,

                        image: freezerOpen
                    }))
                    genericObjects.push(new GenericObject({
                        x: 130,
                        y: 280,

                        image: frozenBrain
                    }))
                    freezerOpenOBJ = true
                    return
                }

                if (player.position.x >= 40 && player.position.x < 160 && player.position.y < 400 && frozenBrainOBJ == false && freezerOpenOBJ == true) {
                    genericObjects.pop()
                    frozenBrainOBJ = true
                }

                if (player.position.x >= 350 && player.position.x < 540 && frozenBrainOBJ == true && thawedBrain == false) {
                    thawedBrain = true
                    defrost()
                    genericObjects.push(new GenericObject({
                        x: 505,
                        y: 459,
                        image: frozenBrain
                    }))
                    setTimeout(function () {
                        genericObjects.pop()
                        genericObjects.push(new GenericObject({
                            x: 505,
                            y: 487,
                            image: meltingBrain
                        }))
                        setTimeout(function () {
                            genericObjects.pop()
                            genericObjects.push(new GenericObject({
                                x: 510,
                                y: 505,
                                image: brain
                            }))
                            wait = true
                        }, 1000);
                    }, 1000);
                }

                if (player.position.x >= 350 && player.position.x < 540 && thawedBrain == true && wait == true && rBrain == false) {
                    rBrain = true
                    genericObjects.pop()
                }

                if (player.position.x >= 40 && player.position.x < 160 && rBrain == true && alive == false) {
                    alive = true
                    placeBrain()
                    genericObjects[2].image = boyAlive
                    genericObjects[2].position.x = 82
                    genericObjects[2].position.y = 361
                    return
                }

                if (player.position.x >= 40 && player.position.x < 160 && alive == true && holdKey == false) {
                    holdKey = true
                    genericObjects[3].image = transparent
                }

                if (player.position.x >= 1310 && player.position.x < 1580 && holdKey == true) {
                    playDoor()
                    setTimeout(function () {
                        location.href = '../outside/';
                    }, 300);
                }
                break
        }
    })

    window.addEventListener('keyup', ({ keyCode }) => {
        switch (keyCode) {
            //left, 'a' keycode = 65
            case 65:
                keys.left.pressed = false
                break
            case 37:
                keys.left.pressed = false
                break
            //right, 'd' keycode = 68
            case 68:
                keys.right.pressed = false
                break
            case 39:
                keys.right.pressed = false
                break
        }
    })

})