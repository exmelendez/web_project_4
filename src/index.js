import FormValidator from './components/FormValidator.js';
import Card from './components/Card.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import { addCardBtn, addForm, defaultConfig, initialCards, profileEditBtn, profileForm } from './utils/constants.js';
import "./pages/index.css";

/* Form Validator Objects */
const editFormValidator = new FormValidator(defaultConfig, profileForm);
const cardFormValidator = new FormValidator(defaultConfig, addForm);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

const cardRenderer = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, ".card-template", {
      handleCardClick: () => {
        cardPopup.open(item.link, item.name);
      }
    });
    const cardElem = card.generateCard();
    const cardPopup = new PopupWithImage(".modal_type_image-view");
    cardPopup.setEventListeners();

    cardRenderer.addItem(cardElem);
  }
}, ".photos__grid");

cardRenderer.renderer();

/* PROFILE EDIT MODAL */

const editPopup = new PopupWithForm(".modal_type_edit-profile", {
  handleFormSubmit: (inputs) => {
    const userData = {};

    inputs.forEach((input) => {
      if (input.classList.contains("form__input-profile-name")) {
        userData.userName = input.value;
      } else if (input.classList.contains("form__input-profile-title")) {
        userData.userJob = input.value;
      }
    })

    const userInfo = new UserInfo(userData);
    userInfo.setUserInfo();
  }
});

editPopup.setEventListeners();

profileEditBtn.addEventListener("click", () => {
  editPopup.open();
});

/* ADD CARD MODAL */

const addPopup = new PopupWithForm(".modal_type_add-card", {
  handleFormSubmit: (inputs) => {
    const cardsData = [];
    const cardProperties = {};

    inputs.forEach((input) => {
      if (input.classList.contains("form__input_card-title")) {
        cardProperties.name = input.value;
      } else if (input.classList.contains("form__input_card-url")) {
        cardProperties.link = input.value;
      }
    });

    cardsData.push(cardProperties);

    const cardRenderer = new Section({
      items: cardsData,
      renderer: (item) => {
        const card = new Card(item, ".card-template", {
          handleCardClick: () => {
            cardPopup.open(item.link, item.name);
          }
        });
        const cardElem = card.generateCard();
        const cardPopup = new PopupWithImage(".modal_type_image-view");
        cardPopup.setEventListeners();

        cardRenderer.addItem(cardElem);
      }
    }, ".photos__grid");

    cardRenderer.renderer();
  }
});
addPopup.setEventListeners();

addCardBtn.addEventListener("click", () => {
  addPopup.open();
});
