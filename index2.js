const profileEditBtn = document.querySelector(".profile__edit-btn");
const addCardBtn = document.querySelector(".profile__add-btn");
const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanois National Park",
        link: "https://code.s3.yandex.net/web-code/vanois.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
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
    formInputs[1].setAttribute("placeholder", "Title");
    formInputs[1].setAttribute("name", "title");
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
    formInputs[1].setAttribute("name", "title");
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
        modalInput2.setAttribute("type", "text");

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

const formHandler = (e) => {
    e.preventDefault();
    const classNames = e.target.classList;

    if (classNames[classNames.length - 1] === "form-profile") {
        const profileName = document.querySelector(".profile__name");
        const profileTitle = document.querySelector(".profile__title");

        const formInputs = document.querySelectorAll(".form__input");

        profileName.textContent = formInputs[0].value;
        const editBtn = document.createElement("button");
        editBtn.classList.add("profile__edit-btn");
        editBtn.addEventListener("click", modalRender);
        profileName.append(editBtn);

        profileTitle.textContent = formInputs[1].value;
    } else if (classNames[classNames.length - 1] === "form-add") {
        console.log("you have clicked the save for add");
    }

    removeModal();
};

/******
 * IMAGE CARDS RENDER
 */
initialCards.forEach((data) => {
    const cardTemplate = document.querySelector(".card-template").content.querySelector(".photos__item");
    const list = document.querySelector(".photos__grid");
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".photos__image");
    const cardTitle = cardElement.querySelector(".photos__title");
    const cardLikeButton = cardElement.querySelector(".photos__love-btn");
    const cardDeleteButton = cardElement.querySelector(".photos__delete-btn");

    cardTitle.textContent = data.name;
    cardImage.style.backgroundImage = `url(${data.link})`;

    cardDeleteButton.addEventListener("click", () => {
        //remove card
    });

    cardLikeButton.addEventListener("click", () => {
        //ToggleCardState
    });

    cardImage.addEventListener("click", () => {
        //open image modal
        toggleModal(imageModal);
    });

    list.prepend(cardElement);
});

/***
 * 
 * EVENT LISTENERS
 * 
 */
profileEditBtn.addEventListener("click", modalRender);
addCardBtn.addEventListener("click", modalRender);