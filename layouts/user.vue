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
        <el-breadcrumb-item v-if="$route.params.id">{{$route.params.id}}</el-breadcrumb-item>
      </el-breadcrumb>

      <el-row :gutter="15">
        <el-col :span="5">
          <div class="alias">
            <nuxt-link :to="item.path" no-prefetch :class="{currentPage : $route.path === item.path || $route.name === 'myCenter-id' && index === 1}" class="alias-item" v-for="(item, index) in alias" :key="index">
              <i class="iconfont" :class="item.icon" />
              {{item.label}}
            </nuxt-link>
          </div>
        </el-col>
        <el-col :span="19">
          <nuxt />
        </el-col>
      </el-row>
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
          path: '/myCenter/account'
        },
        {
          label: '我的订单',
          icon: 'icon-dingdan',
          path: '/myCenter/order'
        },
        {
          label: '我的收藏',
          icon: 'icon-shoucang1',
          path: '/myCenter/collect'
        },
        {
          label: '安全设置',
          icon: 'icon-anquanshezhi',
          path: '/myCenter/safe'
        },
        {
          label: '地址管理',
          icon: 'icon-dizhi',
          path: '/myCenter/AddressManage'
        },
        {
          label: '资产管理',
          icon: 'icon-yue',
          path: '/myCenter/assetsManage'
        },
        {
          label: '站内公告',
          icon: 'icon-gonggao',
          path: '/myCenter/notice'
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
          if(this.alias[i].path === this.$route.path){
            this.thirdPageName = this.alias[i].label;
            return;
          }else{
            this.thirdPageName = '我的订单';
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
