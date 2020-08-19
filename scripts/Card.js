import { openModalWindow } from './index.js';

class Card {
    constructor(data, templateSelector) {
        this._link = data.link;
        this._name = data.name;
        this._templateSelector = templateSelector;
        this._imageModal = document.querySelector(".modal_type_image-view");
    }

    _getCardTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector).content.querySelector(".photos__item");

        return cardTemplate;
    }

    _handleLikeIcon() {
        const likeBtn = this._card.querySelector(".photos__love-btn");

        likeBtn.classList.toggle("photos__love-btn_liked");
    }

    _handleDeleteCard() {
        this._card.remove();
    }

    _handlePreviewPicture() {
        const imageModalContainer = this._imageModal.querySelector(".modal__container_size-image");
        const imageModalTitle = this._imageModal.querySelector(".modal__image-title");

        imageModalContainer.style.backgroundImage = `url(${this._link})`;
        imageModalTitle.textContent = this._name;

        openModalWindow(this._imageModal);
    }

    _setEventListeners() {
        const cardLikeButton = this._card.querySelector(".photos__love-btn");
        const cardDeleteButton = this._card.querySelector(".photos__delete-btn");
        const cardImage = this._card.querySelector(".photos__image");

        cardLikeButton.addEventListener("click", () => {
            this._handleLikeIcon();
        });
        cardDeleteButton.addEventListener("click", () => {
            this._handleDeleteCard();
        });
        cardImage.addEventListener("click", () => {
            this._handlePreviewPicture();
        });
    }

    generateCard() {
        this._card = this._getCardTemplate().cloneNode(true);

        const cardImage = this._card.querySelector(".photos__image");

        cardImage.style.backgroundImage = `url(${this._link})`;
        this._card.querySelector(".photos__title").textContent = this._name;

        this._setEventListeners();

        return this._card;
    }
}

export default Card;