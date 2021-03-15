import request from './http.js'

const baseUrl = "http://192.168.1.118:9000";

export const getPlanList = params => request('post',baseUrl + '/plan/plan_info', params);

export const createPlan = params => request('post',baseUrl + '/plan/create_plan', params);

export const adjustSchedule = params => request('post',baseUrl + '/plan/adjust_schedule', params);

export const statisticPlan = params => request('post',baseUrl + '/plan/statistic_info', params);
