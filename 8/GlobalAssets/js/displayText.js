function displayNPCText(context, text1, text2, text3, text4) {
    context.fillStyle = 'rgba(0, 0, 0, 1)'
    context.shadowBlur = 10
    context.shadowColor = "rgba(0, 0, 0, 0.5)"
    context.font = '80px Georgia'
    context.fillText(text1, 925 - (context.measureText(text1).width / 2), 100)
    context.fillText(text2, 925 - (context.measureText(text2).width / 2), 185)
    context.fillText(text3, 925 - (context.measureText(text3).width / 2), 270);
    context.fillText(text4, 925 - (context.measureText(text4).width / 2), 355);
}

export function updateNPCText(context, text1, text2, text3, text4) {
    if (text1 == undefined) { text1 = '' }
    if (text2 == undefined) { text2 = '' }
    if (text3 == undefined) { text3 = '' }
    if (text4 == undefined) { text4 = '' }
    displayNPCText(context, text1, text2, text3, text4)
}

function displayStatusText(context, text1, text2, text3, text4) {
    context.fillStyle = 'rgba(0, 0, 0, 1)'
    context.shadowBlur = 10
    context.shadowColor = "rgba(255, 255, 255, 0.5)"
    context.font = '100px WhoAsksSatan'
    context.fillText(text1, 925 - (context.measureText(text1).width / 2), 100)
    context.fillText(text2, 925 - (context.measureText(text2).width / 2), 185)
    context.fillText(text3, 925 - (context.measureText(text3).width / 2), 270);
    context.fillText(text4, 925 - (context.measureText(text4).width / 2), 355);
}

export function updateText(context, text1, text2, text3, text4) {
    if (text1 == undefined) { text1 = '' }
    if (text2 == undefined) { text2 = '' }
    if (text3 == undefined) { text3 = '' }
    if (text4 == undefined) { text4 = '' }
    displayStatusText(context, text1, text2, text3, text4)
}


