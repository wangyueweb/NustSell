import axios from "axios";
import { Notification } from 'element-ui';
// import {store} from "~/store";
// console.log(axios)

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

class HttpRequest {
  constructor () {
    this.queue = {
      // baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3001}`
    }
  }
  destroy (config, url) {
    delete this.queue[url]
    if (config && config.loading) {
    //   store.commit('setLoading', false);
    }
  }
  interceptors (instance, url) {
    
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 取消多次请求
    //   config.cancelToken = store.state.app.source.token;
      // console.log(Object.keys(this.queue));
      // 添加全局的loading...
      if (config.loading) {
        // store.commit('setLoading', true);
      }
      
      this.queue[url] = true;
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        this.destroy(res.config, url);
        const { config, data, status } = res;
        // console.log(res);
        // console.log(data);
        // console.log(data.status);
        // console.log(status);
        // console.log(codeMessage[status]);
        const errorText = codeMessage[status] || data.status;
        if(status !== 200){
          Notification({
            title: errorText,
            message: `请求错误 ${status}: ${url}`,
          })
        }

        return { config, data, status };
      }, 
      error => {
        this.destroy(error.config, url);
        const _this = this;
        const { config, data, status } = error;
        const errorText = codeMessage[status] || data.status;
        Notification({
          title: errorText,
          message: `请求错误 ${status}: ${url}`,
        })
        // If config does not exist or the retry option is not set, reject
        if (!config || !config.retry) return Promise.reject(error);
        
        // Create new promise to handle exponential backoff
        const backoff = new Promise(function(resolve) {
          setTimeout(function() {
            resolve();
          }, config.retryDelay || 1);
        });

        // Return the promise in which recalls axios to retry the request
        return backoff.then(function() {
          return _this.request(config);
        });

      })
  }
  request (options) {
    const instance = axios.create({
      timeout: 10000, // 请求超时时间
      retryDelay: 1000
    })
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
const service = new HttpRequest();
export default service
