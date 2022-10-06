import cookie from "js-cookie";

// Set Cookie

export const setCookie = (key, value) => {
  if (window) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

// remove from cOOkie

export const removeCookie = (key) => {
  if (window) {
    cookie.remove(key);
  }
};

// get from cookie such as stored token

export const getCookie = (key) => {
  if (window) {
    return cookie.get(key);
  }
};

// set in localstorage

export const setLocalStorage = (key, value) => {
  if (window) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
export const getLocalStorage = (key) => {
  if (window) {
    return localStorage.getItem(key);
  }
};

// remove from localstorage

export const removeLocalStorage = (key) => {
  if (window) {
    localStorage.removeItem(key);
  }
};
