import bloodSpriteImg from "../picJs/BloodSpriteImg.js"

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1850
canvas.height = 900

class BloodSprite {
    constructor() {
        this.position = {
            x: 1670,
            y: 445
            
        }
        
        this.width = 40
        this.height = 50

        this.image = bloodSpriteImg
        this.frames = 0
        this.sprites = {
            run: {
                image: bloodSpriteImg,
                cropWidth: 40,
                width: 40 //to change to standing width
            }
        }

        this.currentSprite = this.sprites.run.image
        this.currentCropWidth = 40
    }

    draw() {
        c.shadowBlur = 0

        c.drawImage(
            this.currentSprite,
            40 * this.frames,
            0,
            this.currentCropWidth,
            50,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }

    update() {
        this.frames++
        if (this.frames > 19) {
            this.frames = 0
        }

        this.draw()
    }
}

export default BloodSprite