<template>
	<div class="menu" id="menu">
    <div :class="{menu_fixed : isFixed}" v-if="allCategories.length > 0">
      <el-row class="content" style="display: flex;align-items: center;flex-wrap: wrap;">
        <el-col :span="3" v-if="isFixed">
          <div class="logo" style="height:90px">
            <nuxt-link :to="{path: '/'}">
              <el-image :src="require('@/assets/img/logo3.png')" style="width:65px;"></el-image>
            </nuxt-link>
          </div>
        </el-col>
        <el-col :span="24" v-if="!isFixed">
          <div class="logo" style="height:130px">
            <nuxt-link :to="{path: '/'}">
              <el-image :src="require('@/assets/img/logo.png')" style="width:180px;margin: 15px 0 0 0;"></el-image>
            </nuxt-link>
          </div>
        </el-col>
        <el-col :span="15">
          <el-row>
            <el-col :span="4" v-for="(item, index) in allCategories" :key="index" class="menu-type">
              <el-popover
                placement="bottom"
                trigger="hover"
                :visible-arrow="false"
                transition="el-zoom-in-top"
                offset="-1"
                popper-class="navpop"
                >
                  <div class="second" type="flex" justify="center" align="middle">
                    <div class="secondList" v-for="(itemJ, indexJ) in item.child" :key="indexJ" type="flex" justify="center" align="middle">
                      <div class="link" @click="$router.push({name: 'categorylist', query: {...itemJ}})" style="font-size:18px">
                        <img class="secondimg" :src="itemJ.image_url"></img>
                        <div class="secondname">{{itemJ.name}}</div>
                      </div>
                    </div>
                  </div>
                <div slot="reference" @click="$router.push({name: 'categorylist', query: {...item, firstId: item.id, firstName: item.name}})">{{item.name}}</div>
              </el-popover>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="isFixed ? 5 : 6" :push="isFixed ? 0 : 2">
          <el-row class="san" type="flex" justify="space-between" align="center">
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
                <div class="contentgj">
                  <el-popover
                    :visible-arrow="false"
                    placement="bottom-end"
                    trigger="focus"
                    v-model="visible"
                  >
                    <div class="content" style="width:382px;height: 100%;padding:11px 25px 25px;box-sizing:border-box;">
                      <div v-if="carNumber > 0">
                        <div @click="visible = !visible" style="text-align:right;">
                          <div class="rotate">
                            <i class="iconfont icon-guanbi" style="font-size:20px;"></i>
                          </div>
                        </div>
                        <div class="count">
                          <div>
                            商品数量
                            <br>
                            <span>{{carNumber}}</span>
                          </div>
                          <div>
                            购物车小计
                            <br>
                            <span>P {{amount}}</span>
                          </div>
                        </div>
                        <el-button type="danger" class="large-btn" @click="$router.push({name : 'pay-shopCar'})">
                          前往结账
                        </el-button>
                        <div class="scroll">
                          <div v-for="(item, index) in list" :key="index" class="item">
                            <div class="img-box" @click="$router.push({name: 'goodsDetail', query: {id: item.products.goods_id}})">
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
                                <div class="toolsboz">
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
      carNumber: state => state.order.carNumber,
      amount: state => state.order.shopCar.goods_amount,
      shopCarList: state => state.order.shopCar.list,
      
    })
  },
  watch: {
    shopCarList: {
      handler(newVal, oldVal) {
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
      this.$store.dispatch('order/getCarnumber', { method: 'cart.getnumber', token: this.$store.state.app.token });
      this.$store.dispatch('order/getShopCar', {method:'cart.getlist', token: this.$store.state.app.token})
        .then(res => {
          this.list = JSON.parse(JSON.stringify(this.$store.state.order.shopCar.list))
        })
        .catch(err => {
          this.$message.error(err);
        })
    },
    // 购物车数量+-
    async numberChange(item, nums) {
      console.log(item, nums);
      await this.$store.dispatch('order/handleShopCarNumber', {method:'cart.setnums', token: this.$store.state.app.token, id: item.id, nums: nums})
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
        await this.$store.dispatch('order/delShopCar', {method:'cart.del', ids: id, token: this.$store.state.app.token})
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
  .san{position: relative;top: -10px;left: 0;}
  .second{background: #fff;padding: 0 0 0 55px;min-height: 250px;width: 1200px;text-align: left;border: 1px solid #000000;box-shadow:none;}
  .secondList{display: inline-block;text-align: center;}
  .secondimg{width: 100px;height: auto;margin: 50px 40px 0 40px;}
  .secondname{font-size: 18px;margin: 10px 0 35px 0;font-weight: 600;}
  .link:hover{color: #F65151;}
  .activemi{opacity: 0.5;top: 50px;}
  .menu{
    @1200-min();
    background: @theme-white;
    .content{
      @1200();
      .logo{
        @centered();
        img{
          width: 58px;
          height: 58px;
        }
      }
      .menu-type{
        @cursor-pointer();
        font-weight: 600;
        font-size: 22px;
        color: @theme-black;
        // line-height: 140px;
        height: 40px;
        display: flex;
        align-items: center;
        span{
          height: 41px;
        }
        &:hover{
          span{
            border-bottom: 5px solid @theme-black;
          }
        }
      }
      .shop-car{
          cursor:pointer;
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
    color: #000;
    @cursor-pointer();
  }
  .count{
    margin-bottom: 10px;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    line-height: 24px;
  }
  .count span{font-weight: 600;}
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
  
  .menu-type span{border-bottom: 2px solid #fff;}
  .toolsboz /deep/ .el-input__inner:focus{border: 1px solid #DCDFE6 !important;}
  .toolsboz /deep/ .el-input__inner:hover{border: 1px solid #DCDFE6 !important;}
  .toolsboz /deep/ .el-input-number__increase:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled){border: 1px solid #DCDFE6 !important;}
  .toolsboz /deep/ .el-input-number__decrease:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled){border: 1px solid #DCDFE6 !important;}
    
  .rotate{display: inline-block;transition: transform 1s}
  .rotate:hover{transform:rotate(360deg);}
  
  .swiper-wrapper{width: 100px;}
  
</style>
