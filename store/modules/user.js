import { mainRequest } from "@/services/api"
import { getCookie } from "@/utils/utils"
import Cookie from 'js-cookie'
const state = () => ({
  noticeList: [],
  addressList: [],
  balance: {
    data: [],
    total: 0
  }
})

const mutations = {
  SET_NOTICE: (state, payload) => {
    state.noticeList = payload;
  },
  SET_ADDRESS: (state, payload) => {
    state.addressList = payload;
  },
  SET_BALANCE: (state, payload) => {
    state.balance = payload;
  }
}

const actions = {
  // 获取公告列表
  async getNotice ({ commit }, formData ) {
    try{
      let {status, data} = await mainRequest(formData);
      console.log('获取公告列表',data);
      if(status === 200 && data && data.status){
        commit('SET_NOTICE', data.data);
      }
    }
    catch(error){
      console.log(`getNotice + ${error}`);
    }
  },

  // 获取收货地址
  async getAddress ({ commit }, formData ) {
    try{
      let {status, data} = await mainRequest(formData);
      console.log('获取收货地址',status,data);
      if(status === 200 && data && data.status){
        commit('SET_ADDRESS', data.data);
      }
    }
    catch(error){
      console.log(`getAddress + ${error}`);
    }
  },

  // 添加收货地址
  async addAddress ({ commit }, formData) {
    return new Promise((resolve, reject) => {
      mainRequest(formData)
        .then(({status, data}) => {
          console.log(data);
          this._vm.$message({
            message: data.msg,
            type: data.status ? 'success' : 'warning'
          });
          resolve();
        })
        .catch(err => {
          console.log(err);
        })
    })
  },

  // 删除收货地址
  async deleteAddress ({ commit }, formData) {
    return new Promise((resolve, reject) => {
      mainRequest(formData)
        .then(({status, data}) => {
          this._vm.$message({
            message: data.msg,
            type: data.status ? 'success' : 'warning'
          });
          resolve();
        })
        .catch(err => {
          console.log(err);
        })
    })
  },

  // 修改收货地址
  async editAddress ({ commit }, formData) {
    return new Promise((resolve, reject) => {
      mainRequest(formData)
        .then(({status, data}) => {
          console.log('修改收货地址', data);
          this._vm.$message({
            message: data.msg,
            type: data.status ? 'success' : 'warning'
          });
          resolve();
        })
        .catch(err => {
          console.log(err);
        })
    })
  },

  // 重置密码
  async editpwd ({}, formData) {
    return new Promise((resolve, reject) => {
      mainRequest(formData)
        .then(res => {
          let {status, data} = res;
          console.log('重置密码', res);
          console.log(data.msg);
          this._vm.$message({
            message: data.msg,
            type: data.status ? 'success' : 'warning'
          });
          if(data.status){
            resolve();
          }
        })
        .catch(err => {
          console.log(err);
        })
    })
  },

  // 流水记录
  async getBalance ({commit}, formData) {
    return new Promise((resolve, reject) => {
      mainRequest(formData)
        .then(res => {
          let {status, data} = res;
          console.log('流水记录', res);
          if(data.status){
            commit("SET_BALANCE", data);
            resolve();
          }
        })
        .catch(err => {
          console.log(err);
        })
    })
  }
}
export default { namespaced: true, state, mutations, actions }
