class UserInfo {

  constructor({ userName, userJob }) {
    this._userName = userName;
    this._userJob = userJob;
    this._displayNameElement = document.querySelector(".profile__name");
    this._displayTitleElement = document.querySelector(".profile__title");
  }

  getUserInfo() {
    return {
      userName: this._userName,
      userJob: this._userJob
    };
  }

  setUserInfo(data) {
    this._displayNameElement.textContent = this._userName;
    this._displayTitleElement.textContent = this._userJob;
  }

}

export default UserInfo;