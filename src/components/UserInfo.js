class UserInfo {

  constructor({ name, about, avatar }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._displayNameElement = document.querySelector(".profile__name");
    this._displayAboutElement = document.querySelector(".profile__title");
    this._avatarElement = document.querySelector(".profile__avatar");

    this._setUserInfo(this.getUserInfo());
  }

  getUserInfo() {
    return {
      name: this._name,
      about: this._about,
      avatar: this._avatar
    };
  }

  updateAvatar({ avatar }) {
    this._avatarElement.style.backgroundImage = `url(${avatar})`;
  }

  _setUserInfo({ name, about, avatar }) {
    this._displayNameElement.textContent = name;
    this._displayAboutElement.textContent = about;
    this._avatarElement.style.backgroundImage = `url(${avatar})`;
  }
}

export default UserInfo;