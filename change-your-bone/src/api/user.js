import request from './http.js'

var baseUrl = "http://192.168.1.118:9000"

export const getUserResult =params=>request('get',baseUrl + '/user', params);
