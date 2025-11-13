'use strict'
let gElCanvas
let gCtx
let gIsLeft = false
let gIsRight = false
renderMeme()
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
    setLineInPlace(text, idx, line)
}
function setLineInPlace(text, idx, line) {
   line.txtLocation = {}
   if (gIsLeft) {
      line.txtLocation.x = gElCanvas.width / 6 
      console.log('left :', gElCanvas.width / 6 )
   }
   else if (gIsRight) {
      line.txtLocation.x = gElCanvas.width - gElCanvas.width / 6 
      console.log('right :', gElCanvas.width - gElCanvas.width / 6  )
      
   }
   else {
      line.txtLocation.x = gElCanvas.width / 2 
      console.log('center :', gElCanvas.width / 2 )
      
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
function onSetLineTxt(text) {
   setLineTxt(text)
    renderMeme()
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
    
            gCtx.strokeRect(
                currLine.txtLocation.x - (width / 2) - 10,
                currLine.txtLocation.y - currLine.size,
                width + 20,
                hight
            )
 
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
function changeFont(font) {
   console.log('font:', font)
   const elCanvas = document.querySelector('.canvas-container')
   elCanvas.style.fontFamily = font
}



// not working
function onPressLine(ev){
   const hit = isInLine(ev)
   console.log('isInLine:', hit)
   return hit
}

// not working
function isInLine(ev) {
   const meme = getMeme()
   const pos = getEvPos(ev) // {x:, y:}
   
   for (let i = 0; i < meme.lines.length; i++) {
      const currLine = meme.lines[i]
        if (!currLine.txt || !currLine.txtLocation) continue

        
        const width = gCtx.measureText(currLine.txt).width
        const height = currLine.size * 2

        const startX = currLine.txtLocation.x - width / 2 - 10
        const startY = currLine.txtLocation.y - currLine.size
        const endX = startX + width + 20 // include padding used when drawing the frame
        const endY = startY + height

        if (pos.x >= startX && pos.x <= endX && pos.y >= startY && pos.y <= endY) {
            // return the hit line and its index for further handling (dragging)
            console.log('{ line: currLine, idx: i }:', { line: currLine, idx: i }) 
        }
    }

    return null
   }
   // not working
   
   function getEvPos(ev) {
      const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

  let pos = {
     x: ev.offsetX,
    y: ev.offsetY,
  }
  
  if (TOUCH_EVS.includes(ev.type)) {
     // Prevent triggering the mouse ev
     ev.preventDefault()
     // Gets the first touch point
     ev = ev.changedTouches[0]
     // Calc the right pos according to the touch screen
     pos = {
        x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
        y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
   }
   console.log('pos:',pos )
   return pos
}

// function saveMeme() {
//    const canvasData = gElCanvas.toDataURL('image/jpeg')
//    saveToStorage('images',canvasData)
// }

// function showSavedMemes() {
//    console.log(':', loadFromStorage('images'))
   
// }



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