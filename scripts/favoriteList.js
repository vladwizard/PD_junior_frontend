import { getCoockieFavoritePhotos } from "./coockie.js";
import createThumbnailPhoto from "./thumbnailPhoto.js";

export default function createFavoritesList(parent) {

    let photos = getCoockieFavoritePhotos()

    if (photos.length == 0) {
        let a= Date.now();
        let element = document.querySelector('#favoritesListEmty').content.cloneNode(true);
        parent.append(element);
        console.log(Date.now()-a);
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