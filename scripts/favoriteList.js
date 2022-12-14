import { getCoockieFavoritePhotos } from "./coockie.js";
import createThumbnailPhoto from "./thumbnailPhoto.js";

export default function createFavoritesList(parent) {

    let photos = getCoockieFavoritePhotos()

    if (photos.length == 0) {
        parent.innerHTML = `
        <div class="favoritesListEmty flexColumn">
            <img src="./images//empty.png">
            <h6>Список избранного пуст</h6>
            <p>Добавляйте изображения, нажимая на звёздочку</p>
        </div>
        `
    }
    else {
        let container = document.createElement('div')
        parent.append(container)
        parent.className = 'favoriteList'
        container.className = 'thumbnailPhotoArea'

        photos.forEach(photo => {
            let cellPhoto = document.createElement('div')
            container.append(cellPhoto)
            cellPhoto.append(createThumbnailPhoto(photo, true))
            cellPhoto.querySelector('.favoriteButton').addEventListener('click', () => cellPhoto.remove())

            let title = document.createElement('p')
            title.innerText = photo.title
            title.className = 'titleThumbilPhoto'
            cellPhoto.append(title)
        })
    }
}