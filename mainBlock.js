const id = 'mainBlock';
const wrapper = document.getElementById(id);
const sectionsButtons = wrapper.children[0].children;
const mainContainer = wrapper.children[1];
СhooseSection(0);
// let lastChoosenSectionIndex;
Array.from(sectionsButtons).forEach(
    (element, index) => { element.onclick = (() => СhooseSection(index)) }
)

let centerFlexChildren = `display: flex;
align-items: center;
justify-content: center;`

function СhooseSection(index) {
    mainContainer.innerHTML = ''
    Array.from(sectionsButtons).forEach(button => button.className = '')
    sectionsButtons[index].className = 'active'
    switch (index) {
        case 0:
            CreateUserList()
            break;
    }
}
function CreateUserList() {
    let users = fetch('https://json.medrating.org/users/').then((response) => {
        return response.json();
    })
    LoadCicle(mainContainer)
    users.then((data) => {
        mainContainer.style = ''
        mainContainer.innerHTML = ''
        data.forEach(user => {
            let newLine = CreateDropOutLine(user.name, 'https://json.medrating.org/albums?userId=' + user.id, (data, dropped) => data.forEach(album => {
                dropped.append(CreateDropOutLine(album.title, 'https://json.medrating.org/photos?albumId=' + album.id,
                    (data, dropped) => {
                        dropped.className = 'thumbnaiUrlArea'
                        data.forEach(photoData => {
                            CreateThumbnaiPhoto(dropped, photoData.thumbnailUrl, photoData.url)
                        })
                    }))
            }
            ));

            mainContainer.append(newLine)
        })
    });

}
function CreateThumbnaiPhoto(parent, thumbnaiUrl, Url) {
    let photoEl = document.createElement('img');
    photoEl.src = thumbnaiUrl;

    photoEl.onclick = ()=>{
        document.body.style = 'overflow:hidden; height: 100vh;'
        let frontScreen = document.createElement('div')
        document.body.append(frontScreen)
        frontScreen.className = 'foggingScreen'
        frontScreen.style = 'top:'+self.pageYOffset+'px'
        let escapeButton = document.createElement('button')
        frontScreen.append(escapeButton)
        escapeButton.onclick = () => {
            frontScreen.remove()
            document.body.style = ''
        }

        let photoFullRes = document.createElement('img')
        frontScreen.append(photoFullRes)
        photoFullRes.src = Url
        
    }

    parent.append(photoEl)
}
function CreateDropOutLine(innerText, requestUrl, GenerateContent) {
    let container = document.createElement('div');
    container.className = "flexColumn"
    let textLine = document.createElement('div');
    textLine.className = 'dropOutLine'
    let mark = document.createElement('div')

    mark.className = 'marker'
    mark.innerText = '+'
    textLine.append(mark);

    let text = document.createElement('p');
    text.innerText = innerText

    textLine.append(text);
    if (onclick)
        textLine.onclick = onclick
    container.append(textLine)

    textLine.onclick = async () => {
        if (container.childElementCount == 1) {
            let marker = container.querySelector('.marker');
            marker.style = 'background: #FFAF37;'
            marker.innerText = '-'
            let dropped = document.createElement('div');
            container.append(dropped)
            dropped.className = 'dropped'
            dropped.style = centerFlexChildren
            LoadCicle(dropped)
            let albums = fetch(requestUrl).then((response) => {
                return response.json();
            })
            await albums;
            dropped.style = ''
            dropped.innerHTML = ''
            albums.then(data => GenerateContent(data, dropped))
        }
        else {
            let marker = container.querySelector('.marker');
            marker.style = 'background: #117DC1;'
            marker.innerText = '+'
            for (let i = 1; i < container.childElementCount; i++)
                container.children[i].remove()
        }
    }
    return container
}
function LoadCicle(parent) {
    parent.style = 'display:flex; align-items: center;'
    parent.innerHTML = `<img id="loadCicle" src="/статика/ezgif-6-72ed6200d8f7.gif">`
}

function fictivePrimise() {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 2000);
    });
}

