<template>
  <div>
    <Nav />
    <Menu/>
    <div class="main-wrapper" :class="{nick : isFixed}">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <nuxt-link to="/myCenter">用户中心</nuxt-link>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          {{thirdPageName}}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.params.title">{{$route.params.title}}</el-breadcrumb-item>
      </el-breadcrumb>
      
        <nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import Nav from '@/components/public/nav'
import Menu from '@/components/public/menu'
import Footer from '@/components/public/footer'
import { mapState } from 'vuex';
export default {
  components: {
    Nav,
    Menu,
    Footer
  },
  data(){
    return {
      alias: [
        {
          label: '账户信息',
          icon: 'icon-icon-user',
          name: 'myCenter-account'
        },
        {
          label: '我的订单',
          icon: 'icon-dingdan',
          name: 'myCenter-order'
        },
        {
          label: '我的订单',
          icon: 'icon-dingdan',
          name: 'myCenter-order-id'
        },
        {
          label: '我的收藏',
          icon: 'icon-shoucang1',
          name: 'myCenter-collect'
        },
        {
          label: '安全设置',
          icon: 'icon-anquanshezhi',
          name: 'myCenter-safe'
        },
        {
          label: '地址管理',
          icon: 'icon-dizhi',
          name: 'myCenter-addressManage'
        },
        {
          label: '资产管理',
          icon: 'icon-yue',
          name: 'myCenter-assetsManage'
        },
        {
          label: '站内公告',
          icon: 'icon-gonggao',
          name: 'myCenter-notice'
        },
        {
          label: '网站公告',
          icon: 'icon-gonggao',
          name: 'myCenter-notice-id'
        },
      ],
      thirdPageName: ''
    }
  },
  computed: {
    ...mapState({
      isFixed: state => state.app.isFixed
    }),
    thirdPage: {
      get: function(){
        for(let i in this.alias){
          if(this.alias[i].name === this.$route.name){
            this.thirdPageName = this.alias[i].label;
            return;
          }
        }
      },
      set: function(val){}
    },
  },
  watch: {
    thirdPage: function(){}
  },
  methods:{},
}
</script>

<style lang="less" scoped>
@import "../assets/css/theme.less";
.breadcrumb{
  margin: @bianju 0;
}
.main-wrapper{
  padding-bottom: 80px;
}
.alias{
  padding: 30px 0;
  background: @theme-white;
  .alias-item{
    font-size: 16px;
    padding: 10px 0;
    @centered();
    &:hover{
      color: @theme-red;
    }
    .iconfont{
      font-size: 20px;
      margin-right: 10px;
    }
  }
  .currentPage{
    color: @theme-red;
  }
}
</style>
