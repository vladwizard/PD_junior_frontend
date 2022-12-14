import createPhotosBlock from "./PhotosArea.js";

function createErrorBlock() {

    let a = document.createElement('div')
    a.append((document.querySelector('#errorBlock').content.cloneNode(true)))
    return a
}
function createLoadBlock() {
    let a = document.createElement('div')
    a.append((document.querySelector('#loadBlock').content.cloneNode(true)))
    return a

}

export default function createUserList() {
    let parent = document.createElement('div')

    let users = fetch('https://json.medrating.org/users/').then((response) => {
        return response.json();
    })
    let loadBlock = createLoadBlock()
    parent.append(loadBlock)
    parent.className = 'flexCenter'

    users.then((data) => {
        parent.className = 'userList'
        loadBlock.remove()

        data.forEach(user => {
            let newLine = createDropOutLine(user.name, 'h1', 'https://json.medrating.org/albums?userId=' + user.id,

                (data, parent) => data.forEach(album => {
                    parent.append(createDropOutLine(album.title, 'h2', 'https://json.medrating.org/photos?albumId=' + album.id,

                        (data, parent) => {
                            parent.append(createPhotosBlock(data, false, false))
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
    return parent
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

    let isClose = true;
    marker.onclick = () => {
        if (isClose) {
            marker.src = './images/closeMarker.svg'

            let loadBlock = createLoadBlock()
            container.append(loadBlock)

            let response = fetch(requestUrl).then(
                (result) => {
                    return result.json();
                }
            )

            response.then(data => { generateContent(data, container) })
            response.catch(() => container.append(createErrorBlock()))
            response.finally(() => loadBlock.remove())
        }
        else {
            marker.src = './images/openMarker.svg'

            while (container.childElementCount != 1) {
                container.lastChild.remove()
            }

        }
        isClose = !isClose
    }

    return container
}