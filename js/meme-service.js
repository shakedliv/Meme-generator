'use strict'

var gImgs = [
    {
        id: 1,
        url: 'meme-imgs/meme-imgs(square)/1.jpg',
        keywords: ['funny', 'politics'],
    },
    {
        id: 2,
        url: 'meme-imgs/meme-imgs(square)/2.jpg',
        keywords: ['dogs', 'cute'],
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
        },
    ],
}

var gKeywordSearchCountMap = { funny: 12, cat: 6, baby: 2 }

function getMeme() {
    return gMeme
}
function getImages() {
    return gImgs
}
// returns an img obj in a specified id
function findImg(imgId) {
    return gImgs.find((img) => img.id === imgId)
}

function setImg(imgId) {
   gMeme.selectedImgId = imgId
}

function setLineTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function setColor(color) {
   gMeme.lines[gMeme.selectedLineIdx].color = color
}

function decreaseFontSize() {
   gMeme.lines[gMeme.selectedLineIdx].size--
}
function increaseFontSize() {
   gMeme.lines[gMeme.selectedLineIdx].size++
}