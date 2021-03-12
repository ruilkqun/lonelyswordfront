import request from './http.js'

var baseUrl = 'http://192.168.1.118:9000'

export const getLoginResult = params => request('post', baseUrl + '/login', params)
