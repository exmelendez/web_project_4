import FormValidator from './FormValidator.js';
import Card from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import "../pages/index.css";

const defaultConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-btn",
  inactiveButtonClass: "form__save-btn_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible"
};

/* Page Modals */
const editProfileModal = document.querySelector(".modal_type_edit-profile");
const addCardModal = document.querySelector(".modal_type_add-card");
const modalList = document.querySelectorAll(".modal");

/* Buttons */
const profileEditBtn = document.querySelector(".profile__edit-btn");
const addCardBtn = document.querySelector(".profile__add-btn");
// const editModalCloseBtn = document.querySelector(".modal_close_profile");
// const addModalCloseBtn = document.querySelector(".modal_close_add-card");
const imageModalCloseBtn = document.querySelector(".modal_close_image-view");

/* Modal Forms */
const editProfileForm = editProfileModal.querySelector(".form_type_edit-profile");
const addCardForm = addCardModal.querySelector(".form_type_add-card");

/* Edit Profile Form Inputs */
const profileNameInput = document.querySelector(".form__input-profile-name");
const profileTitleInput = document.querySelector(".form__input-profile-title");

/* Add Card Form Inputs */
const cardModalTitleInput = document.querySelector(".form__input_card-title");
const cardModalUrlInput = document.querySelector(".form__input_card-url");

/* Page Profile Data Display */
const pageDisplayName = document.querySelector(".profile__name");
const pageDisplayTitle = document.querySelector(".profile__title");

/* Image Card Container */
const cardList = document.querySelector(".photos__grid");

/* Form Validator Objects */
const editFormValidator = new FormValidator(defaultConfig, editProfileForm);
const cardFormValidator = new FormValidator(defaultConfig, addCardForm);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

const initialCards = [
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

/**
 * Will take add card modal inout data and create a new card, also contains URL validation + calls function to close/remove the modal.
 * @param {Object} e Event Object
 */
const addFormHandler = (e) => {
  e.preventDefault();

  const newCard = {
    name: cardModalTitleInput.value,
    link: cardModalUrlInput.value
  };
  cardElement = new Card(newCard, ".card-template");

  cardList.prepend(cardElement.generateCard());
  closeModalWindow();
};

const cardRenderer = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, ".card-template", {
      handleImageClick: () => {
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

/* EVENT LISTENERS */
profileEditBtn.addEventListener("click", () => {
  console.log("profile edit btn clicked");
  const editPopup = new PopupWithForm(".modal_type_edit-profile", {
    handleFormSubmit: (inputs) => {
      console.log("handle form submit");
      inputs.forEach((input) => {
        if(input.classList.contains("form__input-profile-name")) {
          console.log("name:", input.value);
          pageDisplayName.textContent = input.value;
        } else if (input.classList.contains("form__input-profile-title")) {
          console.log("profile title:", input.value);
          pageDisplayTitle.textContent = input.value;
        }
      })

    }
  });

  editPopup.open();
  editPopup.setEventListeners();
});

addCardBtn.addEventListener("click", () => {
  const addPopup = new PopupWithForm(".modal_type_add-card", {
    handleFormSubmit: (inputs) => {
      const cardProperties = {};

      if(input.classList.contains("form__input_card-title")) {
        cardProperties.name = input.value;
      } else if (input.classList.contains("form__input_card-url")) {
        cardProperties.link = input.value;
      }

      //code here

      const cardRenderer = new Section({
        items: cardPoperties,
        renderer: (item) => {
          const card = new Card(item, ".card-template", {
            handleImageClick: () => {
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

  addPopup.open();
  addPopup.setEventListeners();
});

// addCardForm.addEventListener('submit', addFormHandler);