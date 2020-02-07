import axios from './request.js'
import { baseConfig } from '~/utils/config.js'
// import './mock.js'

/**
 * @desc 商品
 * @param { String } method: categories.getallcat
*/
export function getCategories (params) {
  return axios.request({
    url: '/api.html',
    baseURL: baseConfig().service,
    method: 'get',
    params
  })
}

/**
 * @desc 注册
*/
export function mainRequest (data, method) {
  return axios.request({
    url: '/api.html',
    baseURL: baseConfig().service,
    method: method || 'post',
    data
  })
}
