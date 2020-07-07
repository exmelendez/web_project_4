const editButton = document.querySelector('.profile__edit-btn');
const closeButton = document.querySelector('.modal__close-btn');
const modal = document.querySelector('.modal');
const form = document.querySelector('.form');
const proNameField = document.querySelector('.profile__name');
const proTitleField = document.querySelector('.profile__title');
const nameInput = document.querySelector('.form__input_type_name');
const titleInput = document.querySelector('.form__input_type_title');

const toggleModal = () => {
  modal.classList.toggle('modal_is-open');
  if (modal.classList.contains('modal_is-open')) {
    nameInput.value = proNameField.textContent;
    titleInput.value = proTitleField.textContent;
  }
};

editButton.addEventListener('click', toggleModal);
closeButton.addEventListener('click', toggleModal);

form.addEventListener('submit', (e) => {
  e.preventDefault(); //by default a submit refreshes page, this prevents this behavior

  proNameField.textContent = nameInput.value;
  proTitleField.textContent = titleInput.value;

  toggleModal();
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
  });

  list.prepend(cardElement);
});
