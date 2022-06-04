//pictures
import back from "./picsJs/back.js"

//classes
import GenericObject from "../../GlobalAssets/js/genericObject.js"

//functions
import { createImage } from "../../GlobalAssets/js/createImage.js"
import { playBack } from "./audio.js"

const canvas = document.querySelector('canvas')

var myFont = new FontFace('WhoAsksSatan', 'url(../GlobalAssets/fonts/WhoAsksSatan.ttf)')

myFont.load().then(function (font) {

    document.fonts.add(font)

    const c = canvas.getContext('2d')

    canvas.width = 1850
    canvas.height = 900

    //background music
    playBack()

    let alpha = 700
    let genericObjects = []
    let pContinue = false
    let topText = "Press 'e' to wake up"

    function init() {
        genericObjects = [
            new GenericObject({
                x: 0,
                y: 0,

                image: createImage(back)
            })
        ]
    }
    init()

    function updateFill() {
        c.fillStyle = "rgba(0, 0, 0, " + alpha / 500 + ")"
    }

    function displayStatusText() {
        c.fillStyle = 'rgba(255, 255, 255, 0.75)';
        c.font = '100px WhoAsksSatan';
        c.fillText(topText, 925 - (c.measureText(topText).width / 2), 100);
    }

    function animate() {
        requestAnimationFrame(animate)
        //draw each genericObject
        genericObjects.forEach((genericObject) => {
            genericObject.draw()
        })

        if (alpha > 350 && pContinue == false) {
            alpha--
            // console.log(alpha)
        } else if (pContinue == true && alpha < 500) {
            alpha++
        } else if ( pContinue == true && alpha == 500) {
            //wait 1 second to continue to bedroom
            setTimeout(function () {
                location.href = '../bedroom'
            }, 1000);
        }

        updateFill()
        c.fillRect(0, 0, canvas.width, canvas.height)
        if (alpha == 350) {
            displayStatusText()
        }    
    }

    animate()

    window.addEventListener('keydown', ({ keyCode }) => {
        switch (keyCode) {
            case 69:
                if (alpha == 350) {
                    pContinue = true
                }
                break
        }
    })
})