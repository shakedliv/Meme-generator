'use strict'
let gElCanvas
let gCtx

//rendering functions

function renderMeme(isDownload = false) {
    const meme = getMeme()
    const memeImg = findImg(meme.selectedImgId)
    const elImg = new Image()
    elImg.src = memeImg.url

    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach((line, idx) => {
            drawText(line, idx, line.font)
        })

        if (!isDownload) renderFrame()
    }
}

function drawText(line, idx, font) {
    const text = line.txt
    gCtx.beginPath()
    gCtx.lineWidth = 0.5
    gCtx.strokeStyle = 'white'
    gCtx.fillStyle = line.color
    // ensure font is valid; default to Arial if not provided
    const fontFamily = font || 'Arial'
    gCtx.font = line.size + 'px ' + fontFamily
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    alignLine(text, idx, line)
}

function alignLine(text, idx, line) {
    // preserve existing txtLocation and only update x coordinate
    if (!line.txtLocation) line.txtLocation = {}

    // determine alignment for this line (use line.alignment property)
    const alignment = line.alignment || 'center'

    if (alignment === 'left') {
        line.txtLocation.x = gElCanvas.width / 6
    } else if (alignment === 'right') {
        line.txtLocation.x = gElCanvas.width - gElCanvas.width / 6
    } else {
        // default to center
        line.txtLocation.x = gElCanvas.width / 2
    }

    // set y based on line index (this part should always run)
    // only set default y if it wasn't set manually (e.g., by moveUp/moveDown)
    if (line.txtLocation.y == null) {
        switch (idx) {
            case 0:
                line.txtLocation.y = gElCanvas.height / 6
                break
            case 1:
                line.txtLocation.y = gElCanvas.height - gElCanvas.height / 6
                break
            default:
                line.txtLocation.y = gElCanvas.height / 2
        }
    }

    // draw the text at the determined location
    gCtx.fillText(text, line.txtLocation.x, line.txtLocation.y)
    gCtx.strokeText(text, line.txtLocation.x, line.txtLocation.y)
    setTxtSize()
}

function renderFrame() {
    const meme = getMeme()
    const currLine = meme.lines[meme.selectedLineIdx]
    if (!currLine.txt) return
    gCtx.beginPath()
    gCtx.strokeStyle = 'red'
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

function onMoveUp() {
    moveUp()
    renderMeme()
}
function onMoveDown() {
    moveDown()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderTxtBox()
    renderMeme()
}

function changeFont(font) {
    console.log('font:', font)
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function onLeftAlignment() {
    setLineAlignment('left')
    renderMeme()
}

function onCenterAlignment() {
    setLineAlignment('center')
    renderMeme()
}

function onRightAlignment() {
    setLineAlignment('right')
    renderMeme()
}



function onDownloadCanvas(elLink) {
   renderMeme(true)
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

function onChangeFont(value) {
    changeFont(value)
    renderMeme()
}

function onAddLine() {
    addLine()
    const elTextInput = document.querySelector('#text-input')
    elTextInput.value = ''
    renderMeme()
}

// function saveMeme() {
//    const canvasData = gElCanvas.toDataURL('image/jpeg')
//    saveToStorage('images',canvasData)
// }

// function showSavedMemes() {
//    console.log(':', loadFromStorage('images'))
// }

function onShareImg(ev) {
    ev.preventDefault()
    const canvasData = gElCanvas.toDataURL('image/jpeg')

    // After a succesful upload, allow the user to share on Facebook
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log('encodedUploadedImgUrl:', encodedUploadedImgUrl)
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`
        )
    }
    uploadImg(canvasData, onSuccess)
}

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

function renderFontFamily() {
    const meme = getMeme()
    const elFontFamily = document.querySelector('#fontSelect')
    elFontFamily.value = meme.lines[meme.selectedLineIdx].font
}

function renderTxtBox() {
    const meme = getMeme()
    const elTextInput = document.querySelector('#text-input')
    elTextInput.value = meme.lines[meme.selectedLineIdx].txt
}
