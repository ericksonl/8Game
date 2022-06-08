//pictures
import { background, walkArea } from "./picJs/bedroomPics.js"

//classes
import GenericObject from "../../GlobalAssets/js/genericObject.js"
import WalkArea from "../../GlobalAssets/js/walkArea.js"
import Player from "../../GlobalAssets/js/player.js"

//functions
import { updateText } from "../../GlobalAssets/js/displayText.js"
import { playBack, playDoor } from "./audio.js"

const canvas = document.querySelector('canvas')

var myFont = new FontFace('WhoAsksSatan', 'url(../GlobalAssets/fonts/WhoAsksSatan.ttf)')

myFont.load().then(function (font) {

    document.fonts.add(font)

    const c = canvas.getContext('2d')

    canvas.width = 1850
    canvas.height = 900

    playBack()

    let wait = 0
    let player = new Player()
    let walkAreas = []
    let genericObjects = []
    let topText = " "
    let botText = " "

    let lastKey
    const keys = {
        right: {
            pressed: false
        },
        left: {
            pressed: false
        },
    }

    let scrollOffset = 0

    function init() {

        player = new Player()
        walkAreas = [
            new WalkArea({
                x: -1,
                y: 824,
                image: walkArea
            }),
            new WalkArea({
                x: walkArea.width - 3,
                y: 824,
                image: walkArea
            }),
            new WalkArea({
                x: walkArea.width * 2 - 3,
                y: 824,
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

        player.update()
        
        updateText(c, topText, botText)

        if (keys.right.pressed && player.position.x < 1550) {
            player.velocity.x = player.speed
        }
        else if ((keys.left.pressed && player.position.x > 100) || (keys.left.pressed && scrollOffset == 50 && player.position.x > 0)) {
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


        if (player.position.x >= 1500 && player.position.x <= 1660) {
            topText = "Press 'e' to leave the room"
            botText = " "
        } else if (player.position.x <= 1500 || player.position.x >= 1660) {
            topText = "It's my 8th birthday today!"
            botText = "I wonder if I got presents"
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
            case 69:
                if (player.position.x >= 1500 && player.position.x <= 1660) {
                    playDoor()
                    setTimeout(function () {
                        location.href = '../hallway/';
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