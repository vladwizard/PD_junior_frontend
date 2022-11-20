const id = 'mainBlock';
const wrapper = document.getElementById(id);
const sectionsButtons = wrapper.children[0].children;
const conteiner = wrapper.children[1];
console.log(sectionsButtons);
СhooseSection(0);
// let lastChoosenSectionIndex;
Array.from(sectionsButtons).forEach(
    (element, index) => { element.onclick = (() => СhooseSection(index)) }
)

let centerFlexChildren = `display: flex;
align-items: center;
justify-content: center;`

function СhooseSection(index) {
    conteiner.innerHTML = ''
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
    LoadCicle(conteiner)
    users.then((data) => {
        conteiner.style = ''
        conteiner.innerHTML = ''
        data.forEach(user => {
            let newLine = CreateDropOutLine(user.name);

            newLine.children[0].onclick = () => {
                if (newLine.childElementCount == 1) {
                    let marker = newLine.querySelector('.marker');
                    marker.style = 'background: #FFAF37;'
                    marker.innerText = '-'
                    let dropped = document.createElement('div');
                    dropped.className = 'dropped'
                    dropped.style = centerFlexChildren
                    LoadCicle(dropped)
                    console.log(user.id)
                    let albums = fetch('https://json.medrating.org/albums?userId=' + user.id).then((response) => {
                        return response.json();
                    })
                    albums.then(data => {
                        console.log(data)
                        dropped.style = ''
                        dropped.innerHTML = ''
                        data.forEach(album => dropped.append(CreateDropOutLine(album.title, null)))
                    })
                    newLine.append(dropped)
                }
                else {
                    let marker = newLine.querySelector('.marker');
                    marker.style = 'background: #117DC1;'
                    marker.innerText = '+'

                    for(let i = 1; i < newLine.childElementCount; i++)
                        newLine.children[i].remove()
                }
            }

            conteiner.append(newLine)
        })
    });

}
function CreateDropOutLine(innerText) {
    let container = document.createElement('div');
    container.className = "flexColumn"
    let newLine = document.createElement('div');
    newLine.className = 'dropOutLine'
    let mark = document.createElement('div')

    mark.className = 'marker'
    mark.innerText = '+'
    newLine.append(mark);

    let text = document.createElement('p');
    text.innerText = innerText

    newLine.append(text);
    if (onclick)
        newLine.onclick = onclick
    container.append(newLine)
    return container
}
function LoadCicle(parent) {
    parent.style = 'display:flex; align-items: center;'
    parent.innerHTML = `<img id="loadCicle" src="/статика/ezgif-6-72ed6200d8f7.gif">`
}

console.log(sectionsButtons)
