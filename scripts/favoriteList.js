import { getCoockieFavoritePhotos } from "./coockie.js";
import createPhotosBlock from "./PhotosArea.js";

export default function createFavoritesList() {

    let photos = getCoockieFavoritePhotos()

    if (photos.length == 0) {
        return createEmptyBlock()
    }
    else {
        return createPhotosBlock(photos)
    }
}
function createEmptyBlock(){
    let a = document.createElement('div')
    a.innerHTML = `
    <div class="favoritesListEmty flexColumn">
        <img src="./images//empty.png">
        <h6>Список избранного пуст</h6>
        <p>Добавляйте изображения, нажимая на звёздочку</p>
    </div>
    `
    return a
}