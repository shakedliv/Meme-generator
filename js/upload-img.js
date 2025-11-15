function onImgInput(ev) {
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.add('hidden')
    const elEditor = document.querySelector('.editor')
    elEditor.classList.remove('hidden')
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = function (event) {
        const img = new Image()
        img.onload = () => {
            onImageReady(img)
        }
        img.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
   gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
   setUserImg(img.src)
}
