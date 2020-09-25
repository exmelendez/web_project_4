class UserInfo {

  constructor() {
    this._displayNameElement = document.querySelector(".profile__name");
    this._displayAboutElement = document.querySelector(".profile__title");
    this._avatarElement = document.querySelector(".profile__avatar");
  }

  getUserInfo() {
    return {
      name: this._name,
      about: this._about,
      avatar: this._avatar,
      _id: this._id
    };
  }

  setUserElements(name, about, avatar) {
    this._displayNameElement.textContent = name;
    this._displayAboutElement.textContent = about;

    this.updateAvatar({ avatar });
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._id = _id;

    this.setUserElements(name, about, avatar);
  }

  updateAvatar({ avatar }) {
    this._avatar = avatar;
    this._avatarElement.style.backgroundImage = `url(${avatar})`;
  }
}

export default UserInfo;