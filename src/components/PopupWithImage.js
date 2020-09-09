import Popup from './Popup.js';

class PopupWithImage extends Popup {

  open(link, caption) {
    this._popupElement.querySelector('.modal__container_size-image').style.backgroundImage = `url(${link})`;
    this._popupElement.querySelector('.modal__image-title').textContent = caption;

    super.open();
  }
}

export default PopupWithImage;