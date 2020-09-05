class Section {
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._classSelector = classSelector;
  }

  addItem(item) {
    document.querySelector(this._classSelector).prepend(item);
  }

  clear() {
    this.classSelector.innerHTML = "";
  }

  renderer() {
    this._items.forEach(item => this._renderer(item));
  }
}

export default Section;