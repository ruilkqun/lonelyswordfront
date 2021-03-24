import request from './http.js'

const baseUrl = "http://192.168.1.118:9000";

export const upLoadImg = params => request('post',baseUrl + '/img/upload_img', params);

export const deleteImg = params => request('post',baseUrl + '/img/delete_img', params);

export const upLoadUserImg = params => request('post',baseUrl + '/img/upload_user_img', params);

export const getUserImg = params => request('post',baseUrl + '/img/get_user_img', params);
