<template>
  <div class="payment">
    <Nav />
    <div class="menu">
      <div id="menu-fixed">
        <el-row class="content" type="flex" align="middle">
          <el-col :span="12" class="left">
            <nuxt-link to="/"><i class="iconfont icon-Logo_deisgn logo"></i></nuxt-link>
            <span class="logo-text">王子易购</span>
            <span class="logo-slogan">实惠商品，送货上门！</span>
          </el-col>
          <el-col :span="12" class="right">
            <TriangleTab :tabs="alias" :selected="$route.name === 'pay-shopCar' ? 0 : $route.name === 'pay-orderCenter' ? 1 : $route.name === 'pay-success1' ? 2 : 0" />
          </el-col>
        </el-row>
      </div>
    </div>
    <nuxt />
  </div>
</template>

<script>
import Nav from '@/components/public/nav'
import TriangleTab from '@/components/public/triangleTab'
export default {
  components: {
    Nav,
    TriangleTab
  },
  data(){
    return {
      alias: [
        {
          value: "",
          label: "我的购物车"
        },
        {
          value: "",
          label: "提交订单中心"
        },
        {
          value: "",
          label: "成功提交订单"
        },
      ],
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/css/theme.less";
.menu{
  background:@theme-white;
  margin-bottom: 10px;
  #menu-fixed{
    @1200();
    .left{
      height: 80px;
      display: flex;
      align-items: center;
      .logo{
        font-size: 70px;
        color: @theme-red;
      }
      .logo-text{
        color: @theme-red;
        font-size: 28px;
        margin: 0 10px;
      }
      .logo-slogan{
        font-size: 22px;
        color: @theme-black;
      }
    }
  }
}
</style>
