import createUserList from "./scripts/userList.js";
import createFavoritesList from "./scripts/favoriteList.js";

const wrapper = document.getElementById('mainBlock');
const sectionsButtons = wrapper.children[0].children;
const mainContainer = wrapper.children[1];

Array.from(sectionsButtons).forEach(
    (element, index) => { element.onclick = (() => chooseSection(index)) }
)

let lastSectionIndex = 0
chooseSection(lastSectionIndex);

function chooseSection(index) {
    Array.from(sectionsButtons)[lastSectionIndex].className = ''
    lastSectionIndex = index

    sectionsButtons[index].className = 'active'

    mainContainer.style = ''
    mainContainer.className = ''
    mainContainer.innerHTML = ''

    switch (index) {
        case 0:
            createUserList(mainContainer)
            break;
        case 1:
            createFavoritesList(mainContainer)
            break;
    }
}