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

const removeModal = () => {
    const modal = document.querySelector(".modal");
    modal.remove();
};

const openModal = () => {
    const modalDiv = document.querySelector(".modal");
    modalDiv.classList.toggle('modal_is-open');
};

const appendModalToDom = (modal) => {
    const body = document.querySelector(".page");
    body.append(modal);
};

const closeModalBtnActivate = () => {
    const closeModalBtn = document.querySelector(".modal__close-btn");
    closeModalBtn.addEventListener("click", removeModal);
};

const modalProfileData = () => {
    const formData = {
        name: document.querySelector(".profile__name").textContent.trim(),
        title: document.querySelector(".profile__title").textContent
    };

    return formData;
};

const modalProfileRender = (modalElement) => {
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

const modalAddRender = (modalElement) => {
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

const modalRender = (e) => {
    const modalType = e.toElement.className;
    const modalTemplate = document.querySelector(".modal-template").content.querySelector(".modal");
    const modalElement = modalTemplate.cloneNode(true);

    if (modalType === ".photos__image") {
        // CODE HERE
    } else {
        const modalContainer = modalElement.querySelector(".modal__container");

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

const addCard = (title, url) => {
    const cardElement = cardCreator(title, url);
    cardList.prepend(cardElement);
};

const formHandler = (e) => {
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

const cardLikeHandler = (e) => {
    e.target.classList.toggle('photos__love-btn_liked');

    /* Find innerText/title of card */
    let cardTitle = e.path[1].childNodes[1].innerText;

    /* Determine if card title was programmatically altered due to length, alter if '.' found */
    if(cardTitle.includes('.')) {
        cardTitle = cardTitle.slice(0, -3);
    }

    /* Find index of card object in array */
    const cardIndex = initialCards.findIndex(card => card.name.includes(cardTitle));

    /* determine state of "like" property and toggle boolean */
    if(initialCards[cardIndex].like) {
        initialCards[cardIndex].like = false;
    } else {
        initialCards[cardIndex].like = true;
    }
};

/******
 * IMAGE CARDS RENDER
 */

//  function that trims string in photo card in order to mantain style uniformity
const stringTrimmer = string => {
    if(string.length > 18) {
        string = string.slice(0, 15) + "...";
    }

    return string;
};

/* Takes string URL as argument, confirms that it ends in jpg or png */
const imageUrlConfirm = imageURL => {
    const modString = imageURL.toLowerCase();
    return modString.length > 5 && modString.substring(imageURL.length -3) === "jpg" || modString.substring(imageURL.length -3) === "png" || modString.substring(imageURL.length - 4) === "jpeg";
};

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
        //remove card
    });

    cardLikeButton.addEventListener("click", cardLikeHandler);

    /*
    cardLikeButton.addEventListener("click", () => {
        //ToggleCardState
        cardLikeButton.classList.toggle('photos__love-btn_liked');
        listLikeModifier();
    });
    */

    cardImage.addEventListener("click", () => {
        //open image modal
        toggleModal(imageModal);
    });

    return cardElement;

};

const photoCardRender = () => {
    initialCards.forEach((data) => {

        if(imageUrlConfirm(data.link)) {
            const cardElement = cardCreator(data.name, data.link);
            cardList.prepend(cardElement);
        }
    });
};

photoCardRender();

/***
 * 
 * EVENT LISTENERS
 * 
 */
profileEditBtn.addEventListener("click", modalRender);
addCardBtn.addEventListener("click", modalRender);