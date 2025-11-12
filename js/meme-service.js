'use strict'

var gImgs = [{id: 1, url: 'meme-imgs/meme-imgs(square)/1.jpg', keywords: ['funny', 'politics']}]

var gMeme = {
 selectedImgId: 1,
 selectedLineIdx: 0,
 lines: [
 {
 txt:'enter text here',
 size: 20,
 color: 'red'
 }
 ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 6, 'baby': 2 }

function getMeme() {
   return gMeme
}

// returns an img obj in a specified id
function findImg(imgId) {
   return gImgs.find(img => img.id === imgId)
}


function setLineTxt(text){
gMeme.lines[gMeme.selectedLineIdx].txt = text
}