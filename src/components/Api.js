class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  addCard({ link, name }) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        link,
        name
      })
    })
      .then((res) => res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        headers: this._headers,
        method: "DELETE"
      })
        .then((res) => res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`));

    } else {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        headers: this._headers,
        method: "PUT"
      })
        .then((res) => res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`));
    }
  }

  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then((res) => res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then((res) => res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`));
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE"
    })
      .then((res) => res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`));
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar
      })
    })
      .then((res) => res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`));
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name,
        about
      })
    })
      .then((res) => res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`));
  }
}

export default Api;
