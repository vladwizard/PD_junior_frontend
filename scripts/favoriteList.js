import { GetCoockieFavoritePhotos } from "./coockie.js";
import CreateThumbnailPhoto from "./thumbnailPhoto.js";

export default function CreateFavoritesList(parent) {
    let container = document.createElement('div')

    let photos = GetCoockieFavoritePhotos()

    if (photos.length == 0) {
        parent.className = 'flexCenter'
        container.className = 'favoritesListEmty flexColumn'
        container.innerHTML = `
        <img src="./images//empty.png">
        <h6>Список избранного пуст</h6>
        <p>Добавляйте изображения, нажимая на звёздочку</p>
        `
    }
    else {
        parent.style = 'padding-top: 48px'
        container.className = 'thumbnailPhotoArea'

        photos.forEach(photo => {
            let cellPhoto = document.createElement('div')
            container.append(cellPhoto)
            cellPhoto.append(CreateThumbnailPhoto(photo, true))
            cellPhoto.querySelector('.favoriteButton').addEventListener('click', () => cellPhoto.remove())
            let title = document.createElement('p')
            title.innerText = photo.title
            title.className = 'titleThumbilPhoto'
            cellPhoto.append(title)
        })
    }
    parent.append(container)

}