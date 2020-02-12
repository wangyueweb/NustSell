<template>
	<div class="menu" id="menu">
    <div :class="{menu_fixed : isFixed}" v-if="allCategories.length > 0">
      <el-row class="content" style="display: flex;align-items: center;flex-wrap: wrap;">
        <el-col :span="isFixed ? 3 : 24">
          <div class="logo">
            <nuxt-link :to="{path: '/'}">
              <el-image :src="require('@/assets/img/logo.png')" style="width:65px;"></el-image>
            </nuxt-link>
          </div>
        </el-col>
        <el-col :span="15">
          <el-row>
            <el-col :span="4" v-for="(item, index) in allCategories" :key="index" class="menu-type">
              <el-popover
                placement="bottom"
                trigger="hover"
                :visible-arrow="true"
                >
 
                  <div class="second" type="flex" justify="center" align="middle">
                    <div class="secondList" v-for="(itemJ, indexJ) in item.child" :key="indexJ" type="flex" justify="center" align="middle">
                      <div class="link" @click="$router.push({name: 'categorylist', query: itemJ})" style="font-size:18px">
                        {{itemJ.name}}
                      </div>
                    </div>
                  </div>

                <div slot="reference">{{item.name}}</div>
              </el-popover>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="isFixed ? 5 : 6" :push="isFixed ? 0 : 2">
          <el-row type="flex" justify="space-between" align="center">
            <el-col :span="18">
              <el-input
                placeholder="想吃啥？搜一搜"
                v-model="value"
                clearable
                class="search"
                suffix-icon="el-icon-search"
                :clearable="false">
              </el-input>
            </el-col>
            <el-col :span="5">
              <div class="shop-car">
                <div class="width:300px;position:relative">
                  <el-popover
                    :visible-arrow="false"
                    placement="bottom"
                    trigger="focus"
                    style="padding:0"
                    v-model="visible"
                  >
                    <div class="content" style="width:382px;height: 100%;padding:11px 25px 25px;box-sizing:border-box;">
                      <div v-if="carNumber > 0">
                        <div @click="visible = !visible" style="text-align:right;">
                          <i class="iconfont icon-guanbi" style="font-size:20px;"></i>
                        </div>
                        <div class="count">
                          <div>
                            商品数量
                            <br>
                            {{carNumber}}
                          </div>
                          <div>
                            购物车小计
                            <br>
                            P {{amount}}
                          </div>
                        </div>
                        <el-button type="danger" class="large-btn" @click="$router.push({name : 'pay-shopCar'})">
                          前往结账
                        </el-button>
                        <div class="scroll">
                          <div v-for="(item, index) in list" :key="index" class="item">
                            <div class="img-box" @click="$router.push({name: 'goodsDetail', query: {id: item.id}})">
                              <el-image style="width:94px; height:94px" :src="item.products.image_path"></el-image>
                            </div>
                            <div class="content-box">
                              <div class="name">
                                {{item.products.name}}
                              </div>
                              <div class="price">
                                P {{item.products.price}}
                              </div>
                              <div class="tools">
                                <div>
                                  <el-input-number v-model="item.nums" size="small" label="描述文字" @change="numberChange(item, item.nums)"></el-input-number>
                                </div>

                                <div class="delete" @click.stop="delShopCar(item.id)">
                                  <i class="iconfont icon-lajitong"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="footer-btn" @click="$router.push({name : 'pay-shopCar'})">
                          查看购物车
                        </div>
                      </div>
                      <div v-else class="footer-btn">
                        购物车没有商品
                      </div>
                      
                    </div>
                    <div slot="reference">
                      <el-badge :value="(carNumber > 0) ? carNumber : ''">
                        <i class="iconfont icon-tuanduicankaoxian-" @click="visible = !visible"></i>
                      </el-badge>
                    </div>
                  </el-popover>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
	</div>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: 'Menu',
  props:{
    alias: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      offsetTop: 0,
      value: '',
      visible: false,
      list: [],
    }
  },
  computed:{
    ...mapState({
      isFixed: state => state.app.isFixed,
      allCategories: state => state.goods.allCategories,
      carNumber: state => state.goods.carNumber,
      amount: state => state.goods.shopCar.goods_amount,
      shopCarList: state => state.goods.shopCar.list
    })
  },
  watch: {
    shopCarList: {
      handler(newVal, oldVal) {
        console.log(newVal);
        if(newVal && JSON.stringify(newVal) != JSON.stringify(oldVal)){
          this.$nextTick(() => {
            this.getShopCar();
          })
        }
      },
      immediate: true
    }
  },
  mounted () {
    // 设置bar浮动阈值为 #fixedBar 至页面顶部的距离
    this.offsetTop = document.querySelector('#menu').offsetTop;
    // 开启滚动监听
    window.addEventListener('scroll', this.handleScroll);
  },
  created () {
    this.getPageData();
  },
  methods: {
    // 滚动监听 滚动触发的效果写在这里
    handleScroll () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop >= this.offsetTop + 140) {
        // this.isFixed = true;
        this.$store.commit('app/setFixed', true);
      } else {
        // this.isFixed = false;
        this.$store.commit('app/setFixed', false);
      }
    },
    getPageData () {
      // 获取所有分类
      this.$store.dispatch('goods/getAllCategories', { method: 'categories.getallcat' });
      this.getShopCar();
    },
    // 获取购物车
    async getShopCar () {
      // 获取购物车数量
      this.$store.dispatch('goods/getCarnumber', { method: 'cart.getnumber', token: this.$store.state.app.token });
      this.$store.dispatch('goods/getShopCar', {method:'cart.getlist', token: this.$store.state.app.token})
        .then(res => {
          this.list = JSON.parse(JSON.stringify(this.$store.state.goods.shopCar.list))
        })
        .catch(err => {
          this.$message.error(err);
        })
    },
    // 购物车数量+-
    async numberChange(item, nums) {
      console.log(item, nums);
      await this.$store.dispatch('goods/handleShopCarNumber', {method:'cart.setnums', token: this.$store.state.app.token, id: item.id, nums: nums})
        .then(() => {
          this.getPageData();
        })
        .catch(err => {
          this.$message.error(err);
        })   
    },
    // 删除购物车
    delShopCar: function (id) {
      console.log(id);
      this.$confirm('删除购物车, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(async () => {
        await this.$store.dispatch('goods/delShopCar', {method:'cart.del', ids: id, token: this.$store.state.app.token})
          .then(res => {
            this.$message({
              type: "success",
              message: res,
            });
            this.getPageData();
          })
          .catch(err => {
            console.log(err);
            this.$message.error(`添加收藏${err}`);
          });
      })
    },
  },
  destroyed () {
    // 离开页面 关闭监听 不然会报错
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/css/theme.less";
  .second{background: #fff;}
  .secondList{width: 100%;}
  .link:hover{background: #F65151;color: #fff;}
  .menu{
    @1200-min();
    background: @theme-white;
    .content{
      @1200();
      .logo{
        height: 90px;
        @centered();
        img{
          width: 58px;
          height: 58px;
        }
      }
      .menu-type{
        @cursor-pointer();
        font-size: 18px;
        color: @theme-black;
        // line-height: 140px;
        height: 80px;
        display: flex;
        align-items: center;
        &:hover{
          text-decoration: underline;
        }
      }
      .shop-car{
        .iconfont{
          font-size: 40px;
        }
      }
    }
    // isfixed === true
    .menu_fixed {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: @theme-white;
      z-index: 99;
      border-bottom: 4px solid @theme-black;
    }
  }
  .link{
    height: 60px;
    line-height: 60px;
    @cursor-pointer();
  }
  .count{
    display: flex;
    justify-content: space-between;
    text-align: center;
    line-height: 24px;
  }
  .scroll{
    max-height: 248px;
    overflow-y: scroll;
    border-top: 1px solid @theme-silvergray;
    margin-top: 20px;
    .item{
      display: flex;
      padding: 20px 0;
      border-bottom: 1px solid @theme-silvergray;
      .img-box{
        @border-dotted();
        margin-right: 15px;
      }
      .content-box{
        flex: 1;
        .price{
          font-size: 20px;
          font-weight: bold;
        }
        .tools{
          margin-top: 15px;
          padding-right: 15px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          i{
            font-size: 24px;
            color: @theme-gray;
          }
        }
      }
    }
  }
  .footer-btn{
    height: 54px;
    text-align: center;
    line-height: 78px;
    color: @theme-lightgray;
    @cursor-pointer();
    // display: flex;
    // align-items: center;
  }
</style>
