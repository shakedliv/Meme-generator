'use strict'
let gElCanvas
let gCtx
renderMeme()
function renderMeme() {
    if (gCtx) onClearCanvas()
    const currMeme = getMeme()
    const memeImg = findImg(currMeme.selectedImgId)
    const elImg = new Image()
    elImg.src = memeImg.url

    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(currMeme.lines[currMeme.selectedLineIdx].txt)
    }
}
function drawText(text) {
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'black'
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, gElCanvas.width / 2, gElCanvas.height / 6)
    gCtx.strokeText(text, gElCanvas.width / 2, gElCanvas.height / 6)
}

function onSetLineTxt(text) {
    setLineTxt(text)
    renderMeme()
}

function onClearCanvas() {
    console.log('cleaned')
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}
