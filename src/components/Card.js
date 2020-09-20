class Card {
  constructor(cardData, templateSelector, { handleCardClick, deleteCardBtn, handleLike }) {
    this._link = cardData.link;
    this._name = cardData.name;
    this._id = cardData._id;
    this._ownerId = cardData.owner._id;
    this._likes = cardData.likes;
    this._likesNumber = this._likes.length || 0;
    this._templateSelector = templateSelector;
    this._cardTemplate = document.querySelector(this._templateSelector).content.querySelector(".photos__item");
    this._handleCardClick = handleCardClick;
    this._deleteClickBtn = deleteCardBtn;
    this._handleLike = handleLike;
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
    this._likesNumElement.textContent = this._likesNumber;
    this._cardImage.style.backgroundImage = `url(${this._link})`;
    this._card.querySelector(".photos__title").textContent = this._name;
    this._cardDeleteBtn = this._card.querySelector(".photos__delete-btn");
    this._likeBtn = this._card.querySelector(".photos__love-btn");

    this._setEventListeners();

    return this._card;
  }

  getId() {
    return this._id;
  }

  isLikedByOwner(userId) {
    let matches = 0;

    if (this._likes.length > 0) {
      this._likes.forEach(likeItem => {
        if (likeItem._id === userId) {
          matches++;
        }
      });
    }
    return matches > 0;
  }

  remove() {
    this._card.remove();
  }

  setLikeList(newList) {
    this._likes = newList;
  }

  toggleLikeBtn(likedByOwner) {
    const heartFillClass = "photos__love-btn_liked";

    likedByOwner ? this._likeBtn.classList.add(heartFillClass) : this._likeBtn.classList.remove(heartFillClass);
  }

  _getCardTemplate() {
    return this._cardTemplate;
  }

  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => {
      this._handleLike(this._id);
    });

    this._cardImage.addEventListener("click", () => this._handleCardClick(this._link, this._name));
  }
}

export default Card;