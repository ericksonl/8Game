import { eyeSprite } from "../picJs/bathroomPics.js"

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1850
canvas.height = 900

class EyeSprite {
    constructor() {
        this.position = {
            x: 1500,
            y: 300
            
        }
        
        this.width = 80
        this.height = 80

        this.image = eyeSprite
        this.frames = 0
        this.sprites = {
            run: {
                image: eyeSprite,
                cropWidth: 80,
                width: 80 //to change to standing width
            }
        }

        this.currentSprite = this.sprites.run.image
        this.currentCropWidth = 80
    }

    draw() {
        c.shadowBlur = 0

        c.drawImage(
            this.currentSprite,
            80 * this.frames,
            0,
            this.currentCropWidth,
            80,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }

    update() {
        this.frames++
        if (this.frames > 89) {
            this.frames = 0
        }

        this.draw()
    }
}

export default EyeSprite