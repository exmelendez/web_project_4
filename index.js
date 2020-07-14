const profileEditBtn = document.querySelector(".profile__edit-btn");
const addCardBtn = document.querySelector(".profile__add-btn");
const cardList = document.querySelector(".photos__grid");

const initialCards = [
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg",
        like: false
    },
    {
        name: "Vanois National Park",
        link: "https://code.s3.yandex.net/web-code/vanois.jpg",
        like: false
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg",
        like: false
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
        like: false
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
        like: false
    },
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
        like: false
    }
];

/**
 * adds class to modal to make visibility hidden, then after set time will remove modal element from DOM
 */
const removeModal = () => {
    const modal = document.querySelector(".modal");
    modal.classList.add("modal_is-closed");
    setTimeout(() => {
        modal.remove();
    },1000);
};

/**
 * Removes "modal_is-closed" class from modal
 */
const removeModalCloseClass = () => {
    const modal = document.querySelector(".modal");
    modal.classList.remove("modal_is-closed");
};

/**
 * Calls "removeModalCloseClass" function after set time to create smooth transition effect
 */
const openModal = () => {
    setTimeout(removeModalCloseClass, 0);
};

/**
 * Takes modal HTML node/Object as argument adds the "modal_is-closed" class then appends to body
 * @param {Object} modal HTML Element
 */
const appendModalToDom = (modal) => {
    const body = document.querySelector(".page");
    modal.classList.add('modal_is-closed');
    body.append(modal);
};

/**
 * Assigns event listener to modal close btn
 */
const closeModalBtnActivate = () => {
    const closeModalBtn = document.querySelector(".modal__close-btn");
    closeModalBtn.addEventListener("click", removeModal);
};

/**
 * Creates object of profile data displayed on page
 * @return {Object}     Profile data object
 */
const modalProfileData = () => {
    const formData = {
        name: document.querySelector(".profile__name").textContent.trim(),
        title: document.querySelector(".profile__title").textContent
    };

    return formData;
};

/**
 * Creates the modal for profile edit then calls functions to open it
 * @param {Object} modalElement Modal HTML/Node
 */
const modalProfileRender = modalElement => {
    const modalTitle = modalElement.querySelector(".modal__title");
    modalTitle.textContent = "Edit profile";

    const formElement = modalElement.querySelector(".form");
    formElement.classList.add("form-profile");

    const formInputs = modalElement.querySelectorAll(".form__input");
    let inputData = modalProfileData();

    formInputs[0].setAttribute("value", inputData.name);
    formInputs[1].setAttribute("type", "text");
    formInputs[1].setAttribute("name", "title");
    formInputs[1].setAttribute("placeholder", "Title");
    formInputs[1].setAttribute("value", inputData.title);

    appendModalToDom(modalElement);
    openModal();
    closeModalBtnActivate();
};

/**
 * Creates the modal for card add then calls functions to open it
 * @param {Object} modalElement Modal HTML/Node
 */
const modalAddRender = modalElement => {
    const modalTitle = modalElement.querySelector(".modal__title");
    modalTitle.textContent = "New place";

    const formElement = modalElement.querySelector(".form");
    formElement.classList.add("form-add");

    const formInputs = modalElement.querySelectorAll(".form__input");
    formInputs[1].setAttribute("type", "url");
    formInputs[1].setAttribute("name", "url");
    formInputs[1].setAttribute("placeholder", "Link");

    appendModalToDom(modalElement);
    openModal();
    closeModalBtnActivate();
};

/**
 * Creates the modal for iage view then calls functions to open it
 * @param {Object} modalElement Modal HTML/Node
 */
const modalImageRender = modalElement => {
    appendModalToDom(modalElement);
    openModal();
    closeModalBtnActivate();
};

/**
 * Creates modal HTML/Node based on event by the button that caused the action
 * @param {Object} e Event Object
 */
const modalRender = e => {
    const modalType = e.toElement.className;
    const modalTemplate = document.querySelector(".modal-template").content.querySelector(".modal");
    const modalElement = modalTemplate.cloneNode(true);
    const modalContainer = modalElement.querySelector(".modal__container");

    if (modalType === "photos__image") {
        const imageUrl = e.path[0].style.backgroundImage;
        const imageTitle = e.path[1].childNodes[5].childNodes[1].innerText;

        const titleElement = document.createElement('p');
        titleElement.textContent = imageTitle;
        titleElement.classList.add("modal__image-title");
        modalContainer.append(titleElement);

        modalContainer.style.backgroundImage = imageUrl;
        modalContainer.classList.toggle('modal__container_size-image');

        modalImageRender(modalElement);
    } else {

        // Create Modal Title
        const modalTitleElem = document.createElement("h2");
        modalTitleElem.classList.add("modal__title");

        // Create Modal Input Form
        const modalForm = document.createElement("form");
        modalForm.classList.add("form");
        modalForm.setAttribute("action", "#");
        modalForm.addEventListener("submit", formHandler);

        // Create Form Input #1
        const modalInput1 = document.createElement("input");
        modalInput1.classList.add("form__input");
        modalInput1.setAttribute("type", "text");
        modalInput1.setAttribute("name", "name");
        modalInput1.setAttribute("placeholder", "Name");

        // Create Form Input #2
        const modalInput2 = document.createElement("input");
        modalInput2.classList.add("form__input");

        // Create Form Save Button
        const modalSaveBtn = document.createElement("button");
        modalSaveBtn.classList.add("form__save-btn");
        modalSaveBtn.setAttribute("type", "submit");
        modalSaveBtn.textContent = "Save";

        //Append Elements
        modalContainer.append(modalTitleElem);
        modalContainer.append(modalForm);
        modalForm.append(modalInput1);
        modalForm.append(modalInput2);
        modalForm.append(modalSaveBtn);

        if (modalType === "profile__edit-btn") {
            modalProfileRender(modalElement);

        } else if (modalType === "profile__add-btn") {
            modalAddRender(modalElement);
        }
    }

};

