import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(".form");
    this._formHandle = handleFormSubmit;
    this._formSaveBtn = this._formElement.querySelector(".form__save-btn");
  }

  formIsSaving(isSaving) {
    if (isSaving) {
      this._formSaveBtn.textContent = "Saving...";

    } else {
      this._formSaveBtn.textContent = "Save";
      this.close();
    }
  }

  close() {
    this._formElement.reset();
    super.close();
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._formHandle(this._getInputValues());
      this.formIsSaving(true);
    });
    super.setEventListeners();
  }

  _getInputValues() {
    const allInputs = Array.from(this._formElement.querySelectorAll(".form__input"));
    this._inputValues = {};
    allInputs.forEach((input) => { this._inputValues[input.name] = input.value });

    return this._inputValues;
  }
}

export default PopupWithForm;