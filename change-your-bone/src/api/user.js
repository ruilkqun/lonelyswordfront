import request from './http.js'

var baseUrl = "http://192.168.1.118:9000"

export const getUserResult =params=>request('get',baseUrl + '/user', params);



export const getClusterList =params=>request('get',baseUrl + '/user', params);
export const getStatusList =params=>request('get',baseUrl + '/user', params);
export const getRepairList =params=>request('get',baseUrl + '/user', params);
export const updateRepairList =params=>request('get',baseUrl + '/user', params);
export const writeRepairList =params=>request('get',baseUrl + '/user', params);
export const getRepairAllList =params=>request('get',baseUrl + '/user', params);
export const updateMistake =params=>request('get',baseUrl + '/user', params);
