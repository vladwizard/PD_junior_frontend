import createUserList from "../catalog/catalog.js";
import createFavoritesList from "../favorites/favorites.js";

class mainBlock {
  root = document.getElementById('mainBlock');
  content = this.root.children[1];
  sectionsButtons = Array.from(this.root.children[0].children);

  constructor(startSectionIndex = 0) {

    this.sectionsButtons.forEach(
      (element, index) => { element.onclick = (() => this.chooseSection(index)) }
    )

    this.sectionIndex = startSectionIndex
    this.changeSection(this.sectionIndex)
  }
  
  chooseSection(index) {

    if (index != this.sectionIndex) {
      this.sectionsButtons[this.sectionIndex].className = ''
      this.changeSection(index)
    }
  }

  changeSection(index) {
    this.sectionsButtons[index].className = 'active'

    switch (index) {
      case 0:
        this.content.replaceWith(createUserList());
        break;
      case 1:
        this.content.replaceWith(createFavoritesList());
        break;
    }
    this.content = this.root.children[1];
    this.sectionIndex = index
  }
}


new mainBlock()