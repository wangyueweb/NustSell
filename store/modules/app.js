import { mainRequest, getSellInfo } from "@/services/api"
import { getCookie } from "@/utils/utils"
import Cookie from 'js-cookie'
const state = () => ({
  isFixed: false,
  token: '',
  authUser: null,
  article: {},
  articleCtx: {}
})

const mutations = {
  setFixed: (state, payload) => {
    state.isFixed = payload
  },
  SET_TOKEN: (state, payload) => {
    state.token = payload
  },
  SET_USER: (state, payload) => {
    state.authUser = payload
  },
  SET_ARTICLE: (state, payload) => {
    state.article = payload;
  },
  SET_ARTICLECTX: (state, payload) => {
    state.articleCtx = payload;
  }
}

const actions = {
  nuxtServerInit({ commit }, { req }) {
    if(req && req.headers != undefined){
      let cookieArr = req.headers.cookie;
      //获取cookie然后拆成键值对
      if(cookieArr){
        const token = getCookie('token', cookieArr);
        // 检查是否登录
        if(token){
          commit('SET_TOKEN', token);
        }
      }
    }
  },

  // 登录
  login ({ commit }, {userInfo, auto} ) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, status } = await mainRequest(userInfo);
        
        if(status === 200){
          console.log(status, data);
          if(status === 200 && data && data.status){
            // 是否自动登录
            if(auto > 0){
              Cookie.set('token', data.data, {expires: 7});
            }else{
              Cookie.set('token', data.data);
            }
            resolve({
              message: data.msg,
              type: 'success'
            });
          }else{
            reject(data.msg);
          }
        }else{
          reject(`请求状态错误，错误码${status}`);
        }
  
        
      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw new Error('Bad credentials')
        }
        throw error
      }
    })
  },

  // 安全退出
  logout ({ commit }, formData) {
    return new Promise(async (resolve, reject) => {
      try{
        let {status, data} = await mainRequest(formData);
        if(status === 200 && data && data.status){
          Cookie.remove('token');
          commit('SET_TOKEN', '');
          commit('SET_USER', null);
          resolve({
            message: '已退出',
            type: 'success'
          });
        }else{
          reject(data.msg);
        }
      }
      catch(error){
        console.log(error);
        reject(`请求状态错误，错误码${status}`);
      }
    })
    
  },

  // 获取用户基本信息
  getUserInfo ({ commit }, formData ) {
    return new Promise(async (resolve, reject) => {
      try{
        let {status, data} = await mainRequest(formData);
        if(status === 200 && data && data.status){
          commit('SET_USER', data.data);
          resolve();
        }else{
          Cookie.remove('token');
          commit('SET_TOKEN', '');
          commit('SET_USER', null);
          reject(data.msg);
        }
      }
      catch(error){
        reject(`请求状态错误，错误码${status}`);
      }
    })
  },
  // 帮助中心左侧列表分类
  getArticleList ({commit}, formData){
    return new Promise((resolve, reject) => {
      mainRequest(formData)
        .then(res => {
          console.log('帮助中心左侧列表分类',res);
          let {data, status} = res;
          if(status === 200 && data){
            commit('SET_ARTICLE', data.data);
            resolve();
          }
        })
        .catch(err => {
          console.log(err);
        })
    })
  },
  // 获取文章分类下的文章
  getArticelCtx ({commit}, formData) {
    return new Promise((resolve, reject) => {
      mainRequest(formData)
        .then(res => {
          console.log('获取文章分类下的文章',res);
          let {data, status} = res;
          if(status === 200 && data){
            commit('SET_ARTICLECTX', data.data);
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
