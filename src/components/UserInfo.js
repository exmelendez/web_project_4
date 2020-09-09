class UserInfo {

  constructor({ name, title }) {
    this._name = name;
    this._title = title;
    this._displayNameElement = document.querySelector(".profile__name");
    this._displayTitleElement = document.querySelector(".profile__title");
  }

  getUserInfo() {
    return {
      name: this._name,
      title: this._title
    };
  }

  setUserInfo(data) {
    this._displayNameElement.textContent = this._name;
    this._displayTitleElement.textContent = this._title;
  }

}

export default UserInfo;