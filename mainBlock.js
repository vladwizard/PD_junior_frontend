import CreateUserList from "./scripts/userList.js";
import CreateFavoritesList from "./scripts/favoriteList.js";

const wrapper = document.getElementById('mainBlock');
const sectionsButtons = wrapper.children[0].children;
const mainContainer = wrapper.children[1];

Array.from(sectionsButtons).forEach(
    (element, index) => { element.onclick = (() => СhooseSection(index)) }
)

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