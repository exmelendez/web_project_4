class Section {
  constructor({ cardData, renderer }, classSelector) {
    this._cards = cardData;
    this._renderer = renderer;
    this._classSelector = document.querySelector(classSelector);
  }

  addItem(card) {
    this._classSelector.prepend(card);
  }

  renderer() {
    this._cards.length > 1 ? this._cards.forEach(card => this._renderer(card)) : this._renderer(this._cards);
  }
}

export default Section;