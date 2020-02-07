<template>
  <div>
    <Nav />
    <Menu/>
    <div class="main-wrapper" :class="{nick : isFixed}">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <nuxt-link to="/help">帮助中心</nuxt-link>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          {{thirdPageName}}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.params.id">{{$route.params.id}}</el-breadcrumb-item>
      </el-breadcrumb>

      <el-row :gutter="15">
        <el-col :span="5">
          <div class="title">帮助中心</div>
          <div class="alias">
            <!-- <nuxt-link :to="item.path" no-prefetch :class="{currentPage : $route.path === item.path || $route.name === 'myCenter-id' && index === 1}" class="alias-item" v-for="(item, index) in alias" :key="index">
              {{item.label}}
            </nuxt-link> -->
            
            <nuxt-link :to="item.label" v-for="(item, index) in alias" :key="index" class="alias-item">
              <div :class="item.className">{{item.label}}</div>
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
          label: "新手帮助",
          value: "",
          className: 'bold'
        },
        {
          label: "交易条款协议",
          value: ""
        },
        {
          label: "注册条款",
          value: ""
        },
        {
          label: "支付方式说明",
          value: ""
        },

        {
          label: "购物指南",
          value: "",
          className: 'bold'
        },
        {
          label: "订单流程",
          value: ""
        },
        {
          label: "验货与签收",
          value: ""
        },
        {
          label: "订单配送",
          value: ""
        },

        {
          label: "支付/配送",
          value: "",
          className: 'bold'
        },
        {
          label: "支付方式",
          value: ""
        },
        {
          label: "配送方式",
          value: ""
        },
        {
          label: "配送时间及运费",
          value: ""
        },

        {
          label: "售后服务",
          value: "",
          className: 'bold'
        },
        {
          label: "退货",
          value: ""
        },
        {
          label: "退款声明",
          value: ""
        },

        {
          label: "会员服务",
          value: "",
          className: 'bold'
        },
        {
          label: "找回密码",
          value: ""
        },
        {
          label: "联系我们",
          value: ""
        },

        {
          label: "王子客服",
          value: "",
          className: 'bold'
        },
        {
          label: "在线客服",
          value: ""
        },
        {
          label: "Email: wzeg@gmail.com",
          value: ""
        },
        {
          label: "QQ客服: 280261601",
          value: "",
          push: 8,
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
.title{
  height: 34px;
  line-height: 34px;
  background: @theme-black;
  color: @theme-white;
  text-align: center;
}
.alias{
  padding: 30px 20px;
  background: @theme-white;
  
  .alias-item{
    font-size: 16px;
    padding: 10px 0;
    display: block;
    .bold{
      font-weight: 700;
    }
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
