import { getCategories, mainRequest } from "@/services/api"
import Qs from "qs"
import { getCookie } from "@/utils/utils"
import Cookie from 'js-cookie'
const state = () => ({
  allCategories: [],
  collect: {},
  browsing: {},
  goodsDetail: {},
})

const mutations = {
  SET_ALLCATEGORIES: (state, payload) => {
    state.allCategories = payload;
  },
  SET_COLLECT: (state, payload) => {
    state.collect = payload;
  },
  SET_BROWSING: (state, payload) => {
    state.browsing = payload;
  },
  SET_GOODSDETAIL: (state, payload) => {
    state.goodsDetail = payload;
  },
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
  getCollect({commit}, formData) {
    mainRequest(formData)
      .then(res => {
        console.log('获取收藏列表',res);
        let {data, status} = res;
        if(status === 200 && data){
          commit('SET_COLLECT', data.data);
        }
      })
  },

  // 最近浏览商品
  getBrowsingList({commit}, formData) {
    mainRequest(formData)
      .then(res => {
        console.log('最近浏览商品',res);
        let {data, status} = res;
        if(status === 200 && data){
          commit('SET_BROWSING', data.data);
        }
      })
      .catch(err => {
        console.log(err);
      })
  },
}
export default { namespaced: true, state, mutations, actions }
