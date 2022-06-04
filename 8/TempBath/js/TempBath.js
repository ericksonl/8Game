//pictures
import back from "./picJs/back.js"
import staticImg from "./picJs/static.js"
import walkArea from "./picJs/walkArea.js"
import key from "./picJs/Key.js"
import black from "./picJs/black.js"

//classes
import GenericObject from "../../GlobalAssets/js/genericObject.js"
import WalkArea from "../../GlobalAssets/js/walkArea.js"
import Player from "../../GlobalAssets/js/player.js"

//functions
import { createImage } from "../../GlobalAssets/js/createImage.js"
import { clownLaugh, laughEnd } from "./audio.js"
//import { updateTimer, startTime, timer } from "../../GlobalAssets/js/updateTimer.js"

const canvas = document.querySelector('canvas')

var myFont = new FontFace('WhoAsksSatan', 'url(../GlobalAssets/fonts/WhoAsksSatan.ttf)')

myFont.load().then(function (font) {

    document.fonts.add(font)

    const c = canvas.getContext('2d')

    canvas.width = 1850
    canvas.height = 900

    let walkAreaImage = createImage(walkArea)
    let player = new Player()
    let walkAreas = []
    let genericObjects = []
    let blackObjects = []
    let topText = " "
    let botText = " "
    let clown = false;
    let keyInv = false
    let doorR = false
    let alpha = 0
    let laugh = false

    //let th = startTime.setSeconds(startTime.getSeconds() + 30);
    
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

    class BlackObject {
        //x y are position
        constructor({ x, y, image }) {
            this.position = {
                x: x,
                y: y
            }
    
            this.image = image
            this.width = image.width
            this.height = image.height
    
        }
    
        draw() {
            c.drawImage(this.image, this.position.x, this.position.y)
        }
    }

    //initializes objects
    function init() {

        player = new Player()
        walkAreas = [
            new WalkArea({
                x: 137,
                y: 800,
                image: walkAreaImage
            }),
            new WalkArea({
                x: walkAreaImage.width - 3,
                y: 800,
                image: walkAreaImage
            }),
            new WalkArea({
                x: walkAreaImage.width * 2 - 3,
                y: 800,
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
                x: 663,
                y: 463,
                //assets above background but behind walk area here. Things like cabinets etc, these will move with the background.
                image: createImage(key)
            }),
            new GenericObject({
                x: 155,
                y: 0,
                //assets above background but behind walk area here. Things like cabinets etc, these will move with the background.
                image: createImage(staticImg)
            })
        ]
    }
    init()

    function lightsOff() {
        blackObjects = [
            new BlackObject({
                x: 0,
                y: 0,
                image: createImage(black)
            })
        ]
        blackObjects.forEach((blackObject) => {
            blackObject.draw()
        })
        
    }


    function itemPickup() {
        keyInv = true;
        genericObjects = [
            new GenericObject({
                x: 0,
                y: 0,

                image: createImage(back)
            }),
            new GenericObject({
                x: 155,
                y: 0,
                image: createImage(staticImg)
            })
        ]
        genericObjects.forEach((genericObject) => {
            genericObject.draw()
        })
    }

    function displayStatusText(context, topText, botText) {
        context.fillStyle = 'rgba(0, 0, 0, 0.75)';
        context.font = '100px WhoAsksSatan';
        context.fillText(topText, 925 - (context.measureText(topText).width / 2), 100);
        context.fillText(botText, 925 - (context.measureText(botText).width / 2), 185);
        //unable to be updated in this function
        //context.fillText(timer, 50, 875);
    }

    function updateText(topText, botText) {
        displayStatusText(c, topText, botText)
    }

    function animate() {
        requestAnimationFrame(animate)
        c.fillStyle = 'black'

        //draw each walkArea
        walkAreas.forEach(walkArea => {
            walkArea.draw()
        })

        //draw each genericObject
        genericObjects.forEach((genericObject) => {
            genericObject.draw()
        })

        player.update()

        blackObjects.forEach((blackObject) => {
            blackObject.draw()
        })

        //updateTimer(th)

        updateText(topText, botText)

        if (keys.right.pressed && player.position.x < 1550) {
            player.velocity.x = player.speed
        }
        else if ((keys.left.pressed && player.position.x > 50) || (keys.left.pressed && scrollOffset == 50 && player.position.x > 0)) {
            player.velocity.x = -player.speed
        }
        else {
            player.velocity.x = 0

            //For future if we want assets to move
            // if (keys.right.pressed) {
            //     scrollOffset += player.speed
            //     walkArea.forEach(walkArea => {
            //         walkArea.position.x -= player.speed
            //     })
            //     //move back assets to right
            //     genericObjects.forEach(genericObject => {
            //         genericObject.position.x -= player.speed
            //     })
            // } else if (keys.left.pressed && scrollOffset > 0) {
            //     scrollOffset -= player.speed
            //     walkArea.forEach(walkArea => {
            //         walkArea.position.x += player.speed
            //     })
            //     //move back assets to left
            //     genericObjects.forEach(genericObject => {
            //         genericObject.position.x += player.speed
            //     })
            // }
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

        //Room interaction text
        if (doorR == false && (player.position.x <= 1500 || player.position.x >= 1660) && clown == false) {
            topText = "Ew this place is gross..."
            botText = "I should leave"
        } else if (player.position.x >= 1500 && player.position.x <= 1660 && keyInv == false) {
            doorR = true;
            topText = "The door is locked..."
            botText = "Maybe I need a key"
        } else if (player.position.x >= 1500 && player.position.x <= 1660 && keyInv == true && clown == false) {
            topText = "This looks like the correct key"
            botText = " "
        } else {
            topText = " "
            botText = " "
        }
        if (keyInv == true && (player.position.x <= 1500 || player.position.x >= 1660) && clown == false) {
            topText = "You found a key behind a towel."
            botText = " Maybe this is the right one..."
        }

        if (clown == true && alpha < 300) {
            topText = "It didn't work?"
            alpha++
            
        }
        if (alpha == 300 && clown == true) {
            lightsOff()
            laugh = true
        }

        if (laugh == true && alpha < 401) {
            alpha++ 
            if (alpha == 400) {
                clownLaugh()
            }
        } else if (laugh == true && laughEnd() == true) {
            location.href = '../../8TitleScreen'
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
                if (player.position.x >= 1500 && player.position.x <= 1660 && keyInv == true) {
                    clown = true;
                }
                if (player.position.x >= 400 && player.position.x <= 800 && keyInv == false) {
                    itemPickup();
                }
                //interact()
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