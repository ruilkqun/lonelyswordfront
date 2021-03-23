import request from './http.js'

const baseUrl = "http://192.168.1.118:9000";

export const createAccount = params => request('post',baseUrl + '/user/create_user', params);

export const getAccountList = params => request('post',baseUrl + '/user/user_info', params);

export const removeAccount = params => request('post',baseUrl + '/user/remove_user', params);

export const changeAccountRole = params => request('put',baseUrl + '/user/change_account_role', params);

export const changePassword = params => request('put',baseUrl + '/user/change_password', params);
