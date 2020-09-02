import FormValidator from './FormValidator.js';
import Card from './Card.js';
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
const editModalCloseBtn = document.querySelector(".modal_close_profile");
const addModalCloseBtn = document.querySelector(".modal_close_add-card");
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
 * 
 * Handles esc key functionality when modal is open
 */
const escHandler = (e) => {
    if (e.key === 'Escape') {
        closeModalWindow();
    }
};

/**
 * Given a modal/HTML/Node object it will remove the class name from it, making the modal hidden
 * @param {Object} modal HTML element
 */
const closeModalWindow = () => {
    const modal = document.querySelector(".modal_is-open");

    modal.classList.remove("modal_is-open");
    document.removeEventListener("keydown", escHandler);
};

/**
 * Given a modal/HTML/Node object it will add the class name to it, making the modal visible
 * @param {Object} modal HTML element
 */
export const openModalWindow = (modal) => {
    modal.classList.add("modal_is-open");
    document.addEventListener("keydown", escHandler);
};

/**
 * Given a card object with the name and link will return a generated card object from the Card class
 * @param {Object} cardData Card data Object, i.e. name & link
 * @return {Object} Card object from Card class
 */
const createCard = (cardData) => {
    const cardElement = new Card(cardData, ".card-template");
    return cardElement.generateCard();
};

/**
 * Will take edit profile input values and set as profile data, will also call the function to close/remove the modal.
 * @param {Object} e Event Object
 */
const editFormHandler = (e) => {
    e.preventDefault();
    pageDisplayName.textContent = profileNameInput.value;
    pageDisplayTitle.textContent = profileTitleInput.value;
    closeModalWindow();
};

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

    cardList.prepend(createCard(newCard));
    closeModalWindow();
};

/**
 * Iterates through card list array then creates "Card" object using Card.js and prepends to UL element of "cardList" variable
 */
const photoCardRender = () => {
    initialCards.forEach((card) => {
        cardList.prepend(createCard(card));
    });
};

/**
 * Enables clicking outside of modals for closing
 * @param {Object} modalList Nodelist of HTML modals w/ ".modal" class
 */
const outsideModalHandler = (modalList) => {
    const modals = [...modalList];
    modals.forEach((modal) => {
        modal.onclick = (e) => {
            if (e.target == modal) {
                closeModalWindow();
            }
        };
    });
};

photoCardRender();
outsideModalHandler(modalList);

/* EVENT LISTENERS */
profileEditBtn.addEventListener("click", () => {
    const profileDisplayName = pageDisplayName.textContent;
    const profileTitle = pageDisplayTitle.textContent;

    profileNameInput.value = profileDisplayName;
    profileTitleInput.value = profileTitle;

    openModalWindow(editProfileModal);
});

addCardBtn.addEventListener("click", () => {
    openModalWindow(addCardModal);
});

editModalCloseBtn.addEventListener("click", closeModalWindow);
addModalCloseBtn.addEventListener("click", closeModalWindow);
imageModalCloseBtn.addEventListener("click", closeModalWindow);
editProfileForm.addEventListener('submit', editFormHandler);
addCardForm.addEventListener('submit', addFormHandler);