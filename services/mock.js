import Mock from 'mockjs'
console.log(Mock);

Mock.mock('https://shop.shuwuya.cn/api.html?method=categories.getallcat',{
  errmsg:"",
  errno: 0,
  data:[
    {name: 1},{name: 2}
  ]
})
