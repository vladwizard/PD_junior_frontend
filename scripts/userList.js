import { getCoockieFavoritePhotos } from "./coockie.js";
import createThumbnailPhoto from "./thumbnailPhoto.js";

const errorBlock = `
<div class="flexRow" style="align-items: center;">
    <img src="/images/error.png">
    <div class="flexColumn">
        <h6 class="flexRow">Сервер не отвечает</h6>
        <p class="flexRow">Уже работаем над этим</p>
    </div>
</div>`

export default function createUserList(parent) {
    let users = fetch('https://json.medrating.org/users/').then((response) => {
        return response.json();
    })
    parent.append(createLoadCicle())
    parent.className = 'flexCenter'

    users.then((data) => {
        parent.className = 'userList'
        parent.innerHTML = ''

        data.forEach(user => {
            let newLine = createDropOutLine(user.name, 'h1', 'https://json.medrating.org/albums?userId=' + user.id,

                (data, parent) => data.forEach(album => {
                    parent.append(createDropOutLine(album.title, 'h2', 'https://json.medrating.org/photos?albumId=' + album.id,

                        (data, parent) => {
                            parent.className = 'thumbnailPhotoArea'

                            let favoriteids = getCoockieFavoritePhotos().map((photo) => { return photo.id })
                            data.forEach(photoData => {
                                let photoEl = createThumbnailPhoto(photoData, favoriteids.includes(photoData.id))
                                parent.append(photoEl)
                                photoEl.title = photoData.title
                            })
                        }

                    ))
                })

            );
            parent.append(newLine)
        })

    })

    users.catch(() => {
        parent.innerHTML = errorBlock
    })
}

function createDropOutLine(innerText, tagText, requestUrl, generateContent) {
    let container = document.createElement('div')
    container.className = "flexColumn dropOutLine"

    let textLine = document.createElement('div')
    container.append(textLine)
    textLine.className = 'dropOutLineContent'

    let marker = document.createElement('img')
    marker.className = 'marker'
    marker.src = './images/openMarker.svg'
    textLine.append(marker);

    let text = document.createElement(tagText)
    text.innerText = innerText
    textLine.append(text)

    marker.onclick = () => {
        if (container.childElementCount == 1) {
            marker.src = './images/closeMarker.svg'

            let dropped = document.createElement('div')
            container.append(dropped)
            dropped.className = 'dropped flexCenter'
            dropped.append(createLoadCicle())

            let albums = fetch(requestUrl).then((response) => {
                return response.json();
            })

            albums.then(data => {
                dropped.className = 'dropped'
                dropped.innerHTML = ''

                generateContent(data, dropped)
            })

            albums.catch(() => {
                dropped.innerHTML = errorBlock
            })
        }
        else {
            marker.src = './images/openMarker.svg'
            for (let i = 1; i < container.childElementCount; i++)
                container.children[i].remove()
        }
    }
    return container
}
function createLoadCicle() {
    let cicle = document.createElement('img')
    cicle.className = 'loadCicle'
    cicle.src = './images/ezgif-6-72ed6200d8f7.gif'
    return cicle
}
function asd() {
    return new Promise((resolve, reject) => { return reject() })
}