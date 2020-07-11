const editButton = document.querySelector('.profile__edit-btn');
const closeButton = document.querySelector('.modal__close-btn');
const editProfileModal = document.querySelector('.modal_type_edit-profile');
const addCardModal = document.querySelector('.modal_type_add-card');
const imageModal = document.querySelector('.modal_type_image');
const form = document.querySelector('.form');
const proNameField = document.querySelector('.profile__name');
const proTitleField = document.querySelector('.profile__title');
const nameInput = document.querySelector('.form__input_type_name');
const titleInput = document.querySelector('.form__input_type_title');

const addCardButtonOpenModal = document.querySelector(".profile__add-btn");
const closeAddCardButton = addCardModal.querySelector(".modal__close-btn");

const modalProfileRender = () => {
  const formData = {
    name: document.querySelector(".profile__name").textContent.trim(),
    title: document.querySelector(".profile__title").textContent
  };

  return formData;
};

const modalAddCardRender = () => {

};

const modalImageOpenRender = () => {

};


addCardButtonOpenModal.addEventListener("click", () => {
  toggleModal(addCardModal);
});

closeAddCardButton.addEventListener("click", () => {
  toggleModal(addCardModal);
});

const toggleModal = (modal) => {
  modal.classList.toggle('modal_is-open');
  /*
  if (modal.classList.contains('modal_is-open')) {
    nameInput.value = proNameField.textContent;
    titleInput.value = proTitleField.textContent;
  }
  */
};

const formSubmitHandler = (e) => {
  e.preventDefault();
  proNameField.textContent = nameInput.value;
  proTitleField.textContent = titleInput.value;
  toggleModal(editProfileModal);
};

form.addEventListener('submit', formSubmitHandler);

editButton.addEventListener('click', () => {
  toggleModal(editProfileModal);
});

closeButton.addEventListener('click', () => {
  toggleModal(editProfileModal);
});

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

const list = document.querySelector(".photos__grid");

initialCards.forEach((data) => {
  const cardTemplate = document.querySelector(".card-template").content.querySelector(".photos__item");
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
