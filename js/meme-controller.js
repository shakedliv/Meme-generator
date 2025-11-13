'use strict'
let gElCanvas
let gCtx
renderMeme()
function renderMeme() {
    //  if (gCtx) onClearCanvas()
    const meme = getMeme()
    const memeImg = findImg(meme.selectedImgId)
    const elImg = new Image()
    elImg.src = memeImg.url

    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach((line, idx) => {
            drawText(line, idx)
         })
         renderFrame()
   }
   console.log('meme:', meme.lines[meme.selectedLineIdx])
}
function drawText(line, idx) {
    const text = line.txt
    gCtx.beginPath()
    gCtx.lineWidth = 0.5
    gCtx.strokeStyle = 'white'
    gCtx.fillStyle = line.color
    gCtx.font = line.size + 'px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    setLineInPlace(text, idx, line)
}
function setLineInPlace(text, idx, line) {
    let lineLocation = {}
    lineLocation.x = gElCanvas.width / 2
    switch (idx) {
        case 0:
            lineLocation.y = gElCanvas.height / 6
            line.txtLocation = lineLocation
            gCtx.fillText(text, lineLocation.x, lineLocation.y)
            gCtx.strokeText(text, lineLocation.x, lineLocation.y)
            break
        case 1:
            lineLocation.y = gElCanvas.height - gElCanvas.height / 6
            line.txtLocation = lineLocation

            gCtx.fillText(text, lineLocation.x, lineLocation.y)
            gCtx.strokeText(text, lineLocation.x, lineLocation.y)
            break
        default:
            lineLocation.y = gElCanvas.height / 2
            line.txtLocation = lineLocation

            gCtx.fillText(text, lineLocation.x, lineLocation.y)
            gCtx.strokeText(text, lineLocation.x, lineLocation.y)
    }
   setTxtSize()
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
    switchLine()
    const meme = getMeme()
    const elTextInput = document.querySelector('#text-input')
    elTextInput.value = meme.lines[meme.selectedLineIdx].txt
    renderMeme()
}

function renderFrame() {
   const meme = getMeme()
   const currLine = meme.lines[meme.selectedLineIdx]
   if(!currLine.txt) return
    gCtx.beginPath()
   gCtx.strokeStyle = 'yellow'
   const width = gCtx.measureText(currLine.txt).width 
   const hight = currLine.size * 2
   console.log('width: :', width )
    
            gCtx.strokeRect(
                currLine.txtLocation.x - (width / 2) - 10,
                currLine.txtLocation.y - currLine.size,
                width + 20,
                hight
            )
 
}
