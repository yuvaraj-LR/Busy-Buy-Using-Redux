import Cookies from 'js-cookie';

// Setting cookie.
export const setCookie = (cookieName, value, expiryDate) => {
    Cookies.set(cookieName, value, { expires: expiryDate });
    console.log("Cookiee Seted.");
    return true;
};

// Getting cookie.
export const getCookie = (cookieName) => {
    const  cookie = Cookies.get(cookieName);
    return cookie;
};

// Removing cookie.
export const removeCookie = (cookieName) => {
    Cookies.remove(cookieName);
    console.log("Cookiee Removed.");
};
