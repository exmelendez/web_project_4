import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(".form");
    this._formHandle = handleFormSubmit;
    this._formSaveBtn = this._formElement.querySelector(".form__save-btn");
  }

  close() {
    this._formElement.reset();
    super.close();
  }

  deleteHandler() {
    this._deleteHandle();
  }

  submitBtnText(text) {
    this._formSaveBtn.textContent = text;
  }

  setDeleteHandler(deleteHandle, cardId) {
    this._deleteHandle = deleteHandle;
    this._cardId = cardId;
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();

      if (this._formElement.classList.contains('form_type_confirm-delete')) {
        this._formHandle(this._cardId);
      } else {
        this._formHandle(this._getInputValues());
        this.submitBtnText("Saving . . .");
      }
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