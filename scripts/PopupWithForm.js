import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(".form");
    this._formHandle = handleFormSubmit;
    console.log("new Popup with form made");
  }

  close() {
    this._formElement.removeEventListener("submit", this._handleSubmitListener);
    this._formElement.reset();
    super.close();
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", this._handleSubmitListener);
    console.log("event listener set");
    super.setEventListeners();
  }

  _getInputValues() {
    const allInputs = this._formElement.querySelectorAll(".form__input");
    return allInputs;
  }

  _handleSubmitListener(e) {
    console.log("handle submit listener");
    e.preventDefault();
    this._formHandle(this._getInputValues());
    this.close();
  }
}

export default PopupWithForm;