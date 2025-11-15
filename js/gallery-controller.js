'use strict'
function onInit() {
    renderGallery()
   renderMeme()
   renderKeyword()
}
function renderGallery(FilteredImgs = null) {
    const elGallery = document.querySelector('.gallery')
    const imagesArray = FilteredImgs || getImages() // [{},{}]
    let strHtml = imagesArray.map(
        (img) =>
            `<img
                class="meme-img"
                id="${img.id}"
                src=${img.url}
                alt=""
                onclick="onImgSelect(${img.id})"
            />`
    )
    if (strHtml.length === 0) {
        strHtml = '<h1>No memes found!</h1>'
        elGallery.innerHTML = strHtml
    } else {
        elGallery.innerHTML = strHtml.join('')
    }
}

function onImgSelect(imgId) {
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.add('hidden')
    const elEditor = document.querySelector('.editor')
   elEditor.classList.remove('hidden')
    const elSearch = document.querySelector('.search-meme')
    elSearch.classList.add('hidden')
    setImg(imgId)
    renderMeme()
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

function openGallery() {
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.remove('hidden')
    const elEditor = document.querySelector('.editor')
    elEditor.classList.add('hidden')
    const elAbout = document.querySelector('.about')
   elAbout.classList.add('hidden')
   const elSearch = document.querySelector('.search-meme')
    elSearch.classList.remove('hidden')
    onClearCanvas()
    clearMeme()
}
function showAbout() {
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.add('hidden')
    const elEditor = document.querySelector('.editor')
    elEditor.classList.add('hidden')
    const elAbout = document.querySelector('.about')
   elAbout.classList.remove('hidden')
   const elSearch = document.querySelector('.search-meme')
    elSearch.classList.add('hidden')
    renderMeme()
}

function filterByKeyword(searchStr) {
    const imgs = getImages()

    const FilteredImgs = imgs.filter((img) =>
        img.keywords.some((keyword) =>
            keyword.toLowerCase().includes(searchStr.toLowerCase())
        )
    )
    renderGallery(FilteredImgs)
}

function renderKeyword() {
   const keyWordObj = getGKeywords() // {funny:3, TV:2}
   let keywords = document.querySelectorAll('.keyword')
   console.log('keywords:', keywords)
   keywords.forEach(keyword => {
      console.log('keyWordObj[keyword.value]:', keyWordObj[keyword.value])
      keyword.style.fontSize = keyWordObj[keyword.value] + 'px'
   });
}


function increaseKeyword(val) {
   document.querySelector('.search-meme-input').value = val
   filterByKeyword(val)
   increaseKeywordValue(val)
   renderKeyword()
}