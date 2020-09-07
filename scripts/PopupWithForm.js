import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(".form");
    this._formHandle = handleFormSubmit;
  }

  _getInputValues() {
    const allInputs = this._formElement.querySelectorAll(".form__input");
    return allInputs;
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._formHandle(this._getInputValues());
      this._formElement.reset();
      super.close();
    });

    super.setEventListeners();
  }
}

export default PopupWithForm;