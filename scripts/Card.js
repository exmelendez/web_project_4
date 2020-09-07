import { openModalWindow } from './index.js';

class Card {
    constructor(data, templateSelector, { handleImageClick }) {
        this._link = data.link;
        this._name = data.name;
        this._templateSelector = templateSelector;
        this._imageModal = document.querySelector(".modal_type_image-view");
        this._cardTemplate = document.querySelector(this._templateSelector).content.querySelector(".photos__item");
        this._handleImageClick = handleImageClick;
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
        this._cardImage.addEventListener("click", () => this._handleImageClick(this._link, this._name));
    }
}

export default Card;