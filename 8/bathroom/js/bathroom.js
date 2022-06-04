//pictures
import back from "./picJs/Back.js"
import walkArea from "./picJs/WalkArea.js"
import toiletLid from "./picJs/ToiletLid.js"
import bathKnob from "./picJs/BathKnob.js"
import drawerHandle from "./picJs/DrawerHandle.js"
import bathCover from "./picJs/BathCover.js"
import transparent from "./picJs/Transparent.js"
import drawer from "./picJs/Drawer.js"
import shard from "./picJs/Shard.js"
import fixedMirror from "./picJs/FixedMirror.js"
import key from "./picJs/Key.js"

//classes
import GenericObject from "../../GlobalAssets/js/genericObject.js"
import WalkArea from "../../GlobalAssets/js/walkArea.js"
import Player from "../../GlobalAssets/js/player.js"

import BloodSprite from "./spriteSheets/BloodSprite.js"
import EyeSprite from "./spriteSheets/EyeSprite.js"

//functions
import { createImage } from "../../GlobalAssets/js/createImage.js"
import { updateText } from "../../GlobalAssets/js/displayText.js"
import { step, playDoor, bloodWater, toiletLidA, mirrorFix, drawerOpenClose, KeyJingle, tubTink, drip } from "./audio.js"
import { updateTimer, startTime, timer } from "../../GlobalAssets/js/updateTimer.js"

const canvas = document.querySelector('canvas')

var myFont = new FontFace('WhoAsksSatan', 'url(../GlobalAssets/fonts/WhoAsksSatan.ttf)')

myFont.load().then(function (font) {

    document.fonts.add(font)

    const c = canvas.getContext('2d')

    canvas.width = 1850
    canvas.height = 900

    drip()

    let walkAreaImage = createImage(walkArea)
    let player = new Player()
    let bloodSprite = new BloodSprite()
    let eyeSprite = new EyeSprite()
    let walkAreas = []
    let genericObjects = []
    let topText = " "
    let botText = " "
    let scrollOffset = 0
    let keyOBJ = false
    let lid = false
    let knob = false
    let onTub = false
    let blood = false
    let drawerH = false
    let atchH = false
    let shardS = false
    let dComplete = false
    let doorS = false

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
        player = new Player()
        player.position.x = 250

        eyeSprite = new EyeSprite()

        walkAreas = [
            new WalkArea({
                x: 0,
                y: 845,
                image: walkAreaImage
            })
        ]

        //background goes here
        genericObjects = [
            new GenericObject({
                x: 0,
                y: 0,

                image: createImage(back)
            }),
            new GenericObject({
                x: 580,
                y: 486,

                image: createImage(toiletLid)
            }),
            new GenericObject({
                x: 1400,
                y: 700,

                image: createImage(drawerHandle)
            }),
            new GenericObject({
                x: 1350,
                y: 495,

                image: createImage(bathCover)
            }),
            new GenericObject({
                x: 1000,
                y: 780,

                image: createImage(key)
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

        eyeSprite.update()

        player.update()
        if ((player.currentSprite == player.sprites.run.right || player.currentSprite == player.sprites.run.left) && player.frames == 10 && player.velocity.y == 1) {
            step()
        }

        updateTimer(th)
        displayTimer()

        updateText(c, null, topText, botText)

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

        // console.log("Scroll", scrollOffset)
        //console.log("postion", player.position.x)

        if (blood == true && genericObjects[2].position.y > 480 && drawerH == false) {
            bloodSprite.update()
            genericObjects[2].position.y--
            // player.position.x = 250
        }


        if (lid == false && keyOBJ == false) {
            topText = "What happened to the door?"
            botText = "I gotta get out of here!"
        } else if (keyOBJ == true && lid == false) {
            topText = "A key?"
            botText = " "
        } else if (lid == true && knob == false) {
            topText = "This looks like a handle..."
            botText = "I wonder what it goes to"
        } else if (onTub == true && blood == false) {
            topText = "That fit!"
            botText = " "
        } else if (blood == true && drawerH == false) {
            topText = "Ewww..."
            botText = " "
        } else if (drawerH == true && genericObjects[2].image == transparent && atchH == false) {
            topText = "I've seen a handle like this before..."
            botText = " "
        } else if (atchH == true && shardS == false) {
            topText = "Nice!"
            botText = " "
        } else if (shardS == true && doorS == false) {
            topText = "My mom always told me not to touch glass"
            botText = " "
        } else if (doorS == true) {
            topText = "Oh there's the door!"
            botText = " "
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
                if (player.position.x > 870 && player.position.x < 1100 && keyOBJ == false) {
                    KeyJingle()
                    keyOBJ = true;
                    genericObjects.pop()
                }
                if (player.position.x > 385 && player.position.x < 680 && lid == false && keyOBJ == true) {
                    toiletLidA()
                    lid = true;
                    genericObjects[1].position.x = 520
                    genericObjects.push(new GenericObject({
                        x: 680,
                        y: 482,

                        image: createImage(bathKnob)
                    }))
                }
                else if (player.position.x > 385 && player.position.x < 680 && lid == true && knob == false) {
                    knob = true;
                    genericObjects.pop()
                }
                if (player.position.x > 1530 && knob == true && onTub == false) {
                    onTub = true
                    tubTink()
                    genericObjects.push(new GenericObject({
                        x: 1706,
                        y: 450,

                        image: createImage(bathKnob)
                    }))
                } else if (player.position.x > 1530 && onTub == true && blood == false) {
                    bloodWater()
                    blood = true
                }

                if (player.position.x > 1230 && player.position.x < 1450 && genericObjects[2].position.y == 480) {
                    drawerH = true
                    genericObjects[2].image = transparent
                }

                if (player.position.x > 96 && player.position.x < 290 && genericObjects[2].image == transparent) {
                    genericObjects[2].image = drawerHandle
                    genericObjects[2].position.x = 255
                    genericObjects[2].position.y = 710
                    setTimeout(function () {
                        atchH = true
                    }, 100);
                }

                if (player.position.x > 96 && player.position.x < 290 && atchH == true && shardS == false) {
                    drawerOpenClose()
                    genericObjects.push(new GenericObject({
                        x: 152,
                        y: 690,

                        image: createImage(drawer)
                    }))
                    genericObjects.push(new GenericObject({
                        x: 220,
                        y: 700,

                        image: createImage(shard)
                    }))
                    shardS = true
                    return
                }

                if (player.position.x > 96 && player.position.x < 290 && shardS == true && dComplete == false) {

                    genericObjects.pop()
                    dComplete = true
                    return
                }


                if (player.position.x > 96 && player.position.x < 340 && doorS == false && dComplete == true) {
                    mirrorFix()
                    genericObjects.push(new GenericObject({
                        x: 154,
                        y: 120,

                        image: createImage(fixedMirror)
                    }))
                    doorS = true
                    return
                }

                if (player.position.x > 96 && player.position.x < 340 && doorS == true) {
                    playDoor()
                    setTimeout(function () {
                        location.href = '../hallway2/';
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