import 'whatwg-fetch';
import * as Cookies from 'js-cookie';

export const httpGet = (url) => {
    return fetch(url, {
        headers: createHeaders(),
    })
    .then(checkStatus)
    .then(response => response.json());
};

export const httpPost = (url, data) => {
    return fetch(url, {
        method: 'POST',
        headers: createHeaders(),
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
};

const createHeaders = (headers = {}) => {
    return Object.assign({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': Cookies.get('RosaJWT'),
    }, headers);
}

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};