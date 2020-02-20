import { getCategories, mainRequest } from "@/services/api"
import Qs from "qs"
import { getCookie } from "@/utils/utils"
import Cookie from 'js-cookie'
const state = () => ({
  allCategories: [],
  carNumber: 0,
  collect: {},
  shopCar: [],
  browsing: {},
  goodsDetail: {},
  article: {}
})

const mutations = {
  SET_ALLCATEGORIES: (state, payload) => {
    state.allCategories = payload;
  },
  SET_CARNUMBER: (state, payload) => {
    state.carNumber = payload;
  },
  SET_COLLECT: (state, payload) => {
    state.collect = payload;
  },
  SET_SHOPCAR: (state, payload) => {
    state.shopCar = payload;
  },
  SET_BROWSING: (state, payload) => {
    state.browsing = payload;
  },
  SET_GOODSDETAIL: (state, payload) => {
    state.goodsDetail = payload;
  },
  SET_ARTICLE: (state, payload) => {
    state.article = payload;
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
  getCollect({commit}, formData) {
    mainRequest(formData)
      .then(res => {
        console.log('获取搜藏列表',res);
        let {data, status} = res;
        if(status === 200 && data){
          commit('SET_COLLECT', data.data);
        }
      })
  },

  // 加入购物车
  addShopCar({}, formData) {
    mainRequest(Qs.stringify(formData))
      .then(res => {
        let {status, data} = res;
        console.log(res);
        if(status === 200 && data){
          this._vm.$message({
            type: data.status ? "success" : "error",
            message: data.msg,
          });
        }else{
          this._vm.$message({
            type: "error",
            message: '网络连接失败',
          });
        }
      })
      .catch(err => {
        console.log(err);
      })
  },

  // 获取购物车列表
  getShopCar ({commit}, formData) {
    return new Promise((resolve, reject) => {
      mainRequest(formData)
        .then(res => {
          console.log('获取购物车列表',res);
          let {data, status} = res;
          if(status === 200 && data){
            commit('SET_SHOPCAR', data.data);
            resolve();
          }else{
            reject(data.msg);
          }
        })
        .catch(err => {
          reject(data.err);
        })
    })
  },

  // 购物车数量+-
  handleShopCarNumber ({}, formData) {
    return new Promise((resolve, reject) => {
      mainRequest(formData)
        .then(res => {
          console.log(res);
          let {data, status} = res;
          if(status === 200 && data){
            resolve();
          }else{
            reject(data.msg);
          }
        })
        .catch(err => {
          reject(data.err);
        })
    })
  },

  // 删除购物车+-
  delShopCar ({}, formData) {
    return new Promise((resolve, reject) => {
      mainRequest(formData)
        .then(res => {
          console.log(res);
          let {data, status} = res;
          if(status === 200 && data){
            resolve(data.msg);
          }else{
            reject(data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          reject(err);
        })
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

  // 帮助中心左侧列表分类
  getArticleList({commit}, formData){
    mainRequest(formData)
      .then(res => {
        console.log('帮助中心左侧列表分类',res);
        let {data, status} = res;
        if(status === 200 && data){
          commit('SET_ARTICLE', data.data);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
}
export default { namespaced: true, state, mutations, actions }
