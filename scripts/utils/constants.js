/* Buttons */
export const profileEditBtn = document.querySelector(".profile__edit-btn");
export const addCardBtn = document.querySelector(".profile__add-btn");

/* Modals */
export const editModal = document.querySelector(".modal_type_edit-profile");
export const addModal = document.querySelector(".modal_type_add-card");

/* Forms */
export const profileForm = editModal.querySelector(".form_type_edit-profile");
export const addForm = addModal.querySelector(".form_type_add-card");

export const defaultConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-btn",
  inactiveButtonClass: "form__save-btn_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible"
};

export const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  },
  {
    name: "Vanois National Park",
    link: "https://code.s3.yandex.net/web-code/vanois.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  }
];