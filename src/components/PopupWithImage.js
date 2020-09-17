import Popup from './Popup.js';

class PopupWithImage extends Popup {

  open({ link, name }) {
    this._popupElement.querySelector('.modal__container_size-image').style.backgroundImage = `url(${link})`;
    this._popupElement.querySelector('.modal__image-title').textContent = name;

    super.open();
  }
}

export default PopupWithImage;