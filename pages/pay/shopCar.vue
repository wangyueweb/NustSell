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
            row-key="id"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              :reserve-selection='true'
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
                <br>
                {{scope.row.products.spes_desc}}
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
                <el-input-number v-model="scope.row.nums" @change="numberChange(scope.row, scope.row.nums)" :min="1"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="小计">
              <template slot-scope="scope">
                {{scope.row.products.amount}} P
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作">
              <template slot-scope="scope">
                <div class="shape" @click="addCollect(scope.row.products.goods_id)">移入收藏夹</div>
                <div class="shape" @click="delShopCar(scope.row.id)">删除</div>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 20px">
            <!-- <el-checkbox v-model="checked" @change="handleCheckAllChange">全选</el-checkbox> -->
            <!-- 移入收藏夹 -->
            <div class="favorite">
              全部移入收藏夹
            </div>
            <div class="delete" @click="delShopCar(selectList.map(item => item.id).join(','))">
              删除
            </div>
          </div>
          <div style="padding: 60px 0;">
            <span class="continue" @click="$router.push({name: 'index'})">继续购物</span> <span class="clear" @click="delShopCar(list.map(item => item.id).join(','))">清空购物车</span>
          </div>
        </div>
        <div class="grid-content Swipergj" style="margin-top: 10px;padding-bottom:100px;">
          <div class="myfavorite">
              我的收藏
          </div>

          <GoodsScroll :list="collectList" imgKey="url" :options="swiperOption" :customArrow="false"></GoodsScroll>

        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content">
          <div class="aggregate">总计</div>
          <div class="calculate-wrapper">
            <div class="calculate">
              <span>小计</span>
              <span>{{(shopCar.goods_amount - shopCar.order_pmt) || 0 }}P</span>
            </div>
            <div class="calculate">
              <span>首单优惠</span>
              <span>{{shopCar.order_pmt || 0}} P</span>
            </div>
            <div class="calculate">
              <span>运费</span>
              <span>0 P</span>
            </div>
          </div>
          <div class="total">
            <div class="calculate">
              <span>订单总额</span>
              <span class="hot">{{shopCar.goods_amount || 0}} P</span>
            </div>
          </div>
          <el-button type="danger" class="large-btn" style="margin-top:20px;font-size: 15px;" @click="toPayOrderCenter">前往结账</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CardTitle from "@/components/public/cardTitle"
