'use strict'
function onInit() {
   renderGallery()
  renderMeme()
   
}
function renderGallery() {
   const elGallery = document.querySelector('.gallery')
   const imagesArray = getImages() // [{},{}]
   let strHtml = imagesArray.map(img => 
      `<img
                class="meme-img"
                id="${img.id}"
                src=${img.url}
                alt=""
                onclick="onImgSelect(${img.id})"
            />`)
   elGallery.innerHTML = strHtml.join('')
}

function onImgSelect(imgId) {
   const elGallery = document.querySelector('.gallery')
   elGallery.classList.add('hidden')
   const elEditor = document.querySelector('.editor')
   elEditor.classList.remove('hidden')
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
   renderMeme()
}
