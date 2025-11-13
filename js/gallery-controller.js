'use strict'
function onInit() {
   renderGallery()
   
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