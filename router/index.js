/**
 * nuxt的路由菜单配置
 * @description 仅仅只用于侧边栏的菜单显示和权限,其它的不做任何功能
 */
const menus = [
  {
    meta: {
      requireAuth: true, //菜单权限
      title: "用户中心" //菜单名
      // icon: "fa fa-bar-chart" //菜单图标
    },
    path: "/myCenter/:id?",
    name: "myCenter-id"
  },
];

/**
 * 递归查询路由权限
 * @param {*} list
 * @param {*} menu
 */
const iterator = list => {
  for (let i in list) {
    for (let m in menus) {
      if (list[i].name === menus[m].name && list[i].path === menus[m].path) {
        list[i].meta = menus[m].meta;
      }
    }
    // if (list[item].children && list[item].children.length > 0) {
    //   iterator(list[item].children);
    // } else {
    //   return list;
    // }
  }
};

export default (routes, resolve) => {
  routes = iterator(routes);
};