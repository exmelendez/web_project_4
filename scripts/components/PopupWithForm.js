import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(".form");
    this._formHandle = handleFormSubmit;
  }

  close() {
    this._formElement.reset();
    super.close();
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._formHandle(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  _getInputValues() {
    const allInputs = this._formElement.querySelectorAll(".form__input");
    return allInputs;
  }
}

export default PopupWithForm;