//pictures
import { background, head, pedestal, walkArea } from "./picJs/tutorialPics.js"

//classes
import GenericObject from "../../GlobalAssets/js/genericObject.js"
import WalkArea from "../../GlobalAssets/js/walkArea.js"
import Player from "../../GlobalAssets/js/player.js"

//functions
import { updateText, updateNPCText } from "../../GlobalAssets/js/displayText.js"
import { step, playDoor } from "./audio.js"

const canvas = document.querySelector('canvas')

var myFont = new FontFace('WhoAsksSatan', 'url(../GlobalAssets/fonts/WhoAsksSatan.ttf)')

myFont.load().then(function (font) {

    document.fonts.add(font)

    const c = canvas.getContext('2d')

    canvas.width = 1850
    canvas.height = 900

    let player = new Player()
    let walkAreas = []
    let genericObjects = []
    let text1 = " "
    let text2 = " "
    let text3 = " "
    let text4 = " "
    let topNPCText = " "
    let botNPCText = " "
    let headInv = false
    let tut = false
    let wTut = false
    let dTut = false
    let aTut = false
    let npc = false
    let finish = false

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

        player = new Player()

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
            }), new GenericObject({
                x: 800,
                y: 600,
                image: pedestal
            }), new GenericObject({
                x: 830,
                y: 456,
                image: head
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

        player.update()
        if ((player.currentSprite == player.sprites.run.right || player.currentSprite == player.sprites.run.left) && player.frames == 10 && player.velocity.y == 1) {
            step()
        }

        updateNPCText(c, topNPCText, botNPCText)
        updateText(c, text1, text2, text3, text4)


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

        if (tut == false) {
            text1 = 'Welcome to 8!'
            text2 = "To continue the tutorial press 'c'"
            text3 = 'If you would like to leave at any time,'
            text4 = "walk up to the door and press 'e'"
        } else if (tut == true && dTut == false) {
            text1 = 'Great! Lets start with movement'
            text2 = "Move right with 'd' or the right arrow key"
            text3 = ''
            text4 = ""
        } else if (dTut == true && aTut == false) {
            text1 = 'Nice!'
            text2 = "Move left with 'a' or the left arrow key"
        } else if (aTut == true && wTut == false) {
            text1 = "Now try jumping with 'w', space,"
            text2 = 'or the up arrow key'
        } else if (wTut == true && headInv == false) {
            text1 = "Good job! Now lets try interactions"
            text2 = "Walk up to the head and press 'e' to pick it up"
        } else if (headInv == true && npc == false) {
            text1 = "Awesome job! Now some important tips:"
            text2 = "Sometimes you will have to skip text by pressing 'e'"
            text3 = "Try it now"
        } else if (npc == true && finish == false) {
            topNPCText = "You may see this font."
            botNPCText = "That indicates an NPC is talking"
            text1 = ''
            text2 = ""
            text3 = ''
        } else if (finish == true) {
            topNPCText = ''
            botNPCText = ''
            text1 = 'This game is not meant to be easy.'
            text2 = 'There will not be hints.'
            text3 = 'Try not to run out of time.'
            text4 = 'Have fun!'
        }
    }

    animate()

    window.addEventListener('keydown', ({ keyCode }) => {
        switch (keyCode) {
            //left, 'a' keycode = 65, '<-' keycode = 37
            case 65:
                if (dTut == true) {
                    aTut = true
                }
                keys.left.pressed = true
                lastKey = 'left'
                break
            case 37:
                if (dTut == true) {
                    aTut = true
                }
                keys.left.pressed = true
                lastKey = 'left'
                break
            //right, 'd' keycode = 68, '->' keycode = 30
            case 68:
                if (tut == true) {
                    dTut = true
                }
                keys.right.pressed = true
                lastKey = 'right'
                break
            case 39:
                if (tut == true) {
                    dTut = true
                }
                keys.right.pressed = true
                lastKey = 'right'
                break
            //up, 'w' keycode = 87, 'space' keycode = 32, '^' keycode = 38
            case 87:
                if (aTut == true) {
                    wTut = true
                }
                if (event.repeat || player.velocity.y != 0) {
                    return
                }
                player.velocity.y -= 15
                break
            case 32:
                if (aTut == true) {
                    wTut = true
                }
                if (event.repeat || player.velocity.y != 0) {
                    return
                }
                player.velocity.y -= 15
                break
            case 38:
                if (aTut == true) {
                    wTut = true
                }
                if (event.repeat || player.velocity.y != 0) {
                    return
                }
                player.velocity.y -= 15
                break
            //c to continue tutorial
            case 67:
                if (tut == false)
                    tut = true
                break
            case 69:
                lastKey = 'interact'
                if (player.position.x > 1500) {
                    playDoor()
                    setTimeout(function () {
                        location.href = '../intro/';
                    }, 300);
                }
                if (player.position.x >= 500 && player.position.x <= 1000 && headInv == false && wTut == true) {
                    headInv = true
                    genericObjects.pop()
                    return
                }
                if (headInv == true && npc == false) {
                    npc = true
                } else if (npc == true && finish == false) {
                    finish = true
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