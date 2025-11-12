'use strict'
renderGallery()
function renderGallery() {
   const elGallery = document.querySelector('.gallery')
   console.log('elGallery:', elGallery)
   const imagesArray = getImages() // [{},{}]
   let strHtml = imagesArray.map(img => {
      `<img
                class="meme-img"
                id="${img.id}"
                src=${img.url}
                alt=""
                onclick="renderMeme()"
            />`})
   console.log('strHtml:', strHtml)
   elGallery.innerHTML = strHtml.join('')
}