//pictures
import back from "./picJs/back.js"
import LWall from "./picJs/LWall.js"
import RWall from "./picJs/RWall.js"
import walkArea from "./picJs/walkArea.js"
import pedestal from "./picJs/Pedestal.js"
import head from "./picJs/Head.js"

//classes
import GenericObject from "../../GlobalAssets/js/genericObject.js"
import WalkArea from "../../GlobalAssets/js/walkArea.js"
import Player from "../../GlobalAssets/js/player.js"

//functions
import { createImage } from "../../GlobalAssets/js/createImage.js"

//sprites

const canvas = document.querySelector('canvas')

var myFont = new FontFace('WhoAsksSatan', 'url(../GlobalAssets/fonts/WhoAsksSatan.ttf)')

myFont.load().then(function (font) {

    document.fonts.add(font)

    const c = canvas.getContext('2d')

    canvas.width = 1850
    canvas.height = 900

    class WallObject {
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

    // let walkAreaImage = createImage(walkArea)
    let walkAreaImage = createImage(walkArea)

    let player = new Player()
    let walkAreas = []
    let genericObjects = []
    let wallObjects = []
    let topText = " "
    let botText = " "
    let lowText = " "
    let headInv = false
    let tut = false
    let wTut = false
    let dTut = false
    let aTut = false
    let eTut = false

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
            }),
            new WalkArea({
                x: walkAreaImage.width * 3 - 3,
                y: 800,
                image: walkAreaImage
            }),
            new WalkArea({
                x: walkAreaImage.width * 4 - 3,
                y: 800,
                image: walkAreaImage
            }),
            new WalkArea({
                x: walkAreaImage.width * 5 - 3,
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
                x: 830,
                y: 406,
                //assets above background but behind walk area here. Things like cabinets etc, these will move with the background.
                image: createImage(head)
            }),
            new GenericObject({
                x: 800,
                y: 550,
                //assets above background but behind walk area here. Things like cabinets etc, these will move with the background.
                image: createImage(pedestal)
            })
        ]
        wallObjects = [
            new WallObject({
                x: 0,
                y: 0,
                //assets above background and walk area here. Things like side walls
                image: createImage(LWall)
            }),
            new WallObject({
                x: 1697,
                y: 0,
                //assets above background and walk area here. Things like side walls
                image: createImage(RWall)
            })
        ]

    }
    init()

    function itemPickup() {
        headInv = true;
        genericObjects = [
            new GenericObject({
                x: 0,
                y: 0,
                image: createImage(back)
            }),
            new GenericObject({
                x: 800,
                y: 550,
                //assets above background but behind walk area here. Things like cabinets etc, these will move with the background.
                image: createImage(pedestal)
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
        context.fillText(lowText, 925 - (context.measureText(lowText).width / 2), 270);
    }

    function updateText(topText, botText) {
        displayStatusText(c, topText, botText, lowText)
    }

    function animate() {
        requestAnimationFrame(animate)
        c.fillStyle = 'white'
        c.fillRect(0, 0, canvas.width, canvas.height)

        genericObjects.forEach((genericObject) => {
            genericObject.draw()
        })
        walkAreas.forEach(walkArea => {
            walkArea.draw()
        })

        wallObjects.forEach(wallObject => {
            wallObject.draw()
        })

        player.update()

        updateText(topText, botText, lowText)

        if (keys.right.pressed && player.position.x < 1550) {
            player.velocity.x = player.speed
        }
        else if ((keys.left.pressed && player.position.x > 50) || (keys.left.pressed && scrollOffset == 50 && player.position.x > 0)) {
            player.velocity.x = -player.speed
        }
        else {
            player.velocity.x = 0
        }

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

        //walkArea collision detection
        walkAreas.forEach(walkArea => {
            if (player.position.y + player.height <= walkArea.position.y &&
                player.position.y + player.height + player.velocity.y >= walkArea.position.y &&
                player.position.x + player.width >= walkArea.position.x &&
                player.position.x <= walkArea.position.x + walkArea.width) {
                player.velocity.y = 0
            }
        })
        if (tut == false && dTut == false) {
            topText = "Welcome to 8!"
            botText = "Play the tutorial by pressing 'c'"
            lowText = "or skip the tutorial by pressing 'ESC'"
        } else if (dTut == false) {
            topText = "Walk to your right by pressing"
            botText = "'d' or the right arrow key "
            lowText = " "
        } else if (aTut == false) {
            topText = "Great! Walk to your left by pressing"
            botText = "'a' or the left arrow key "
            lowText = " "
        } else if (wTut == false) {
            topText = "Sick! Jump by pressing"
            botText = "'w', space or the up arrow key "
            lowText = " "
        } else if (eTut == false) {
            topText = "Now try interacting with things."
            botText = "Press 'e' while standing by the"
            lowText = "statue to pick it up"
        } else if (dTut == true && aTut == true && wTut == true && eTut == true) {
            topText = "You have completed the tutorial!"
            botText = "Continue by pressing ESC"
            lowText = " "
        } else {
            topText = " "
            botText = " "
            lowText = " "
        }
    }

    animate()

    // window.addEventListener('keydown', ({ keyCode }) => {
    // console.log(keyCode)
    // })

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
            //esc to exit tutorial
            case 27:
                if (tut == true) {
                    break
                } else if (tut == false)
                    location.href = '../intro/';
                break
            case 69:
                if (player.position.x >= 500 && player.position.x <= 1000 && headInv == false && wTut == true) {
                    tut = false
                    eTut = true
                    itemPickup()
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