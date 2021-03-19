import request from './http.js'

const baseUrl = "http://192.168.1.118:9000";

export const createClassify = params => request('post',baseUrl + '/article/create_classify', params);

export const getClassifyList = params => request('get',baseUrl + '/article/classify_info', params);

export const removeClassify = params => request('post',baseUrl + '/article/remove_classify', params);

export const updateClassify = params => request('post',baseUrl + '/article/update_classify', params);

export const createArticle = params => request('post',baseUrl + '/article/create_article', params);
