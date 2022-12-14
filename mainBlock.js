import createUserList from "./scripts/userList.js";
import createFavoritesList from "./scripts/favoriteList.js";

const wrapper = document.getElementById('mainBlock');
const sectionsButtons = Array.from(wrapper.children[0].children);

sectionsButtons.forEach(
    (element, index) => { element.onclick = (() => chooseSection(index)) }
)

let lastSectionIndex = 1;
let lastContent = null;
chooseSection(0);

function chooseSection(index) {

    if (index != lastSectionIndex) {
        sectionsButtons[lastSectionIndex].className = ''
        lastSectionIndex = index

        sectionsButtons[index].className = 'active'

        if (lastContent != null) lastContent.remove()

        let content;
        switch (index) {
            case 0:
                content = createUserList();
                break;
            case 1:
                content = createFavoritesList();
                break;
        }
        wrapper.append(content)
        lastContent = content
    }

}