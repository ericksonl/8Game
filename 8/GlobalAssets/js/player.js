import spriteRunRight from "./pics/runRight.js"
import spriteRunLeft from "./pics/runLeft.js"
import spriteStandLeft from "./pics/standLeft.js"
import spriteStandRight from "./pics/standRight.js"
import { createImage } from "./createImage.js"

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1850
canvas.height = 900


const gravity = 1


class Player {
    constructor() {
        this.speed = 7
        this.position = {
            x: 100,
            y: 400
            
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 205
        this.height = 394

        this.image = createImage(spriteStandRight)
        this.frames = 0
        this.sprites = {
            stand: {
                //TODO: standing right and left
                right: createImage(spriteStandRight),
                left: createImage(spriteStandLeft),
                cropWidth: 205,
                width: 205 //to change to standing width
            },
            run: {
                right: createImage(spriteRunRight),
                left: createImage(spriteRunLeft),
                cropWidth: 205,
                width: 205 //to change to standing width
            }
        }

        this.currentSprite = this.sprites.stand.right
        this.currentCropWidth = 205
    }

    draw() {
        c.shadowBlur = 0
        
        c.drawImage(
            this.currentSprite,
            205 * this.frames,
            0,
            this.currentCropWidth,
            394,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }

    update() {
        this.frames++
        if (this.frames > 39 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)) {
            this.frames = 0
        }
        
        else if (this.frames > 29 && (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left)) {
            this.frames = 0
        }
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        }
        else {
            this.velocity.y = 0
        }
    }
}

export default Player