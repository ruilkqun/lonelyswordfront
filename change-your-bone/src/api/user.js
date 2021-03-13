import request from './http.js'

var baseUrl = "http://192.168.1.118:9000"

export const createAccount = params => request('post',baseUrl + '/create_user', params);

export const getAccountList = params => request('get',baseUrl + '/user_info', params);

