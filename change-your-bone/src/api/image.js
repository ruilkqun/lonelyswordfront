import request from './http.js'

const baseUrl = "http://192.168.1.118:9000";

export const upLoadImg = params => request('post',baseUrl + '/img/upload_img', params);
