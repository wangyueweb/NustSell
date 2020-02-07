<template>
  <div>
    <div class="main-wrapper">
      <el-row :gutter="10">
        <el-col :span="19">
          <div class="grid-content">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="img"
                label="全选">
                <template slot-scope="scope">
                  <el-image :src="scope.row.img" fit="fill"></el-image>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="商品名称">
              </el-table-column>
              <el-table-column
                prop="price"
                label="单价">
                <template slot-scope="scope">
                  {{scope.row.price}} P
                </template>
              </el-table-column>
              <el-table-column
                prop="num"
                label="数量"
                width="220">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.num" @change="handleChange(scope.row, scope.row.num)"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                prop="count"
                label="小计">
                <template slot-scope="scope">
                  {{scope.row.price * scope.row.num}} P
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="操作">
                <template slot-scope="scope">
                  <div>移入收藏夹</div>
                  <div>删除</div>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
              <el-checkbox v-model="checked" @change="handleCheckAllChange">全选</el-checkbox>
              移入收藏夹
              删除
            </div>
            <div style="padding: 60px 0;">
              <span class="continue">继续购物</span> <span class="clear">清空购物车</span>
            </div>
          </div>
          <div class="grid-content" style="margin-top: 10px;padding-bottom:100px;">
            <Swiper :imgs="banners" :options="swiperOption">
              <div slot="detail">
                <div class="describe">金枕头泰国风味榴莲</div>
                <div class="price">P 47.00</div>
                <div class="buy-btn">
                  加入购物车
                </div>
              </div>
            </Swiper>
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
  </div>
</template>

<script>

import Swiper from "@/components/public/swiper"
import CardTitle from "@/components/public/cardTitle"
export default {
  name: 'ShopCar',
  layout: function(context){
    return 'payment'
  },
  components:{
    Swiper,
    CardTitle
  },
  data(){
    return {
      
      tableData: [{
          img: 'https://b2c.jihainet.com/static/uploads/9f/c9/54/5bcd2b69d8e2d.jpg',
          name: '王小虎',
          price: '500',
          num: '1',
          count: '',
        },{
          img: 'https://b2c.jihainet.com/static/uploads/9f/c9/54/5bcd2b69d8e2d.jpg',
          name: '王小虎',
          price: '500',
          num: '1',
          count: '',
        }],
      result: [],
      checked: false,
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
    handleCheckAllChange(val){
      console.log(val);
      if(val){
        this.$refs.multipleTable.toggleAllSelection();
      }else{
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      if(val.length === this.tableData.length){
        this.checked = true;
      }else{
        this.checked = false;
      }
      this.result = val;
    },
    handleChange(item,value) {
      item.count = item.price * item.num;
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/theme.less";
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
