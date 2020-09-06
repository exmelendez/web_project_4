class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeBtn = document.querySelector(".modal__close-btn");
  }

  close() {
    this._popupElement.classList.remove("modal_is-open");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  open() {
    this._popupElement.classList.add("modal_is-open");
    document.addEventListener("keyup", this._handleEscClose);
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (e) => {
      if (e.target.classList.contains('modal__close-btn') ||  e.target.classList.contains('modal_is-open')) {
        this.close();
      }
    });
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }
}

export default Popup;