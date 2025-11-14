'use strict'
let gElCanvas
let gCtx
let gIsLeft = false
let gIsRight = false

//rendering functions

function renderMeme() {
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
    alignLine(text, idx, line)
}

function renderTxtBox() {
    const meme = getMeme()
    const elTextInput = document.querySelector('#text-input')
    elTextInput.value = meme.lines[meme.selectedLineIdx].txt
}

function renderFrame() {
    const meme = getMeme()
    const currLine = meme.lines[meme.selectedLineIdx]
    if (!currLine.txt) return
    gCtx.beginPath()
    gCtx.strokeStyle = 'yellow'
    const width = gCtx.measureText(currLine.txt).width
    const hight = currLine.size * 2

    gCtx.strokeRect(
        currLine.txtLocation.x - width / 2 - 10,
        currLine.txtLocation.y - currLine.size,
        width + 20,
        hight
    )
    setTxtLocation(currLine, width, hight)
}


// operation buttons:

function onDeleteLine() {
   deleteCurrLine()
   renderTxtBox()
   renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderTxtBox()
    renderMeme()
}

function changeFont(font) {
    console.log('font:', font)
    const elCanvas = document.querySelector('.canvas-container')
    elCanvas.style.fontFamily = font
}

function onLeftAlignment() {
    gIsRight = false
    gIsLeft = true
    renderMeme()
}

function onCenterAlignment() {
    gIsRight = false
    gIsLeft = false
    renderMeme()
}

function onRightAlignment() {
    gIsRight = true
    gIsLeft = false
    renderMeme()
}

//problem: align all the line and not just selected
// also need to set the line in the correct place after with setTxtLocation(currLine, width, hight)
// separate to smaller functions
function alignLine(text, idx, line) {
    line.txtLocation = {}
    if (gIsLeft) {
        line.txtLocation.x = gElCanvas.width / 6
        console.log('left :', gElCanvas.width / 6)
    } else if (gIsRight) {
        line.txtLocation.x = gElCanvas.width - gElCanvas.width / 6
        console.log('right :', gElCanvas.width - gElCanvas.width / 6)
    } else {
        line.txtLocation.x = gElCanvas.width / 2
        console.log('center :', gElCanvas.width / 2)
    }
    switch (idx) {
        case 0:
            line.txtLocation.y = gElCanvas.height / 6
            gCtx.fillText(text, line.txtLocation.x, line.txtLocation.y)
            gCtx.strokeText(text, line.txtLocation.x, line.txtLocation.y)
            break
        case 1:
            line.txtLocation.y = gElCanvas.height - gElCanvas.height / 6
            line.txtLocation = line.txtLocation

            gCtx.fillText(text, line.txtLocation.x, line.txtLocation.y)
            gCtx.strokeText(text, line.txtLocation.x, line.txtLocation.y)
            break
        default:
            line.txtLocation.y = gElCanvas.height / 2
            line.txtLocation = line.txtLocation

            gCtx.fillText(text, line.txtLocation.x, line.txtLocation.y)
            gCtx.strokeText(text, line.txtLocation.x, line.txtLocation.y)
    }
    setTxtSize()
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
    
    addLine()
    renderMeme()
}

// function saveMeme() {
//    const canvasData = gElCanvas.toDataURL('image/jpeg')
//    saveToStorage('images',canvasData)
// }

// function showSavedMemes() {
//    console.log(':', loadFromStorage('images'))
// }




//service functions

function onCanvasClick(ev) {
    const line = selectLine(getEvPos(ev))
    // returns line clicked or undefined if didn't find, also sets line index
    if (!line) return
    renderMeme()
    renderTxtBox()
}

function getEvPos(ev) {
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

    // get canvas bounding rect to map client coordinates to internal canvas coords
    const rect = gElCanvas.getBoundingClientRect()

    let clientX, clientY
    if (ev.touches && ev.touches[0]) {
        clientX = ev.touches[0].clientX
        clientY = ev.touches[0].clientY
    } else if (ev.changedTouches && ev.changedTouches[0]) {
        clientX = ev.changedTouches[0].clientX
        clientY = ev.changedTouches[0].clientY
    } else {
        clientX = ev.clientX
        clientY = ev.clientY
    }

    // map client coordinates to canvas internal coordinate system
    // account for CSS scaling: canvas.width (internal) vs rect.width (displayed)
    const x = (clientX - rect.left) * (gElCanvas.width / rect.width)
    const y = (clientY - rect.top) * (gElCanvas.height / rect.height)

    const pos = { x, y }
    console.log('pos:', pos)
    return pos
}

function onSetLineTxt(text) {
    setLineTxt(text)
    renderMeme()
}

// not using
function onResize() {
    resizeCanvas()
    renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function onClearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}
