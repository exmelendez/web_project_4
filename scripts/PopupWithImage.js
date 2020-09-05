import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(link, caption) {
    this.popupElement.querySelector('.modal__container_size-image').style.backgroundImage = `url(${link})`;
    this.popupElement.querySelector('.modal__image-title').textContent = caption;

    super.open();
  }
}

export default PopupWithImage;