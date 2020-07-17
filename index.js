/* Page Modals */
const editProfileModal = document.querySelector(".modal_type_edit-profile");
const addCardModal = document.querySelector(".modal_type_add-card");
const imageViewModal = document.querySelector(".modal_type_image-view");

/* Buttons */
const profileEditBtn = document.querySelector(".profile__edit-btn");
const addCardBtn = document.querySelector(".profile__add-btn");
const editModalCloseBtn = document.querySelector(".modal_close_profile");
const addModalCloseBtn = document.querySelector(".modal_close_add-card");
const imageModalCloseBtn = document.querySelector(".modal_close_image-view");

/* Modal Forms */
const editProfileForm = document.querySelector(".form_type_edit-profile");
const addCardForm = document.querySelector(".form_type_add-card");

/* Edit Profile Form Inputs */
const profileNameInput = document.querySelector(".form__input-profile-name");
const profileTitleInput = document.querySelector(".form__input-profile-title");

/* Page Profile Data Display */
const pageDisplayName = document.querySelector(".profile__name");
const pageDisplayTitle = document.querySelector(".profile__title");

/* Image Card Container */
const cardList = document.querySelector(".photos__grid");

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
const toggleModalWindow = modal => {
    modal.classList.toggle("modal_is-closed");
};

/**
 * Takes string and if longer than 18 characters will trim to 15 characters and add three periods after
 * @param {String} string Card title string
 * @return {String}       Card title, possibly altered
 */
const stringTrimmer = string => {
    if (string.length > 18) {
        string = string.slice(0, 15) + "...";
    }

    return string;
};

/**
 * Given two (2) string arguments of title and URL will create image card HTML element
 * @param {String} title String title for card
 * @param {String} url   String URL for card/image
 * @return {Object}      HTML/Node Object of image card
 */
const cardCreator = (title, url) => {
    const cardTemplate = document.querySelector(".card-template").content.querySelector(".photos__item");
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".photos__image");
    const cardTitle = cardElement.querySelector(".photos__title");
    const cardLikeButton = cardElement.querySelector(".photos__love-btn");
    const cardDeleteButton = cardElement.querySelector(".photos__delete-btn");

    cardTitle.textContent = stringTrimmer(title);
    cardImage.style.backgroundImage = `url(${url})`;

    cardDeleteButton.addEventListener("click", () => {
        cardElement.remove();
    });

    cardLikeButton.addEventListener("click", () => {
        cardLikeButton.classList.toggle("photos__love-btn_liked");
    });

    cardImage.addEventListener("click", () => {
        document.querySelector(".modal__container_size-image").style.backgroundImage = `url(${url})`;
        document.querySelector(".modal__image-title").textContent = title;
        imageViewModal.classList.toggle("modal_is-closed");
    });

    return cardElement;
};

/**
 * Takes string argument to check that it ends in "png", "jpg", or "jpeg" and starts with http
 * @param {String} imageURL String URL for card
 * @return {Boolean}        Boolean if string ends appropiate ext
 */
const imageUrlConfirm = imageURL => {
    const modString = imageURL.toLowerCase();
    return modString.length > 5 && modString.slice(0, 4) === "http" && modString.substring(imageURL.length - 3) === "jpg" || modString.substring(imageURL.length - 3) === "png" || modString.substring(imageURL.length - 4) === "jpeg";
};

/**
 * Will take edit profile input values and set as profile data, will also call the function to close/remove the modal.
 * @param {Object} e Event Object
 */
const editFormHandler = e => {
    e.preventDefault();
    pageDisplayName.textContent = profileNameInput.value;

    const editBtnTemplate = document.querySelector(".edit-btn-template").content.querySelector(".profile__edit-btn");
    const editBtnElem = editBtnTemplate.cloneNode(true);

    editBtnElem.addEventListener("click", () => {
        toggleModalWindow(editProfileModal);
    });
    pageDisplayName.append(editBtnElem);
    pageDisplayTitle.textContent = profileTitleInput.value;
    toggleModalWindow(editProfileModal);
};

/**
 * Will take add card modal inout data and create a new card, also contains URL validation + calls function to close/remove the modal.
 * @param {Object} e Event Object
 */
const addFormHandler = e => {
    e.preventDefault();
    const cardTitle = document.querySelector(".form__input_card-title");
    const cardUrl = document.querySelector(".form__input_card-url");

    if (imageUrlConfirm(cardUrl.value)) {
        const cardElement = cardCreator(cardTitle.value, cardUrl.value);
        cardList.prepend(cardElement);

        toggleModalWindow(addCardModal);
    } else {
        alert("invalid url");
    }
};

/**
 * Iterates through card list array then creates and prepends to UL element of the variable "cardList"
 */
const photoCardRender = () => {
    initialCards.forEach((data) => {
        const cardElement = cardCreator(data.name, data.link);
        cardList.prepend(cardElement);
    });
};

photoCardRender();

profileEditBtn.addEventListener("click", () => {
    const profileDisplayName = pageDisplayName.textContent.trim();
    const profileTitle = pageDisplayTitle.textContent;

    profileNameInput.value = profileDisplayName;
    profileTitleInput.value = profileTitle;

    toggleModalWindow(editProfileModal);
});
addCardBtn.addEventListener("click", () => {
    toggleModalWindow(addCardModal);
});
editModalCloseBtn.addEventListener("click", () => {
    toggleModalWindow(editProfileModal);
});
addModalCloseBtn.addEventListener("click", () => {
    toggleModalWindow(addCardModal);
});
imageModalCloseBtn.addEventListener("click", () => {
    toggleModalWindow(imageViewModal);
});
editProfileForm.addEventListener('submit', editFormHandler);
addCardForm.addEventListener('submit', addFormHandler);
