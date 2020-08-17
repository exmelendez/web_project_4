import FormValidator from './FormValidator.js';
import Card from './Card.js';

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
const imageViewModal = document.querySelector(".modal_type_image-view");
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
 * Given a modal/HTML/Node object it will toggle the class name making it so the modal is visible and invisible
 * @param {Object} modal 
 */
const toggleModalWindow = (modal) => {
    modal.classList.toggle("modal_is-closed");
};

/**
 * Will take edit profile input values and set as profile data, will also call the function to close/remove the modal.
 * @param {Object} e Event Object
 */
const editFormHandler = (e) => {
    e.preventDefault();
    pageDisplayName.textContent = profileNameInput.value;
    pageDisplayTitle.textContent = profileTitleInput.value;
    toggleModalWindow(editProfileModal);
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
    toggleModalWindow(addCardModal);
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
 * With HTML node passed, will remove input/span error messages when modal is closed but not saved
 * @param {Object} modal HTML modal
 */
const removeErrorClasses = (modal) => {
    const formInputs = [...modal.querySelectorAll(".form__input")];
    const formSpans = [...modal.querySelectorAll(".form__error")];

    formInputs.forEach((input) => {
        input.classList.remove("form__input_type_error");
    });

    formSpans.forEach((span) => {
        span.classList.remove("form__error_visible");
    });
};

/**
 * Enables + sets up exit of modal by overlay click or esc key
 * @param {Object} modalList Nodelist of HTML modals w/ ".modal" class
 */
const enableModalExitClick = (modalList) => {
    const modals = [...modalList];
    modals.forEach((modal) => {
        modal.onclick = (e) => {
            if (e.target == modal) {
                removeErrorClasses(modal);
                toggleModalWindow(modal);
            }
        };

        document.addEventListener("keydown", (e) => {
            if (e.key === 'Escape' && !modal.classList.contains("modal_is-closed")) {
                removeErrorClasses(modal);
                toggleModalWindow(modal);
            }
        });
    });
};

photoCardRender();
enableModalExitClick(modalList);

/* EVENT LISTENERS */
profileEditBtn.addEventListener("click", () => {
    const profileDisplayName = pageDisplayName.textContent;
    const profileTitle = pageDisplayTitle.textContent;

    profileNameInput.value = profileDisplayName;
    profileTitleInput.value = profileTitle;

    toggleModalWindow(editProfileModal);
    profileNameInput.focus();
});
addCardBtn.addEventListener("click", () => {
    toggleModalWindow(addCardModal);
    cardModalTitleInput.focus();
});
editModalCloseBtn.addEventListener("click", () => {
    removeErrorClasses(editProfileModal);
    toggleModalWindow(editProfileModal);
});
addModalCloseBtn.addEventListener("click", () => {
    removeErrorClasses(addCardModal);
    toggleModalWindow(addCardModal);
});
imageModalCloseBtn.addEventListener("click", () => {
    toggleModalWindow(imageViewModal);
});
editProfileForm.addEventListener('submit', editFormHandler);
addCardForm.addEventListener('submit', addFormHandler);