import { getCoockieFavoritePhotos } from "/scripts/coockie.js";

import { createThumbnailPhoto } from "../photos/photos.js";

export default function createFavoritesList() {

  let photos = getCoockieFavoritePhotos()

  if (photos.length == 0) {
    return createEmptyBlock()
  }
  else {
    let container = document.createElement('div')
    container.className = 'thumbnailPhotoArea'

    photos.forEach(photoData => {
      let cell = document.createElement('div')
      let photoEl = createThumbnailPhoto(photoData, true)
      photoEl.querySelector('.favoriteButton').addEventListener('click', () => photoEl.remove())
      cell.append(photoEl)
      container.append(cell)
      cell.className = 'cell'
      cell.insertAdjacentHTML('beforeend', `<p>${photoData.title}</p>`)

    })
    return container
  }
}
function createEmptyBlock() {
  let div = document.createElement('div')
  div.innerHTML = `
    <div class="favoritesListEmty flexColumn">
        <img src="./images//empty.png">
        <h6>Список избранного пуст</h6>
        <p>Добавляйте изображения, нажимая на звёздочку</p>
    </div>
    `
  return div
}