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
    const allInputs = Array.from(this._formElement.querySelectorAll(".form__input"));
    this._inputValues = {};
    allInputs.forEach((input) => {this._inputValues[input.name] = input.value});
    
    return this._inputValues;
  }
}

export default PopupWithForm;