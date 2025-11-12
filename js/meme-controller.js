'use strict'
let gElCanvas
let gCtx
renderMeme()
function renderMeme() {
   const currImg = findImg(getMeme().selectedImgId)
   const elImg = new Image()
   elImg.src = currImg.url

    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    drawText('hello', gElCanvas.width / 2, gElCanvas.height / 6)
}

function drawText(text, x, y) {
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'black'
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}
