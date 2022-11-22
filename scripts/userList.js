import { GetCoockieFavoritePhotos } from "./coockie.js";
import CreateThumbnailPhoto from "./thumbnailPhoto.js";

export default function CreateUserList(parent) {
    let users = fetch('https://json.medrating.org/users/').then((response) => {
        return response.json();
    })
    parent.append(CreateLoadCicle())
    parent.className = 'flexCenter'

    users.then((data) => {
        parent.className = ''
        parent.innerHTML = ''
        parent.style = 'padding: 16px 0'

        data.forEach(user => {
            let newLine = CreateDropOutLine(user.name, 'h1', 'https://json.medrating.org/albums?userId=' + user.id, (data, parent) => data.forEach(album => {
                parent.append(CreateDropOutLine(album.title, 'h2', 'https://json.medrating.org/photos?albumId=' + album.id,
                    (data, parent) => {
                        parent.className = 'thumbnailPhotoArea'
                        let favoriteids = GetCoockieFavoritePhotos().map((photo) => { return photo.id })
                        data.forEach(photoData => {
                            let photoEl = CreateThumbnailPhoto(photoData, favoriteids.includes(photoData.id))
                            parent.append(photoEl)
                            photoEl.title = photoData.title
                        })
                    }))
            }
            ));

            parent.append(newLine)
        })
    }, error => {
        parent.innerHTML = errorBlock
    }
    );
}

function CreateDropOutLine(innerText, tagText, requestUrl, GenerateContent) {
    let container = document.createElement('div')
    container.className = "flexColumn"

    let textLine = document.createElement('div')
    container.append(textLine)
    textLine.className = 'dropOutLine'

    let marker = document.createElement('img')
    marker.className = 'marker'
    marker.src = './images/openMarker.svg'
    textLine.append(marker);

    let text = document.createElement(tagText)
    text.innerText = innerText
    textLine.append(text)

    textLine.onclick = () => {
        if (container.childElementCount == 1) {
            marker.src = './images/closeMarker.svg'

            let dropped = document.createElement('div')
            container.append(dropped)
            dropped.className = 'dropped flexCenter'
            dropped.append(CreateLoadCicle())
            let albums = fetch(requestUrl).then((response) => {
                return response.json();
            })

            albums.then(data => {
                dropped.className = 'dropped'
                dropped.innerHTML = ''

                GenerateContent(data, dropped)
            }
                , error => {
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
function CreateLoadCicle() {
    let cicle = document.createElement('img')
    cicle.className = 'loadCicle'
    cicle.src = './images/ezgif-6-72ed6200d8f7.gif'
    return cicle
}