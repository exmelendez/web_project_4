class UserInfo {

  constructor({ name, about }) {
    this._name = name;
    this._about = about;
    this._displayNameElement = document.querySelector(".profile__name");
    this._displayAboutElement = document.querySelector(".profile__title");

    this._setUserInfo(this.getUserInfo());
  }

  getUserInfo() {
    return {
      name: this._name,
      about: this._about
    };
  }

  _setUserInfo({ name, about }) {
    this._displayNameElement.textContent = name;
    this._displayAboutElement.textContent = about;
  }

}

export default UserInfo;