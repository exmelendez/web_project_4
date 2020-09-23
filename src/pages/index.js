import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { addCardBtn, addForm, defaultConfig, profileEditBtn, profileForm, editAvatarBtn, editAvatarModal, editAvatarForm, confirmDeleteBtn } from '../utils/constants.js';
import Api from '../components/Api.js';
import "./index.css";
import Popup from '../components/Popup.js';

/* CONSTANTS */
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-4",
  headers: {
    authorization: "9d5a3bcf-ed42-48db-a52f-3430aec59f7e",
    "Content-Type": "application/json"
  }
});

let sessionUser;

const deleteCardPopup = new Popup(".modal_type_confirm-delete");
deleteCardPopup.setEventListeners();

/* Form Validator Objects */
const editFormValidator = new FormValidator(defaultConfig, profileForm);
const cardFormValidator = new FormValidator(defaultConfig, addForm);
const avatarEditValidator = new FormValidator(defaultConfig, editAvatarForm);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarEditValidator.enableValidation();

/**
 * Renders cards + sets listeners
 * @param {object} cardData card object response from API
 * @param {object} user user object response from API
 */
const cardRender = (cardData, { user }) => {
  const section = new Section({
    cardData,
    renderer: (cardData) => {

      const cardSetup = new Card(cardData, ".card-template", {
        handleCardClick: () => {
          cardImagePopup.open(cardData);
        },
        deleteCardBtn: () => {
          const deleteHandler = () => {
            api.removeCard(cardSetup.getId())
              .then(() => {
                cardSetup.remove();
                deleteCardPopup.close();
                confirmDeleteBtn.removeEventListener("click", deleteHandler);
              })
              .catch((err) => console.log(err));
          };

          confirmDeleteBtn.addEventListener("click", deleteHandler);
          deleteCardPopup.open();
        },
        handleLike: (cardId) => {
          api.changeLikeCardStatus(cardId, cardSetup.isLikedByOwner(user._id))
            .then(card => {
              cardSetup.setLikeList(card.likes);
              cardSetup.toggleLikeBtn(cardSetup.isLikedByOwner(user._id));
            })
            .catch((err) => console.log(err));
        }
      });

      const card = cardSetup.generateCard();
      cardSetup.activateTrashBtn(user._id);
      cardSetup.toggleLikeBtn(cardSetup.isLikedByOwner(user._id));

      const cardImagePopup = new PopupWithImage(".modal_type_image-view");
      cardImagePopup.setEventListeners();

      section.addItem(card);
    }
  }, ".photos__grid");

  section.renderer();
};

/* INITIAL PAGE/CARD RENDER */
api.getUserInfo()
  .then(user => {
    sessionUser = new UserInfo(user);
    sessionUser.setUserInfo(user);

    api.getCardList().then((cardData) => {
      cardRender(cardData, { user });
    })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));

const editAvatarPopup = new PopupWithForm(".modal_type_update-avatar", {
  handleFormSubmit: (inputValues) => {
    api.setUserAvatar(inputValues)
      .then((res) => {
        sessionUser.updateAvatar(res);
        editAvatarPopup.formIsSaving(false);
      })
      .catch((err) => console.log(err));
  }
});

editAvatarPopup.setEventListeners();

/* PROFILE EDIT MODAL */
const editPopup = new PopupWithForm(".modal_type_edit-profile", {
  handleFormSubmit: (inputValues) => {
    api.setUserInfo(inputValues)
      .then((userInfoResponse) => {
        // new UserInfo(userInfoResponse);
        sessionUser.setUserInfo(userInfoResponse);
        editPopup.formIsSaving(false);
      })
      .catch((err) => console.log(err));
  }
});

editPopup.setEventListeners();
profileEditBtn.addEventListener("click", () => {
  editPopup.open();
});

/* ADD CARD MODAL */
const addCardPopup = new PopupWithForm(".modal_type_add-card", {
  handleFormSubmit: (submittedCardData) => {

    api.getUserInfo()
      .then(user => {
        api.addCard(submittedCardData)
          .then((cardData) => {
            cardRender(cardData, { user });
            addCardPopup.formIsSaving(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
});
addCardPopup.setEventListeners();

addCardBtn.addEventListener("click", () => {
  addCardPopup.open();
});

editAvatarBtn.addEventListener("click", () => {
  editAvatarPopup.open();
});