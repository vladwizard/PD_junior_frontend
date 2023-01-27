import createPhotosBlock from "../photos/PhotosArea.js";

function createErrorBlock() {

  let div = document.createElement('div')
  div.append((document.querySelector('#errorBlock').content.cloneNode(true)))
  return div
}
function createLoadBlock() {
  let div = document.createElement('div')
  div.append((document.querySelector('#loadBlock').content.cloneNode(true)))
  return div

}

export default function createUserList() {
  let parent = document.createElement('div')

  let users = fetch('https://json.medrating.org/users/').then((response) => {
    return response.json();
  })
  let loadBlock = createLoadBlock()
  parent.append(loadBlock)
  parent.style = 'min-height: inherit;'
  parent.className = 'flexCenter'

  users.then((userData) => {
    parent.className = 'userList'

    loadBlock.remove()

    userData.forEach(user => {
      let newLine = createDropOutLine(`<h1>${user.name}</h1>`, 'https://json.medrating.org/albums?userId=' + user.id,

        (data) => {
          let container = new DocumentFragment()

          data.forEach(album => {
            container.append(createDropOutLine(`<h2>${album.title}</h2>`, 'https://json.medrating.org/photos?albumId=' + album.id,

              (data) => createPhotosBlock(data, false, false)

            ))
          })
          
          return container
        }

      );
      parent.append(newLine)
    })

  })

  users.catch(() => {
    parent.innerHTML = errorBlock
  })
  return parent
}

function createDropOutLine(htmlContent, requestUrl, generateContent) {
  let content = document.createElement('div')
  content.className = "flexColumn dropOutLine"

  let textLine = document.createElement('div')
  content.append(textLine)
  textLine.className = 'dropOutLineContent'

  let marker = document.createElement('img')
  marker.className = 'marker'
  marker.src = './images/openMarker.svg'
  textLine.append(marker);

  textLine.insertAdjacentHTML('beforeend', htmlContent);

  let isClose = true;
  marker.onclick = () => {
    if (isClose) {
      marker.src = './images/closeMarker.svg'

      let loadBlock = createLoadBlock()
      content.append(loadBlock)

      let response = fetch(requestUrl).then(
        (result) => {
          return result.json();
        }
      )

      response.then(data => {
        content.append(generateContent(data))
      })
      response.catch(() => content.append(createErrorBlock()))
      response.finally(() => loadBlock.remove())
    }
    else {
      marker.src = './images/openMarker.svg'

      while (content.childElementCount != 1) {
        content.lastChild.remove()
      }

    }
    isClose = !isClose
  }

  return content
}