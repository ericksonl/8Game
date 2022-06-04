//pictures
import back from "./picJs/back.js"
import walkArea from "./picJs/walkArea.js"
import guests1 from "./picJs/Guests1.js"
import guests2 from "./picJs/Guests2.js"
import momC from "./picJs/Mom1.js"
import momNC from "./picJs/Mom2.js"

//classes
import GenericObject from "../../GlobalAssets/js/genericObject.js"
import WalkArea from "../../GlobalAssets/js/walkArea.js"
import Player from "../../GlobalAssets/js/player.js"

//functions
import { createImage } from "../../GlobalAssets/js/createImage.js"
import { updateText, updateNPCText } from "../../GlobalAssets/js/displayText.js"
import { step, party, candle } from "./audio.js"

const canvas = document.querySelector('canvas')

var myFont = new FontFace('WhoAsksSatan', 'url(../GlobalAssets/fonts/WhoAsksSatan.ttf)')

myFont.load().then(function (font) {

    document.fonts.add(font)

    const c = canvas.getContext('2d')

    canvas.width = 1850
    canvas.height = 900

    party()

    let walkAreaImage = createImage(walkArea)
    let player = new Player()
    let walkAreas = []
    let genericObjects = []
    let topText = " "
    let botText = " "
    let topNPCText = " "
    let botNPCText = " "
    let sisterTalk = false
    let stuck1 = false
    let stuck2 = false
    let n1 = false
    let n2 = false
    let m1 = false
    let m2 = false
    let finished = false

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
                y: 820,
                image: walkAreaImage
            }),
            new WalkArea({
                x: walkAreaImage.width - 3,
                y: 820,
                image: walkAreaImage
            })
        ]

        genericObjects = [
            new GenericObject({
                x: 0,
                y: 0,

                image: createImage(back)
            }), new GenericObject({
                x: 0,
                y: 0,

                image: createImage(guests1)
            }), new GenericObject({
                x: 0,
                y: 0,

                image: createImage(guests2)
            }), new GenericObject({
                x: 2000,
                y: 150,

                image: createImage(momC)
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
        updateNPCText(c, topNPCText, botNPCText)

        // console.log("foo" + scrollOffset)

        if (keys.right.pressed && player.position.x <= 1150) {
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
        // console.log(scrollOffset)
        // console.log(player.position.x)
        //add text interactions

        if (player.position.x >= 370 && sisterTalk == false) {
            player.position.y = 420
            player.velocity.x = 0
            player.velocity.y = 0
            player.currentSprite = player.sprites.stand.right
            stuck1 = true
        }

        if (player.position.x >= 1150 && scrollOffset >= 644) {
            player.position.y = 420
            player.velocity.x = 0
            player.velocity.y = 0
            player.currentSprite = player.sprites.stand.right
            stuck2 = true
        }

        if (stuck1 == true && n1 == false) {
            console.log(m1, m2, stuck2)
            topNPCText = 'Hey brother, where were you?'
        } else if (n1 == true && n2 == false) {
            console.log(m1, m2, stuck2)
            topNPCText = ''
            topText = "You wouldn't believe me if I told you"
        } else if (n2 == true && sisterTalk == false) {
            console.log(m1, m2, stuck2)
            topNPCText = 'Well we have been waiting for you.'
            botNPCText = 'Mom is by the fence with your cake'
            topText = ''
        } else if (stuck2 == true && m1 == false && finished == false) {
            console.log(m1, m2, stuck2)
            topNPCText = 'Happy birthday sweetie!'
        } else if (m1 == true && m2 == false) {
            console.log(m1, m2, stuck2)
            topNPCText = ''
            topText = "Mom! I love you"
        } else if (m2 == true && finished == false) {
            topNPCText = 'Haha, I love you too sweetheart.'
            botNPCText =  'Now blow out your candle!'
            topText = ''
        } else if (finished == true) {
            topNPCText = ''
            botNPCText = ''
            topText = ''
        } else {
            topNPCText = ''
            botNPCText = ''
            topText = ''
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
            case 69:
                if (stuck1 == true && n1 == false) {
                    n1 = true
                    return
                }
                if (n1 == true && n2 == false) {
                    n2 = true
                    return
                }
                if (n2 == true && sisterTalk == false) {
                    sisterTalk = true
                    return
                }
                
                if (stuck2 == true && m1 == false) {
                    m1 = true
                    return
                }
                if (m1 == true && m2 == false) {
                    m2 = true
                    return
                }
                
                if (m2 == true && finished == false) {
                    finished = true
                    genericObjects[3].image = momNC
                    candle()
                    setTimeout(function () {
                        location.href = '../credits/';
                    }, 2000);
                    return
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