import {getToken} from "../../utils/token";
import axios from "axios";
import {messageUrl} from "../../utils/http";

const request = (options) => {
  const headers = new Headers();

  if (options.setContentType !== false) {
    headers.append("Content-Type", "application/json");
  }

  if (getToken()) {
    headers.append(
      "Authorization",
      "Bearer " + getToken()
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function getCurrentUser() {
  // return request({
  //   url: AUTH_SERVICE + "/users/me",
  //   method: "GET",
  // });
}

export function getUsers() {
  // axios.get(messageUrl + 'users/summaries').then(res => {
  //   return res;
  // })
  // return request({
  //   url: AUTH_SERVICE + "/users/summaries",
  //   method: "GET",
  // });
}

export function countNewMessages(senderId, recipientId) {
  return axios.get(messageUrl + 'messages/' + senderId + '/' + recipientId + '/count')
}

export function findChatMessages(senderId, recipientId) {
  return axios.get(messageUrl + 'messages/' + senderId + '/' + recipientId)
}

export function findChatMessage(id) {
  return axios.get(messageUrl + 'messages/' + id)
}
