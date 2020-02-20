<template>
  <div class="main-wrapper">
    <el-row :gutter="10">
      <el-col :span="19">
        <div class="grid-content">
          <el-table
            ref="multipleTable"
            :data="list"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              align="center"
              label="全选">
              <template slot-scope="scope">
                <el-image :src="scope.row.products.image_path" fit="fill"></el-image>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="商品名称">
              <template slot-scope="scope">
                {{scope.row.products.name}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="单价">
              <template slot-scope="scope">
                {{scope.row.products.price}} P
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="数量"
              width="220">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.nums" @change="numberChange(scope.row, scope.row.nums)"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="小计">
              <template slot-scope="scope">
                {{scope.row.products.amount}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作">
              <template slot-scope="scope">
                <div @click="addCollect(scope.row.products.goods_id)">移入收藏夹</div>
                <div @click="delShopCar(scope.row.id)">删除</div>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 20px">
            <!-- <el-checkbox v-model="checked" @change="handleCheckAllChange">全选</el-checkbox> -->
            <!-- 移入收藏夹 -->
            <div @click="delShopCar(selectList.map(item => item.id).join(','))">
              删除
            </div>
          </div>
          <div style="padding: 60px 0;">
            <span class="continue" @click="$router.push({name: 'index'})">继续购物</span> <span class="clear" @click="delShopCar(list.map(item => item.id).join(','))">清空购物车</span>
          </div>
        </div>
        <div class="grid-content Swipergj" style="margin-top: 10px;padding-bottom:100px;">
          <!-- <Swiper :imgs="banners" :options="swiperOption">
            <div slot="detail">
              <div class="describe">金枕头泰国风味榴莲</div>
              <div class="price">P 47.00</div>
              <div class="buy-btn">
                加入购物车
              </div>
            </div>
            <div slot="arrow" class="arrow-wrapper">
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
            </div>
          </Swiper> -->

          <GoodsScroll :list="collectList" imgKey="url" :options="swiperOption" :customArrow="false"></GoodsScroll>

        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content">
          <CardTitle name="总计" :titleLine="true"/>
          <div class="calculate-wrapper">
            <div class="calculate">
              <span>小计</span>
              <span>600P</span>
            </div>
            <div class="calculate">
              <span>首单优惠</span>
              <span>60P</span>
            </div>
            <div class="calculate">
              <span>运费</span>
              <span>0P</span>
            </div>
          </div>
          <div class="total">
            <div class="calculate">
              <span>订单总额</span>
              <span class="hot">540P</span>
            </div>
          </div>
          <nuxt-link :to="{name: 'pay-orderCenter'}"><el-button type="danger" class="large-btn" style="margin-top:20px;">前往结账</el-button></nuxt-link>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swiper from "@/components/public/swiper"
import CardTitle from "@/components/public/cardTitle"
import GoodsScroll from "@/components/public/goodsScroll2"
export default {
  name: 'ShopCar',
  layout: function(context){
    return 'payment'
  },
  components:{
    Swiper,
    CardTitle,
    GoodsScroll
  },
  data () {
    return {
      list: [],
      selectList: [],
      banners: [
        "https://b2c.jihainet.com/static/uploads/9f/c9/54/5bcd2b69d8e2d.jpg",
        "https://b2c.jihainet.com/static/uploads/9f/c9/54/5bcd2b69d8e2d.jpg",
        "https://b2c.jihainet.com/static/uploads/9f/c9/54/5bcd2b69d8e2d.jpg",
        "https://b2c.jihainet.com/static/uploads/9f/c9/54/5bcd2b69d8e2d.jpg"
      ],
      swiperOption: {
        slidesPerView: 3,
        centeredSlidesBounds: true,
        spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      }
    }
  },
  methods: {
    getPageData () {
      this.getShopCar();
      this.getCollect();
    },

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

    getCollect () {
      let data = {
        page: this.currentPage,
        limit: this.limit,
        method: "user.goodscollectionlist",
        token: this.$store.state.app.token
      }
      this.$store.dispatch('goods/getCollect', data);
    },

    // handleCheckAllChange (val) {
    //   console.log(val);
    //   if (val) {
    //     this.$refs.multipleTable.toggleAllSelection();
    //   } else {
    //     this.$refs.multipleTable.clearSelection();
    //   }
    // },
    async getShopCar () {
      await this.$store.dispatch('goods/getShopCar', {method:'cart.getlist', token: this.$store.state.app.token})
        .then(res => {
          this.list = JSON.parse(JSON.stringify(this.$store.state.goods.shopCar.list));
        })
        .catch(err => {
          this.$message.error(err);
        })
    },
    getCollect () {
      let data = {
        page: 1,
        limit: 12,
        method: "user.goodscollectionlist",
        token: this.$store.state.app.token
      }
      this.$store.dispatch('goods/getCollect', data);
    },
    handleSelectionChange (val) {
      this.selectList = val;
    },
    // 添加收藏
    addCollect: function (id) {
      console.log(id);
      this.$store.dispatch('goods/addCollect', {method:'user.goodscollection', goods_id: id, token: this.$store.state.app.token})
        .then(({status, data}) => {
          this.$message({
            message: data.msg,
          });
          this.getPageData();
        })
        .catch(err => {
          console.log(err);
          this.$message.error(`添加收藏${err}`);
        });
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
  created(){
    this.getPageData();
  },
  computed: {
    ...mapState({
      collectList: state => state.goods.collect.list,
    })
  },
}
</script>

<style lang="less" scoped>
@import "../../assets/css/theme.less";
.Swipergj /deep/ .swiper-button-prev{width: 38px;height: 38px;background-image: url(../../assets/img/arrow-left2.png) !important;background-size: 38px 38px !important;opacity: 0.9 !important;}
.Swipergj /deep/ .swiper-button-next{width: 38px;height: 38px;background-image: url(../../assets/img/arrow-right2.png) !important;background-size: 38px 38px !important;opacity: 0.9 !important;}

.menu{
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
.grid-content{
  background: @theme-white;
  padding: 20px;
  // 清空
  .clear{
    color: @theme-lightgray;
  }
  .swiper{
    margin-top: 50px;
    overflow: hidden;
    .detail{
      width: 100%;
    }
  }
  .describe,
  .price {
    color: @theme-black;
    text-align: center;
  }
  .describe {
    margin-top: 10px;
    line-height: 17px;
    font-size: 14px;
  }
  .price {
    font-size: 20px;
    font-family: Tahoma;
    margin-top: 5px;
    line-height: 24px;
  }
  .buy-btn {
    height: 34px;
    line-height: 34px;
    text-align: center;
    background: @theme-black;
    color: @theme-white;
    margin-top: 30px;
    @cursor-pointer();
  }
  .calculate-wrapper,.total{
    .calculate{
      display: flex;
      justify-content: space-between;
    }
  }
  .calculate-wrapper{
    line-height: 28px;
    border-bottom: @border;
  }
  .total{
    .calculate{
      font-size: 20px;
      line-height: 36px;
      .hot{
        color: @theme-red;
      }
    }
  }
}
</style>
