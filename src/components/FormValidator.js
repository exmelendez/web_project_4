class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {

      this._showInputError(input, input.validationMessage);
    }
  }

  _toggleButtonState(input) {
    const isValid = input.validity.valid;

    if (isValid) {
      this._form.querySelector(this._submitButtonSelector).classList.remove(this._inactiveButtonClass);

    } else {
      this._form.querySelector(this._submitButtonSelector).classList.add(this._inactiveButtonClass);
    }
  }

  _setEventListener() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const modalElem = this._form.closest(".modal");

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputElement);
      });
    });

    modalElem.addEventListener("click", (e) => {
      if (e.target.classList.contains('modal__close-btn') || e.target.classList.contains('modal_is-open')) {

        inputList.forEach((inputElement) => {
          this._hideInputError(inputElement);
        });
      }
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListener();
  }
}

export default FormValidator;