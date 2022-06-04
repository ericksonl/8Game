const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1850
canvas.height = 900

class GenericObject {
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
        c.shadowBlur = 0
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

export default GenericObject