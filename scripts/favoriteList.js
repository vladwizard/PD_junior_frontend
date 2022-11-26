import { GetCoockieFavoritePhotos } from "./coockie.js";
import CreateThumbnailPhoto from "./thumbnailPhoto.js";

const errorBlock = `
<div class="flexRow" style="align-items: center;">
    <img src="/images/error.png">
    <div class="flexColumn">
        <h6 class="flexRow">Сервер не отвечает</h6>
        <p class="flexRow">Уже работаем над этим</p>
    </div>
</div>`

export default function CreateFavoritesList(parent) {


    let photos = GetCoockieFavoritePhotos()

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
            cellPhoto.append(CreateThumbnailPhoto(photo, true))
            cellPhoto.querySelector('.favoriteButton').addEventListener('click', () => cellPhoto.remove())

            let title = document.createElement('p')
            title.innerText = photo.title
            title.className = 'titleThumbilPhoto'
            cellPhoto.append(title)
        })
    }  
}