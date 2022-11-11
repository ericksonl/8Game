// import microwaveSprite from "../picJs/MicrowaveSprite.js"
// import microwaveStatic from "../picJs/MicrowaveStatic.js"
import { microwaveStatic, microwaveSprite} from "../picJs/kitchenPics.js"

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1850
canvas.height = 900

class Microwave {
    constructor() {
        this.position = {
            x: 1060,
            y: 210
            
        }
        
        this.width = 208
        this.height = 345

        this.image = microwaveSprite
        this.frames = 0
        this.sprites = {
            run: {
                image: microwaveSprite,
                cropWidth: 208,
                width: 208 //to change to standing width
            },
            static: {
                image: microwaveStatic,
                cropWidth: 208,
                width: 208 //to change to standing width
            }
        }

        this.currentSprite = this.sprites.static.image
        this.currentCropWidth = 208
    }

    draw() {
        c.shadowBlur = 0

        c.drawImage(
            this.currentSprite,
            208 * this.frames,
            0,
            this.currentCropWidth,
            345,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }

    update() {

        this.frames++
        if (this.frames > 174 && (this.currentSprite === this.sprites.run.image)) {
            this.frames = 175
        } else if (this.frames > 0 && (this.currentSprite === this.sprites.static.image)) {
            this.frames = 0
        }

        this.draw()
    }
}

export default Microwave
