import { getCategories, mainRequest } from "@/services/api"
import Qs from "qs"
import { getCookie } from "@/utils/utils"
import Cookie from 'js-cookie'
const state = () => ({
  allCategories: [],
  carNumber: 0,
  collectList: [],
  shopCarList: []
})

const mutations = {
  SET_ALLCATEGORIES: (state, payload) => {
    state.allCategories = payload;
  },
  SET_CARNUMBER: (state, payload) => {
    state.carNumber = payload;
  },
  SET_COLLECTLIST: (state, payload) => {
    state.collectList = payload;
  },
  SET_SHOPCARLIST: (state, payload) => {
    state.shopCarList = payload;
  }
}

const actions = {
  nuxtServerInit({ commit }, { req }) {

  },
  // 获取获取所有分类
  getAllCategories({ commit }, formData) {
    getCategories(formData)
      .then(res => {
        const {data, status, msg} = res.data;
        if(status){
          commit('SET_ALLCATEGORIES', data);
        }
      })
  },

  // 获取购物车数量
  getCarnumber({commit}, formData) {
    mainRequest(formData)
      .then(({data, status}) => {
        if(status === 200 && data){
          commit('SET_CARNUMBER', data.data);
        }
      })
  },

  // 商品列表
  getGoodsList({ commit }, formData) {
    return new Promise((resolve, reject) => {
      mainRequest(Qs.stringify(formData))
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
    })
  },

  // 添加收藏
  addCollect({}, formData) {
    return new Promise((resolve, reject) => {
      mainRequest(Qs.stringify(formData))
        .then(res => {
          console.log(res)
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
    })
  },

  // 获取收藏列表
  getCollectList({commit}, formData) {
    mainRequest(formData)
      .then(res => {
        console.log(res);
        let {data, status} = res;
        if(status === 200 && data){
          commit('SET_COLLECTLIST', data.data);
        }
      })
  },

  // 加入购物车
  addShopCar({}, formData) {
    return new Promise((resolve, reject) => {
      mainRequest(Qs.stringify(formData))
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
    })
  },

  // 获取购物车列表
  getShopCarList ({commit}, formData) {
    mainRequest(formData)
      .then(res => {
        console.log(res);
        let {data, status} = res;
        if(status === 200 && data){
          commit('SET_SHOPCARLIST', data.data);
        }
      })
  }
}
export default { namespaced: true, state, mutations, actions }
