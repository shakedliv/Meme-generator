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
    },{
        id: 3,
        url: 'meme-imgs/meme-imgs(square)/3.jpg',
        keywords: ['dogs', 'cute', 'Babies'],
    },{
        id: 4,
        url: 'meme-imgs/meme-imgs(square)/4.jpg',
        keywords: ['Cats', 'cute'],
    },{
        id: 5,
        url: 'meme-imgs/meme-imgs(square)/5.jpg',
        keywords: ['Babies', 'Funny'],
    },{
        id: 6,
        url: 'meme-imgs/meme-imgs(square)/6.jpg',
        keywords: ['Funny', 'TV'],
    },{
        id: 7,
        url: 'meme-imgs/meme-imgs(square)/7.jpg',
        keywords: ['Babies', 'cute', 'Funny'],
    },{
        id: 8,
        url: 'meme-imgs/meme-imgs(square)/8.jpg',
        keywords: ['mysterious','Happy'],
    },{
        id: 9,
        url: 'meme-imgs/meme-imgs(square)/9.jpg',
        keywords: ['Babies', 'cute', 'Funny','Happy'],
    },{
        id: 10,
        url: 'meme-imgs/meme-imgs(square)/10.jpg',
        keywords: ['Funny', 'politics' , 'Happy'],
    },{
        id: 11,
        url: 'meme-imgs/meme-imgs(square)/11.jpg',
        keywords: ['Funny', 'outrages'],
    },{
        id: 12,
        url: 'meme-imgs/meme-imgs(square)/12.jpg',
        keywords: ['TV'],
    },{
        id: 13,
        url: 'meme-imgs/meme-imgs(square)/13.jpg',
        keywords: ['Movie'],
    },{
        id: 14,
        url: 'meme-imgs/meme-imgs(square)/14.jpg',
        keywords: ['Movie', 'Serious'],
    },{
        id: 15,
        url: 'meme-imgs/meme-imgs(square)/15.jpg',
        keywords: ['Serious', 'TV'],
    },{
        id: 16,
        url: 'meme-imgs/meme-imgs(square)/16.jpg',
        keywords: ['Funny', 'awkward', 'TV'],
    },{
        id: 17,
        url: 'meme-imgs/meme-imgs(square)/17.jpg',
        keywords: ['politics', 'Serious'],
    },{
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
        },
    ],
}

var gKeywordSearchCountMap = { Funny: 12, cat: 6, Babies: 4 }

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
    renderMeme()
}
function increaseFontSize() {
   gMeme.lines[gMeme.selectedLineIdx].size++
   renderMeme()
}
function addLine() {
    gMeme.lines.push({ txt: 'another text', size: 30, color: 'black' })
    gMeme.selectedLineIdx++
}

function switchLine() {
    if (gMeme.selectedLineIdx + 1 === gMeme.lines.length)
        gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
}

function setTxtSize() {
    gMeme.lines[gMeme.selectedLineIdx].txtSize =
        gMeme.lines[gMeme.selectedLineIdx].txt.length *
        gMeme.lines[gMeme.selectedLineIdx].size // calc the txt size
}

function setLocation(lineLocation) {
    gMeme.lines[gMeme.selectedLineIdx].txtLocation = lineLocation
}
