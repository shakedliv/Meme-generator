'use strict'

var gImgs = [
    {
        id: 1,
        url: 'meme-imgs/meme-imgs(square)/1.jpg',
        keywords: ['Funny', 'politics'],
    },
    {
        id: 2,
        url: 'meme-imgs/meme-imgs(square)/2.jpg',
        keywords: ['dogs', 'cute'],
    },
    {
        id: 3,
        url: 'meme-imgs/meme-imgs(square)/3.jpg',
        keywords: ['dogs', 'cute', 'Babies'],
    },
    {
        id: 4,
        url: 'meme-imgs/meme-imgs(square)/4.jpg',
        keywords: ['Cats', 'cute'],
    },
    {
        id: 5,
        url: 'meme-imgs/meme-imgs(square)/5.jpg',
        keywords: ['Babies', 'Funny'],
    },
    {
        id: 6,
        url: 'meme-imgs/meme-imgs(square)/6.jpg',
        keywords: ['Funny', 'TV'],
    },
    {
        id: 7,
        url: 'meme-imgs/meme-imgs(square)/7.jpg',
        keywords: ['Babies', 'cute', 'Funny'],
    },
    {
        id: 8,
        url: 'meme-imgs/meme-imgs(square)/8.jpg',
        keywords: ['mysterious', 'Happy'],
    },
    {
        id: 9,
        url: 'meme-imgs/meme-imgs(square)/9.jpg',
        keywords: ['Babies', 'cute', 'Funny', 'Happy'],
    },
    {
        id: 10,
        url: 'meme-imgs/meme-imgs(square)/10.jpg',
        keywords: ['Funny', 'politics', 'Happy'],
    },
    {
        id: 11,
        url: 'meme-imgs/meme-imgs(square)/11.jpg',
        keywords: ['Funny', 'outrages'],
    },
    {
        id: 12,
        url: 'meme-imgs/meme-imgs(square)/12.jpg',
        keywords: ['TV'],
    },
    {
        id: 13,
        url: 'meme-imgs/meme-imgs(square)/13.jpg',
        keywords: ['Movie'],
    },
    {
        id: 14,
        url: 'meme-imgs/meme-imgs(square)/14.jpg',
        keywords: ['Movie', 'Serious'],
    },
    {
        id: 15,
        url: 'meme-imgs/meme-imgs(square)/15.jpg',
        keywords: ['Serious', 'TV'],
    },
    {
        id: 16,
        url: 'meme-imgs/meme-imgs(square)/16.jpg',
        keywords: ['Funny', 'awkward', 'TV'],
    },
    {
        id: 17,
        url: 'meme-imgs/meme-imgs(square)/17.jpg',
        keywords: ['politics', 'Serious'],
    },
    {
        id: 18,
        url: 'meme-imgs/meme-imgs(square)/18.jpg',
        keywords: ['Funny', 'outrages'],
    },
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 30,
            color: 'black',
            font: 'Arial'
        },
    ],
}

var gKeywordSearchCountMap = { Funny: 12, cat: 6, Babies: 4 }
// ------------------
// Data getters
// ------------------
function getMeme() {
    return gMeme
}

function getImages() {
    return gImgs
}

// returns an img obj by id
function findImg(imgId) {
    return gImgs.find((img) => img.id === imgId)
}

// ------------------
// setters
// ------------------
function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setLineTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}
function deleteCurrLine() {
   gMeme.lines[gMeme.selectedLineIdx].txt = ''
}

function setLocation(lineLocation) {
    gMeme.lines[gMeme.selectedLineIdx].txtLocation = lineLocation
}

function setSelectedLine(idx) {
    if (idx == null) return
    gMeme.selectedLineIdx = idx
}

// ------------------
// Line operations
// ------------------
function decreaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size--
}

function increaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size++
}

function addLine() {
    gMeme.lines.push({ txt: 'another text', size: 30, color: 'black' })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function switchLine() {
    if (gMeme.selectedLineIdx + 1 === gMeme.lines.length) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
}

function setTxtSize() {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.txtSize = line.txt.length * line.size // calc the txt size
}

function setLocation(lineLocation) {
    gMeme.lines[gMeme.selectedLineIdx].txtLocation = lineLocation
}

function alignLineLeft() {}
function alignLineInCenter() {}
function alignLineRight() {}

function setTxtLocation(currLine, width, hight) {
    currLine.startX = currLine.txtLocation.x - width / 2 - 10
    currLine.startY = currLine.txtLocation.y - currLine.size
    currLine.endX = currLine.startX + width + 20
    currLine.endY = currLine.startY + hight
}

function selectLine(clickedPos) {
    // clickedPos{x: y:}
    const foundLine = gMeme.lines.find((line, index) => {
       if (
          line.startX <= clickedPos.x &&
          clickedPos.x <= line.endX &&
          line.startY <= clickedPos.y &&
          clickedPos.y <= line.endY
       ) {
          gMeme.selectedLineIdx = index
          console.log('index:', index)
          console.log('line:', line)
          return line
       }
    })
    return foundLine
}

function moveUp() {
   const currLine = gMeme.lines[gMeme.selectedLineIdx]
   if (currLine.txt = '') return
   currLine.startY--
   currLine.endY--
}
function moveDown() {
   const currLine = gMeme.lines[gMeme.selectedLineIdx]
   if (currLine.txt = '') return
   currLine.startY++
   currLine.endY++
}


function clearMeme() {
   gMeme.selectedLineIdx = 0
   gMeme.lines = [
        {
            txt: '',
            size: 30,
            color: 'black',
            font: 'Arial'
        },
   ]
   renderTxtBox()
   renderFontFamily()
}
