<template>
  <div class="payment">
    <Nav />
    <div class="menu">
      <div id="menu-fixed">
        <el-row class="content" type="flex" align="middle">
          <el-col :span="12" class="left">
            <nuxt-link to="/">
              <img src="../assets/img/logo.png" alt="" class="nuxt-logo" />
              <img src="../assets/img/logo_slogan.png" alt="" class="nuxt-img" />
            </nuxt-link>
          </el-col>
          <el-col :span="12" class="right">
            <TriangleTab :tabs="alias" :selected="$route.name === 'pay-shopCar' ? 0 : $route.name === 'pay-orderCenter' ? 1 : $route.name === 'pay-success1' ? 2 : 0" />
          </el-col>
        </el-row>
      </div>
    </div>
    <nuxt />
    <el-backtop :bottom="100" :right="30"></el-backtop>
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
.nuxt-logo{vertical-align: middle;}
.nuxt-img{vertical-align: middle;margin: 10px 0 0 10px;}
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
