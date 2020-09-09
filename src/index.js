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
        cardPopup.open(item.url, item.title);
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
  handleFormSubmit: (inputValues) => {
    const userInfo = new UserInfo(inputValues);
    userInfo.setUserInfo();
  }
});

editPopup.setEventListeners();

profileEditBtn.addEventListener("click", () => {
  editPopup.open();
});

/* ADD CARD MODAL */

const addPopup = new PopupWithForm(".modal_type_add-card", {
  handleFormSubmit: (inputValues) => {
    const cardsData = [];
    cardsData.push(inputValues);

    const cardRenderer = new Section({
      items: cardsData,
      renderer: (item) => {
        const card = new Card(item, ".card-template", {
          handleCardClick: () => {
            cardPopup.open(item.url, item.title);
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
