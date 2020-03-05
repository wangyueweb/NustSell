import { getCategories, mainRequest } from "@/services/api"
import Qs from "qs"
const state = () => ({
  carNumber: 0,
  shopCar: [],
  amount: {},
  payShopCar: {
    list: []
  },
  order: {},
  orderList: [],
  orderDetail: {}
})

const mutations = {
  SET_CARNUMBER: (state, payload) => {
    state.carNumber = payload;
  },
  SET_SHOPCAR: (state, payload) => {
    state.shopCar = payload;
  },
  SET_AMOUNT: (state, payload) => {
    state.amount = payload;
  },
  SET_PAYSHOPCAR: (state, payload) => {
    state.payShopCar = payload;
  },
  SET_ORDER: (state, payload) => {
    state.order = payload;
  },
  SET_ORDERLIST: (state, payload) => {
    state.orderList = payload;
  },
  SET_ORDERDETAIL: (state, payload) => {
    state.orderDetail = payload;
  }
}

const actions = {
  nuxtServerInit({ commit }, { req }) {

  },

  // 获取购物车数量
  getCarnumber({commit}, formData) {
    mainRequest(formData)
      .then(({data, status}) => {
        console.log('获取购物车数量', status, data);
        if(status === 200 && data && data.status){
          commit('SET_CARNUMBER', data.data);
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

  // 购物车选择商品后价格计算
  Amount({commit}, formData){
    mainRequest(formData)
      .then(res => {
        console.log('购物车选择商品后价格计算',res);
        let {data, status} = res;
        if(status === 200 && data){
          commit('SET_AMOUNT', data.data);
        }
      })
      .catch(err => {
        console.log(err);
      })
  },

  // 前往结账 获取购物车列表
  payShopCar({commit}, formData){
    return new Promise((resolve, reject) => {
      mainRequest(formData)
        .then(res => {
          console.log('前往结账 获取购物车列表',res);
          let {data, status} = res;
          if(status === 200 && data){
            if(data.status){
              commit('SET_PAYSHOPCAR', data.data);
              resolve();
            }else{
              this._vm.$message({
                type: 'error',
                message: data.msg
              })
            }
          }
        })
        .catch(err => {
          console.log(err);
        })
    })
  },

  // 购物车提交
  shopCarSubmit({commit}, formData) {
    return new Promise((resolve, reject) => {
      mainRequest(formData)
        .then(res => {
          console.log('购物车提交',res);
          let {data, status} = res;
          if(status === 200 && data){
            if(data.status){
              commit('SET_ORDER', data.data);
              resolve();
            }else{
              this._vm.$message({
                type: 'error',
                message: data.msg
              })
            }
          }
        })
        .catch(err => {
          console.log(err);
        })
    })
  },

  // 我的订单
  getOrderList({commit}, formData) {
    return new Promise((resolve, reject) => {
      mainRequest(formData)
        .then(res => {
          console.log('我的订单',res);
          let {data, status} = res;
          if(status === 200 && data){
            if(data.status){
              commit('SET_ORDERLIST', data.data);
              resolve();
            }else{
              this._vm.$message({
                type: 'error',
                message: data.msg
              })
            }
          }
        })
        .catch(err => {
          console.log(err);
        })
    })
  },

  // 获取支付单详情
  getOrderDetail ({commit}, formData) {
    return new Promise((resolve, reject) => {
      mainRequest(formData)
        .then(res => {
          console.log('获取支付单详情',res);
          let {data, status} = res;
          if(status === 200 && data){
            if(data.status){
              commit('SET_ORDERDETAIL', data.data);
              resolve();
            }else{
              this._vm.$message({
                type: 'error',
                message: data.msg
              })
            }
          }
        })
        .catch(err => {
          console.log(err);
        })
    })
  },

  // 取消订单
  orderCancel ({}, formData) {
    return new Promise((resolve, reject) => {
      mainRequest(formData)
        .then(res => {
          console.log('取消订单',res);
          let {data, status} = res;
          if(status === 200 && data){
            if(data.status){
              resolve();
            }else{
              this._vm.$message({
                type: 'error',
                message: data.msg
              })
            }
          }
        })
        .catch(err => {
          console.log(err);
        })
    })
  },

  // 确认收货
  orderConfirm ({}, formData) {
    return new Promise((resolve, reject) => {
      mainRequest(formData)
        .then(res => {
          console.log('确认收货',res);
          let {data, status} = res;
          if(status === 200 && data){
            if(data.status){
              resolve();
            }else{
              this._vm.$message({
                type: 'error',
                message: data.msg
              })
            }
          }
        })
        .catch(err => {
          console.log(err);
        })
    })
  }
}
export default { namespaced: true, state, mutations, actions }
