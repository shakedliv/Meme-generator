'use strict'
let gElCanvas
let gCtx
let gLineCounter
renderMeme()
function renderMeme() {
    gLineCounter = 0
    //  if (gCtx) onClearCanvas()
    const meme = getMeme()
    const memeImg = findImg(meme.selectedImgId)
    const elImg = new Image()
    elImg.src = memeImg.url

    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach((line) => {
            drawText(line)
        })
    }
    renderFrame(meme)
}
function drawText(line) {
    const text = line.txt
    gCtx.beginPath()
    gCtx.lineWidth = 0.5
    gCtx.strokeStyle = 'white'
    gCtx.fillStyle = line.color
    gCtx.font = line.size + 'px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    setLineInPlace(text, line)
}
function setLineInPlace(text, line) {
    switch (gLineCounter) {
        case 0:
            gCtx.fillText(text, gElCanvas.width / 2, gElCanvas.height / 6)
            gCtx.strokeText(text, gElCanvas.width / 2, gElCanvas.height / 6)
            gLineCounter++
            break
        case 1:
            gCtx.fillText(
                text,
                gElCanvas.width / 2,
                gElCanvas.height - gElCanvas.height / 6
            )
            gCtx.strokeText(
                text,
                gElCanvas.width / 2,
                gElCanvas.height - gElCanvas.height / 6
            )
            gLineCounter++
            break
        default:
            gCtx.fillText(text, gElCanvas.width / 2, gElCanvas.height / 2)
            gCtx.strokeText(text, gElCanvas.width / 2, gElCanvas.height / 2)
    }
}

function onSetLineTxt(text) {
    setLineTxt(text)
    renderMeme()
}

function onClearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function onDownloadCanvas(elLink) {
    const elCanvas = gElCanvas.toDataURL('image/jpeg')
    elLink.href = elCanvas
}

function onSetColor(color) {
    setColor(color)
    renderMeme()
}
function onIncrease() {
    increaseFontSize()
    renderMeme()
}
function onDecrease() {
    decreaseFontSize()
    renderMeme()
}
function onAddLine() {
    const elTextInput = document.querySelector('#text-input')
    elTextInput.value = ''
    addLine()
    console.log('here')
    renderMeme()
}

function onSwitchLine() {
    const meme = getMeme()
    switchLine()
    const elTextInput = document.querySelector('#text-input')
    elTextInput.value = meme.lines[meme.selectedLineIdx].txt
}

function renderFrame(meme) {
    gCtx.beginPath()
    gCtx.strokeStyle = 'yellow'
    switch (meme.selectedLineIdx) {
        case 0:
            gCtx.strokeRect(
                gElCanvas.width / 2 - 20,
                gElCanvas.height / 6 + 20,
                120,
                meme.lines[meme.selectedLineIdx].size + 10
            )
            break

        default:
            gCtx.strokeRect(
                gElCanvas.width / 2 - 20,
                gElCanvas.height / 6 + 20,
                120,
                meme.lines[meme.selectedLineIdx].size + 10
            )

            break
    }
}
