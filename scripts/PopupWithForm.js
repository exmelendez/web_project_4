import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
  }

  _getInputValues() {
    
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", () => {
      const inputValues = this._getInputValues();
    });
    
    super.setEventListeners();
  }
}