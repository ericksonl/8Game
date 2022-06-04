import { death } from "../../GlobalAssets/js/death.js"

export const startTime = new Date()
export let timer = " "
let miliSeconds = new Date() - startTime

//updates text for the timer and the seconds player has left to solve the puzzle
export function updateTimer(th) {
    miliSeconds = th - new Date()
    if (Math.floor(miliSeconds / 1000) > 0) {
        timer = "Time left: " + Math.floor(miliSeconds / 1000) + " seconds"
    }
    else if (Math.floor(miliSeconds / 1000) <= 0 && Math.floor(miliSeconds / 1000) >= -1) {
        timer = "Times up!"
    }
    else {
        death()
    }
}