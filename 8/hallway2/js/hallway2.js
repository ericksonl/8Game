//pictures
import { background, picture, walkArea } from "./picJs/hallway2Pics.js"

//classes
import GenericObject from "../../GlobalAssets/js/genericObject.js"
import WalkArea from "../../GlobalAssets/js/walkArea.js"
import Player from "../../GlobalAssets/js/player.js"

//functions
import { updateText } from "../../GlobalAssets/js/displayText.js"
import { step, ticking, playDoor, playChime, doorHandleJiggle } from "./audio.js"

const canvas = document.querySelector('canvas')

var myFont = new FontFace('WhoAsksSatan', 'url(../GlobalAssets/fonts/WhoAsksSatan.ttf)')

myFont.load().then(function (font) {

    document.fonts.add(font)

    const c = canvas.getContext('2d')

    canvas.width = 1850
    canvas.height = 900

    playChime()
    ticking()

    let player = new Player()
    let walkAreas = []
    let genericObjects = []
    let topText = " "
    let botText = " "
    let scrollOffset = 0

    let lastKey
    const keys = {
        right: {
            pressed: false
        },
        left: {
            pressed: false
        },
    }

    function init() {
        player = new Player()
        player.position.x = 1100
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
                x: 1540,
                y: 280,

                image: picture
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

        updateText(c, topText, botText)

        if (keys.right.pressed && player.position.x <= 1550) {
            player.velocity.x = player.speed
        } else if (keys.right.pressed && scrollOffset > 640 && player.position.x > 0) {
            player.velocity.x = -player.speed
        }
        else if ((keys.left.pressed && player.position.x > 100) || (keys.left.pressed && scrollOffset == 100 && player.position.x > 0)) {
            player.velocity.x = -player.speed
        }
        else {
            player.velocity.x = 0

            if (keys.right.pressed) {
                scrollOffset += player.speed
                walkAreas.forEach((walkArea) => {
                    walkArea.position.x -= player.speed
                })
                //move back assets to right
                genericObjects.forEach((genericObject) => {
                    genericObject.position.x -= player.speed
                })
            } else if (keys.left.pressed && scrollOffset > 0) {
                scrollOffset -= player.speed
                walkAreas.forEach((walkArea) => {
                    walkArea.position.x += player.speed
                })
                //move back assets to left
                genericObjects.forEach((genericObject) => {
                    genericObject.position.x += player.speed
                })
            }
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

        if ((player.position.x > (100 - scrollOffset)) && (player.position.x < (420 - scrollOffset)) &&  lastKey == 'interact') {
            topText = 'jammed'
        } else if ((player.position.x > (922 - scrollOffset)) && (player.position.x < (1272 - scrollOffset)) && lastKey == 'interact') {
            topText = 'jammed'
        } else if ((player.position.x > (1860 - scrollOffset)) && (player.position.x < (2260 - scrollOffset))) {
            topText = 'I wonder if this is what the key is for'
        }else {
            topText = ''
            botText = ''
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
                if ((player.position.x > (100 - scrollOffset)) && (player.position.x < (420 - scrollOffset))) {
                    doorHandleJiggle()
                } else if ((player.position.x > (922 - scrollOffset)) && (player.position.x < (1272 - scrollOffset))) {
                    doorHandleJiggle()
                }
                if ((player.position.x > (1860 - scrollOffset)) && (player.position.x < (2260 - scrollOffset))) {
                    playDoor()
                    setTimeout(function () {
                        location.href = '../kitchen/';
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