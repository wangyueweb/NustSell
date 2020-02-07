import { mainRequest } from "@/services/api"
import { getCookie } from "@/utils/utils"
import Cookie from 'js-cookie'
const state = () => ({
  noticeList: [],
  addressList: [],
})

const mutations = {
  SET_NOTICE: (state, payload) => {
    state.noticeList = payload;
  },
  SET_ADDRESS: (state, payload) => {
    state.addressList = payload;
  }
}

const actions = {
  async getNotice ({ commit }, formData ) {
    try{
      let {status, data} = await mainRequest(formData);
      console.log(status,data);
      if(status === 200 && data && data.status){
        commit('SET_NOTICE', data.data);
      }
    }
    catch(error){
      console.log(`getNotice + ${error}`);
    }
  },
  async getAddress ({ commit }, formData ) {
    try{
      let {status, data} = await mainRequest(formData);
      console.log(status,data);
      if(status === 200 && data && data.status){
        commit('SET_ADDRESS', data.data);
      }
    }
    catch(error){
      console.log(`getAddress + ${error}`);
    }
  },
}
export default { namespaced: true, state, mutations, actions }
