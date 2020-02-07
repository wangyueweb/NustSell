// 基础配置
const baseConfigArr = [
  {
    access: "mianyang_dev",
    version: "1.8.3",
    area: "510700", // 地区代码
    baseURL: "https://shop.shuwuya.cn", // 服务器地址
    service: "https://shop.shuwuya.cn", // 总线地址
    juntuURL: "http://80.2.21.20:2900", // 大成均图服务器地址
    abURL: "http://80.93.23.61:2900", // 安保/上传频率/执法助手
    socket: "http://80.2.33.120:9671", // socket地址
    faceURL: "http://10.65.222.60:9001", // 人脸比对地址
    type: "mock", // 三卡信息来源 返回勤指助手
    homeTitle: "处警单", // 首页标题
    appName: "绵阳智慧接处警", // app名字
    deviceready: false, // 是否需要cordova 设备准备完毕验证
    schedule: true, // 勤务报备
    security: true, // 安保报备
    notice: true, // 公告
    needPhone: true, // 是否需要查询民警联系电话
    arriveDelay: true, // 到达后延迟2分钟
    hotUpdate: true, // 热更新
    getUploadInterval: true, // 从服务器获取上传定位周期
  },
]
export function baseConfig(){
  return baseConfigArr[0];
}
  