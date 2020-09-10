class Card {
  constructor(data, templateSelector, { handleCardClick }) {
    this._link = data.url;
    this._name = data.title;
    this._templateSelector = templateSelector;
    this._imageModal = document.querySelector(".modal_type_image-view");
    this._cardTemplate = document.querySelector(this._templateSelector).content.querySelector(".photos__item");
    this._handleCardClick = handleCardClick;
  }

  generateCard() {
    this._card = this._getCardTemplate().cloneNode(true);
    this._cardImage = this._card.querySelector(".photos__image");

    this._cardImage.style.backgroundImage = `url(${this._link})`;
    this._card.querySelector(".photos__title").textContent = this._name;

    this._setEventListeners();

    return this._card;
  }

  _getCardTemplate() {
    return this._cardTemplate;
  }

  _handleDeleteCard() {
    this._card.remove();
    this._card = null;
  }

  _handleLikeIcon() {
    const likeBtn = this._card.querySelector(".photos__love-btn");
    likeBtn.classList.toggle("photos__love-btn_liked");
  }

  _setEventListeners() {
    const cardLikeButton = this._card.querySelector(".photos__love-btn");
    const cardDeleteButton = this._card.querySelector(".photos__delete-btn");

    cardLikeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });
    cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });
    this._cardImage.addEventListener("click", () => this._handleCardClick(this._link, this._name));
  }
}

export default Card;