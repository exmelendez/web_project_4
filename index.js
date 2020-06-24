const editButton = document.querySelector('.profile__edit-btn');
const closeButton = document.querySelector('.modal__close-btn');
const modal = document.querySelector('.modal');
const form = document.querySelector('.form');
const proNameField = document.querySelector('.profile__name');
const proTitleField = document.querySelector('.profile__title');
const nameInput = document.querySelector('.form__input_type_name');
const titleInput = document.querySelector('.form__input_type_title');

toggleModal = () => {
  modal.classList.toggle('modal_is-open');
  if(modal.classList.contains('modal_is-open')) {
    let test = document.querySelector('.profile__name').value;
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
