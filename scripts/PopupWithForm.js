import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(formHandler, popupSelector) {
    super(popupSelector);
  }

  _getInputValues() {
    if (popupSelector.classList.contains('modal_type_edit-profile')) {
      //Code here
    } else if (popupSelector.classList.contains('modal_type_add-card')) {
      // Code here
    }
  }
}