/**
 * Given string arguments it will call the cardCreator function then prepend the card to the other cards
 * @param {String} title String title of card
 * @param {String} url String URL of image
 */
const addCard = (title, url) => {
    const cardElement = cardCreator(title, url);
    cardList.prepend(cardElement);
};

/**
 * Will take modal inout data and mod page profile or add a new card, will also call the function to close/remove the modal.
 * @param {Object} e Event Object
 */
const formHandler = e => {
    e.preventDefault();
    const classNames = e.target.classList;
    const formInputs = document.querySelectorAll(".form__input");

    if (classNames[classNames.length - 1] === "form-profile") {
        const profileName = document.querySelector(".profile__name");
        const profileTitle = document.querySelector(".profile__title");

        profileName.textContent = formInputs[0].value;
        const editBtn = document.createElement("button");
        editBtn.classList.add("profile__edit-btn");
        editBtn.addEventListener("click", modalRender);
        profileName.append(editBtn);

        profileTitle.textContent = formInputs[1].value;
    } else if (classNames[classNames.length - 1] === "form-add") {
        if(formInputs[0].value.length > 0 && formInputs[1].value.length > 0) {
            const title = formInputs[0].value;
            const imageUrl = formInputs[1].value;

            initialCards.push({name: title, link: imageUrl, like: false});
            addCard(title, imageUrl);
        }
    }
    removeModal();
};

/**
 * Using event object locates the name of the card
 * @param {Object} e Event object
 * @return {String}  Title of card
 */
const getCardTitle = e => {
    const elemClassName = e.srcElement.classList[0];
    let cardTitle;

    if(elemClassName === "photos__love-btn") {
        cardTitle = e.path[1].childNodes[1].innerText;

    } else if(elemClassName === "photos__delete-btn") {
        cardTitle = e.path[1].childNodes[5].childNodes[1].innerText;
    }
    
    /* Determine if card title was programmatically altered due to length, alter if '.' found */
    if(cardTitle.includes('.')) {
        cardTitle = cardTitle.slice(0, -3);
    }

    return cardTitle;
};

/**
 * Iterate through card list array to find index number of string argument
 * @param {String} cardTitle String title of card
 * @return {Number}          Array index
 */
const getCardIndex = cardTitle => {
    let cardIndex = initialCards.findIndex(card => card.name.includes(cardTitle));
    return cardIndex;
};

/**
 * Toggles class in card item to display filled/liked heart will also modify the value/state of like in the array of cards
 * @param {Object} e Event Object
 */
const cardLikeHandler = e => {
    e.target.classList.toggle('photos__love-btn_liked');
    const cardTitle = getCardTitle(e);
    const cardIndex = getCardIndex(cardTitle);

    /* determine state of "like" property and toggle boolean */
    if(initialCards[cardIndex].like) {
        initialCards[cardIndex].like = false;
    } else {
        initialCards[cardIndex].like = true;
    }
};

/**
 * Using event object finds card title/index from array and will remove from card array list and from DOM
 * @param {Object} e Event Object
 */
const cardRemoveHandler = e => {
    const cardTitle = getCardTitle(e);
    const cardIndex = getCardIndex(cardTitle);
    initialCards.splice(cardIndex, 1);
    e.path[1].remove();
}

/**
 * Takes string and if longer than 18 characters will trim to 15 characters and add three periods after
 * @param {String} string Card title string
 * @return {String}       Card title, possibly altered
 */
const stringTrimmer = string => {
    if(string.length > 18) {
        string = string.slice(0, 15) + "...";
    }

    return string;
};

/**
 * Takes string argument to check that it ends in "png", "jpg", or "jpeg"
 * @param {String} imageURL String URL for card
 * @return {Boolean}        Boolean if string ends appropiate ext
 */
const imageUrlConfirm = imageURL => {
    const modString = imageURL.toLowerCase();
    return modString.length > 5 && modString.substring(imageURL.length -3) === "jpg" || modString.substring(imageURL.length -3) === "png" || modString.substring(imageURL.length - 4) === "jpeg";
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

    cardDeleteButton.addEventListener("click", cardRemoveHandler);
    cardLikeButton.addEventListener("click", cardLikeHandler);
    cardImage.addEventListener("click", modalRender);

    return cardElement;
};

/**
 * Iterates through card list array, checks to ensure the URL string is valid then creates and prepends to UL element of the variable "cardList"
 */
const photoCardRender = () => {
    initialCards.forEach((data) => {

        if(imageUrlConfirm(data.link)) {
            const cardElement = cardCreator(data.name, data.link);
            cardList.prepend(cardElement);
        }
    });
};

photoCardRender();
profileEditBtn.addEventListener("click", modalRender);
addCardBtn.addEventListener("click", modalRender);