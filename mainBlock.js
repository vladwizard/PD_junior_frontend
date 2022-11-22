const filledStar = `
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M8.0868 1.04641C8.43933 0.256421 9.56067 0.25642 9.9132 1.0464L11.9048 5.50932L16.767 6.02193C17.628 6.1127 17.9746 7.1804 17.3311 7.75964L13.7 11.0284L14.7145 15.8063C14.8943 16.6527 13.9869 17.3124 13.2371 16.8805L9 14.4393L4.76287 16.8805C4.01306 17.3124 3.10573 16.6527 3.28547 15.8063L4.3 11.0284L0.668853 7.75964C0.0253845 7.1804 0.372042 6.1127 1.23305 6.02193L6.09524 5.50932L8.0868 1.04641Z"
        />
</svg>`

const wrapper = document.getElementById('mainBlock');
const sectionsButtons = wrapper.children[0].children;
const mainContainer = wrapper.children[1];

Array.from(sectionsButtons).forEach(
    (element, index) => { element.onclick = (() => СhooseSection(index)) }
)


const errorBlock = `
<div class="flexRow" style="align-items: center;">
    <img src="/images/error.png">
    <div class="flexColumn">
        <h6 class="flexRow">Сервер не отвечает</h6>
        <p class="flexRow">Уже работаем над этим</p>
    </div>
</div>`

let lastSectionIndex = 0
СhooseSection(lastSectionIndex);

function СhooseSection(index) {
    Array.from(sectionsButtons)[lastSectionIndex].className = ''
    lastSectionIndex = index

    sectionsButtons[index].className = 'active'

    mainContainer.style = ''
    mainContainer.className = ''
    mainContainer.innerHTML = ''

    switch (index) {
        case 0:
            CreateUserList(mainContainer)
            break;
        case 1:
            CreateFavoritesList(mainContainer)
            break;
    }
}
function CreateFavoritesList(parent) {
    let container = document.createElement('div')

    let photos = GetCoockieFavoritePhotos()

    if (photos.length == 0) {
        parent.className = 'flexCenter'
        container.className = 'favoritesListEmty flexColumn'
        container.innerHTML = `
        <img src="/images//empty.png">
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
            CreateThumbnailPhoto(cellPhoto, photo, true)
            let title = document.createElement('p')
            title.innerText = photo.title
            title.className = 'titleThumbilPhoto'
            cellPhoto.append(title)
        })
    }
    parent.append(container)

}

function CreateUserList(parent) {
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
            let newLine = CreateDropOutLine(user.name,'h1', 'https://json.medrating.org/albums?userId=' + user.id, (data, parent) => data.forEach(album => {
                parent.append(CreateDropOutLine(album.title,'h2', 'https://json.medrating.org/photos?albumId=' + album.id,
                    (data, parent) => {
                        parent.className = 'thumbnailPhotoArea'
                        let favoriteids = GetCoockieFavoritePhotos().map((photo) => { return photo.id })
                        data.forEach(photoData => {
                            CreateThumbnailPhoto(parent, photoData, favoriteids.includes(photoData.id))
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
function CreateThumbnailPhoto(parent, photo, isFavorite) {
    let photoEl = document.createElement('div')
    parent.append(photoEl)
    photoEl.style = 'background: url(' + photo.thumbnailUrl + ');'
    photoEl.className = 'thumbnailPhoto'
    photoEl.onclick = () => {
        document.body.style = 'overflow:hidden; height: 100vh;'
        let frontScreen = document.createElement('div')
        document.body.append(frontScreen)
        frontScreen.className = 'foggingScreen flexCenter'
        frontScreen.style = 'top:' + self.pageYOffset + 'px'
        let escapeButton = document.createElement('button')
        frontScreen.append(escapeButton)
        escapeButton.onclick = () => {
            frontScreen.remove()
            document.body.style = ''
        }

        let photoFullRes = document.createElement('img')
        frontScreen.append(photoFullRes)
        photoFullRes.src = photo.url
    }
    let favoriteButton = document.createElement('div')
    photoEl.append(favoriteButton);
    favoriteButton.innerHTML = filledStar
    favoriteButton.className = 'favoriteButton flexCenter'


    if (isFavorite) {
        favoriteButton.children[0].style = 'fill: #FFAF37;'
    }

    favoriteButton.onclick = (event) => {
        event.stopPropagation()


        favoritePhotos = GetCoockieFavoritePhotos()
        let favoritesIds = favoritePhotos.map((photo) => { return photo.id })

        let index = favoritesIds.indexOf(photo.id)
        if (index != -1) {
            favoritePhotos.splice(index, 1)

            favoriteButton.children[0].style = ''

        } else {
            favoritePhotos.push(photo)

            favoriteButton.children[0].style = 'fill: #FFAF37;'
        }
        SetCoockieFavoritePhotos(favoritePhotos)

    }
}
function CreateDropOutLine(innerText,tagText, requestUrl, GenerateContent) {
    let container = document.createElement('div')
    container.className = "flexColumn"

    let textLine = document.createElement('div')
    container.append(textLine)
    textLine.className = 'dropOutLine'

    let marker = document.createElement('div')
    marker.className = 'marker'
    marker.innerText = '+'
    textLine.append(marker);

    let text = document.createElement(tagText)
    text.innerText = innerText
    textLine.append(text)

    textLine.onclick = () => {
        if (container.childElementCount == 1) {
            marker.style = 'background: #FFAF37;'
            marker.innerText = '-'

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
            marker.style = 'background: #117DC1;'
            marker.innerText = '+'
            for (let i = 1; i < container.childElementCount; i++)
                container.children[i].remove()
        }
    }
    return container
}
function CreateLoadCicle() {
    let cicle = document.createElement('img')
    cicle.className = 'loadCicle'
    cicle.src = '/images/ezgif-6-72ed6200d8f7.gif'
    return cicle
}

function fictivePromise() {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 2000)
    });
}
function GetCoockieFavoritePhotos() {
    let coockieValue = getCookie('photos')
    if (coockieValue) return JSON.parse(coockieValue)
    else return []

}
function SetCoockieFavoritePhotos(ArrayPhoto) {
    setCookie('photos', JSON.stringify(ArrayPhoto), { secure: false, 'max-age': 3600 })
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined
}
function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString()
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value)

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey
        let optionValue = options[optionKey]
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue
        }
    }

    document.cookie = updatedCookie;
}