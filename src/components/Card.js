class Card {
  constructor(cardData, templateSelector, { handleCardClick, deleteCardBtn }) {
    this._link = cardData.link;
    this._name = cardData.name;
    this._id = cardData._id;
    this._ownerId = cardData.owner._id;
    this._likes = cardData.likes;
    this._templateSelector = templateSelector;
    this._cardTemplate = document.querySelector(this._templateSelector).content.querySelector(".photos__item");
    this._handleCardClick = handleCardClick;
    this._deleteClickBtn = deleteCardBtn;
  }

  activateTrashBtn(profileId) {
    if (profileId === this._ownerId) {
      this._cardDeleteBtn.classList.add("photos__delete-btn_visible");
      this._cardDeleteBtn.style.cursor = "pointer";

      this._cardDeleteBtn.addEventListener("click", () => this._deleteClickBtn());
    }
  }

  generateCard() {
    this._card = this._getCardTemplate().cloneNode(true);
    this._cardImage = this._card.querySelector(".photos__image");
    this._likesNumElement = this._card.querySelector(".photos__likes");
    this._likesNumber = this._likes.length || 0;

    this._cardImage.style.backgroundImage = `url(${this._link})`;
    this._card.querySelector(".photos__title").textContent = this._name;
    this._likesNumElement.textContent = this._likesNumber;
    this._cardDeleteBtn = this._card.querySelector(".photos__delete-btn");


    this._setEventListeners();

    return this._card;
  }

  getId() {
    return this._id;
  }

  remove() {
    this._card.remove();
  }

  _getCardTemplate() {
    return this._cardTemplate;
  }

  _handleLikeIcon() {
    const likeBtn = this._card.querySelector(".photos__love-btn");
    likeBtn.classList.toggle("photos__love-btn_liked");
  }

  _setEventListeners() {
    const cardLikeButton = this._card.querySelector(".photos__love-btn");

    cardLikeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._cardImage.addEventListener("click", () => this._handleCardClick(this._link, this._name));
  }
}

export default Card;