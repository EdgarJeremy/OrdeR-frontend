import axios from 'axios';
import _ from 'lodash';
// import swal from 'sweetalert';
// import config from '../config.json';

const req = axios.create({
    baseURL: 'http://localhost:1234/api'
});

const R = function (config = {}) {
    let { basepoint, endpoint = '', method, data } = config;
    method = _.lowerCase(method);
    let options = {
        headers: {
            'x-access-token': localStorage.getItem('accessToken'),
            'x-refresh-token': localStorage.getItem('refreshToken'),
            'x-socket-id': localStorage.getItem('socketid')
        }
    }
    if (method === 'post' || method === 'put') {
        return req[method](`${basepoint}/${endpoint}`, data, options).then(successHandler);
    } else {
        return req[method](`${basepoint}/${endpoint}`, {
            ...options,
            params: data
        }).then(successHandler);
    }
}

const successHandler = function (res) {
    if (res.headers['x-access-token'] && res.headers['x-refresh-token']) {
        console.log('renew');
        localStorage.setItem('accessToken', res.headers['x-access-token']);
        localStorage.setItem('refreshToken', res.headers['x-refresh-token']);
    }
    return res.data;
}

export const Auth = {

    basepoint: '/auth',

    login: function (data) {
        return R({
            basepoint: this.basepoint,
            method: 'POST',
            data
        }).then((res) => {
            const { token, refreshToken } = res.data.tokens;
            localStorage.setItem('accessToken', token);
            localStorage.setItem('refreshToken', refreshToken);
            return res;
        });
    },

    check: function () {
        return R({
            basepoint: this.basepoint,
            endpoint: `?t=${(new Date()).getTime()}`,
            method: 'GET'
        });
    },

    logout: function () {
        return R({
            basepoint: this.basepoint,
            method: 'DELETE'
        }).then((res) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            return res;
        });
    }

}

export const Menu = {

    basepoint: '/menus',

    findAll: function() {
        return R({
            basepoint: this.basepoint,
            method: 'GET'
        });
    },

    create: function (payload) {
        return R({
            basepoint: this.basepoint,
            method: 'POST',
            data: payload
        });
    }

}

export const User = {

    basepoint: '/users',

    findAll: function() {
        return R({
            basepoint: this.basepoint,
            method: 'GET'
        });
    },

    create: function (payload) {
        return R({
            basepoint: this.basepoint,
            method: 'POST',
            data: payload
        });
    }

}

export const Order = {

    basepoint: '/orders',

    findAll: function() {
        return R({
            basepoint: this.basepoint,
            method: 'GET'
        });
    },

    create: function (payload) {
        return R({
            basepoint: this.basepoint,
            method: 'POST',
            data: payload
        });
    }

}