import { getCookie } from "@/utils/utils"
export default function ({ app, store, req, redirect }) {
  // console.log(store)
  // if (store.state.locales.indexOf(locale) === -1) {
    // return error({
    //   message: 'This language could not be found.',
    //   statusCode: 404
    // })
  // }
  store.dispatch('app/nuxtServerInit', {req});
}