import GoodsScroll from "@/components/public/goodsScroll2"
import { getSellInfo } from "@/services/api";
export default {
  name: 'ShopCar',
  layout: function(context){
    return 'payment'
  },
  components:{
    CardTitle,
    GoodsScroll
  },
  data () {
    return {
      list: [],
      selectList: [],
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
  head () {
    return {
      title: this.basicInfo.shop_name,
      meta: [
        { name: 'description', content: this.basicInfo.recommend_keys},
        { name: 'keywords', content: this.basicInfo.shop_desc }
      ]
    }
  },
  async asyncData () {
    try{
      // 获取商城基本信息
      const basicInfo = await getSellInfo();
      return {
        basicInfo: basicInfo.data
      }
    }catch(e){
      
    }
  },
  methods: {
    async numberChange(item, nums) {
      console.log(item, nums);
      await this.$store.dispatch('order/handleShopCarNumber', {method:'cart.setnums', token: this.$store.state.app.token, id: item.id, nums: nums})
        .then(() => {
          this.getShopCar();
          // this.getAmount();
        })
        .catch(err => {
          this.$message.error(err);
        })
    },

    async getShopCar () {
      await this.$store.dispatch('order/getShopCar', {method:'cart.getlist', token: this.$store.state.app.token})
        .then(res => {
          this.list = JSON.parse(JSON.stringify(this.$store.state.order.shopCar.list));
          this.setSelect();
        })
        .catch(err => {
          this.$message.error(err);
        })
    },
    setSelect: function (rows) {
      var _this = this;
      this.$nextTick(() => {
        if (this.list && this.list.length > 0) {
          this.list.map(row => {
            if(this.$refs.multipleTable){
              this.$refs.multipleTable.toggleRowSelection(row,true);
            }
          });
        } 
      })
    },
    toggleSelection(rows) {
      console.log(rows);
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange (val) {
      console.log('handleSelectionChange', val);
      this.selectList = val;
      // this.getAmount();
    },
   
    // 添加收藏
    addCollect: function (id) {
      console.log(id);
      this.$store.dispatch('goods/addCollect', {method:'user.goodscollection', goods_id: id, token: this.$store.state.app.token})
        .then(({status, data}) => {
          this.$message({
            type: "warning",
            message: data.msg,
          });
          this.getShopCar();
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
        await this.$store.dispatch('order/delShopCar', {method:'cart.del', ids: id, token: this.$store.state.app.token})
          .then(res => {
            this.$message({
              type: "success",
              message: res,
            });
            this.getShopCar();
          })
          .catch(err => {
            console.log(err);
            this.$message.error(`添加收藏${err}`);
          });
      })
    },
    // 前往结账
    toPayOrderCenter: async function () {
      let ids;

      if(this.selectList.length > 0) {
        if(this.selectList.length === 1){
          ids = this.selectList[0].id.toString();
        }else{
          ids = this.selectList.map(item => item.id).join(',');
        }
        this.$router.push({name: 'pay-orderCenter', query: {ids: ids}});
      }else{
        this.$message({
          type: 'error',
          message: '请勾选至少一件商品'
        })
      }
    }
  },
  created(){
    this.getShopCar();
  },
  computed: {
    ...mapState({
      collectList: state => state.goods.collect.list,
      // amount: state => state.order.amount
      shopCar: state => state.order.shopCar
    })
  },
  watch: {
    selectList: function(newval,oldval){
      // this.getAmount();
      this.getShopCar();
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/theme.less";
.Swipergj /deep/ .swiper-button-prev{width: 38px;height: 38px;background-image: url(../../assets/img/arrow-left2.png) !important;background-size: 38px 38px !important;}
.Swipergj /deep/ .swiper-button-next{width: 38px;height: 38px;background-image: url(../../assets/img/arrow-right2.png) !important;background-size: 38px 38px !important;}

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
    display: inline-block;
    margin: 0 0 0 15px;
    cursor:pointer;
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
        font-size: 15px;
        margin: 1px 0 0 0;
      display: flex;
      justify-content: space-between;
    }
  }
  .calculate-wrapper{
      padding: 2px 0 10px 0;
    line-height: 28px;
    border-bottom: 1px solid #EAEAEA;;
  }
  .total{
    .calculate{
      font-size: 17px;
      line-height: 36px;
      .hot{
        color: @theme-red;
      }
    }
  }
}

.grid-content /deep/ .el-input__inner:focus{border: 1px solid #DCDFE6 !important;}
.grid-content /deep/ .el-input__inner:hover{border: 1px solid #DCDFE6 !important;}
.grid-content /deep/ .el-input-number__increase:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled){border: 1px solid #DCDFE6 !important;}
.grid-content /deep/ .el-input-number__decrease:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled){border: 1px solid #DCDFE6 !important;}

.grid-content /deep/ .el-table th{font-weight: 100;}
.grid-content /deep/ .el-table td{color: #000;}

.favorite{display: inline-block;cursor:pointer;}
.delete{display: inline-block;margin: 0 0 0 14px;cursor:pointer;}
.myfavorite{font-size: 16px;padding: 5px 0 10px 0;border-bottom: 1px solid #000;text-align: center;position: relative;}
.myfavorite:after{content: '';position: absolute;bottom: 0;left: 50%;width: 70px;height: 3px;background: #000;transform: translateX(-50%);}
.aggregate{border-bottom: 1px solid #EAEAEA;font-size: 18px;padding: 0 0 5px 0;}
.continue{cursor:pointer;}
.shape{cursor:pointer;}

</style>
