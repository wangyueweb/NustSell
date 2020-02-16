<template>
  <div class="goodsDetail">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'categorylist' }">零食</el-breadcrumb-item>
      <el-breadcrumb-item>{{goodsDetail.name || ''}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容 -->
    <el-row class="main">
      <el-col :span="14">
        <el-row :gutter="10">
          <el-col :span="4">
            <div>
              <el-image
                class="small-img"
                v-for="(item, index) in goodsDetail.album"
                :key="index"
                :src="item"
                fit="fill"
                @click="show_image = item">
              </el-image>
            </div>
          </el-col>
          <el-col :span="18">
            <el-image
              class="big-img"
              :src="show_image"
              fit="fill">
            </el-image>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="9">
        <div class="describe">
          {{goodsDetail.brief || ''}}
        </div>
        <div class="hot" v-if="goodsDetail.is_recommend === 2">
          {{goodsDetail.is_recommend === 2 ? '热销' : ''}}
        </div>
        <div class="hot" v-if="goodsDetail.stock < 1">
          {{goodsDetail.stock < 1 ? '缺货' : ''}}
        </div>
        <div class="price">
          P {{goodsDetail.price}}
        </div>

        <div class="calculate">
          <el-input-number v-model="num" size="small" :min="1" :max="10" label="描述文字"></el-input-number>
        </div>
        
        <div class="buy-btn" @click="addShopCar(goodsDetail.product.id, num)">加入购物车</div>

        <div class="collect" @click="addCollect">
          <i class="iconfont icon-shoucang"></i>
          {{(goodsDetail.isfav === 'true') ? '已收藏' : '收藏'}}
        </div>
      </el-col>
    </el-row>
    <!-- 详情 -->
    <div class="detail">
      <div class="tab">
        <div class="line1">
          <span :class="{ selected: selected === 0 }" @click="selected = 0"
            >相关商品</span
          >
          <span :class="{ selected: selected === 1 }" @click="selected = 1"
            >商品详情</span
          >
        </div>
        <div class="line2"></div>
      </div>

      <div v-if="selected === 0">
        <div class="swiper">
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
      </div>

      <div v-if="selected === 1">
        <div class="table">
          <div class="table-title">{{goodsDetail.name || ''}}</div>
          <el-table :show-header="false" :data="tableData" border>
            <el-table-column prop="name"></el-table-column>
            <el-table-column prop="address"></el-table-column>
          </el-table>
        </div>
        <div class="img-list" v-html="goodsDetail.intro">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "~/components/public/swiper";
import { getCategories } from "@/services/api";
import GoodsScroll from "~/components/public/GoodsScroll";
import { mainRequest } from "@/services/api";
import { mapState } from "vuex";

export default {
  name: "goodsDetail",
  data() {
    return {
      num: 1,
      selected: 0,
      banners: [
        "https://b2c.jihainet.com/static/uploads/9f/c9/54/5bcd2b69d8e2d.jpg",
        "https://b2c.jihainet.com/static/uploads/9f/c9/54/5bcd2b69d8e2d.jpg",
        "https://b2c.jihainet.com/static/uploads/9f/c9/54/5bcd2b69d8e2d.jpg",
        "https://b2c.jihainet.com/static/uploads/9f/c9/54/5bcd2b69d8e2d.jpg"
      ],
      swiperOption: {
        slidesPerView: 4,
        centeredSlidesBounds: true,
        spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      },
      goodsDetail: {},
      otherList: [],
      show_image: ""
    };
  },
  components: {
    Swiper
  },
  computed: {
    ...mapState({
    }),
    tableData: function() {
      return [
        {
          name: `品牌: ${this.goodsDetail.brand_name || '无'}`,
          address: `储存方式: ${this.goodsDetail.storageMode || '无'}`
        },
        {
          name: `保质期: ${this.goodsDetail.shelfLife || '无'}`,
          address: `生产地: ${this.goodsDetail.producer || '无'}`
        }
      ]
    }
  },
  created() {
    this.getPageData();
  },
  methods: {
    getPageData: async function () {
      let formData = {
        method: 'goods.getdetial',
        id: this.$route.query.id,
        token: this.$store.state.app.token
      }
      let {status, data} = await getCategories(formData);
      if(status === 200 && data && data.data){
        this.goodsDetail = data.data;
        this.otherList = data.other;
        this.show_image = data.data.album[0];
      }

      // 添加最近浏览商品
      mainRequest({goods_id: this.goodsDetail.id, token: this.$store.state.app.token, method: 'user.addgoodsbrowsing'})
        .then(res => {
          console.log('添加最近浏览商品',res);
        })
        .catch(err => {
        })
    },
    // 添加收藏
    addCollect: function() {
      this.$store.dispatch('goods/addCollect', {method:'user.goodscollection', goods_id: this.goodsDetail.id, token: this.$store.state.app.token})
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
    // 加入购物车
    addShopCar: function() {
      this.$store.dispatch('goods/addShopCar', {method:'cart.add', product_id: this.goodDetail.id, nums:this.num, token: this.$store.state.app.token})
        .then(res => {
          let {status, data} = res;
          console.log(res);
          this.$message({
            message: data.msg,
          });
        })
        .catch(err => {
          console.log(err);
          this.$message.error(`加入购物车${err}`);
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/theme.less";
.goodsDetail {
  @1200();
  .breadcrumb{
    margin: @bianju 0;
  }
  .main {
    margin-top: 10px;
    margin-bottom: 20px;
    background: @theme-white;
    padding: 20px;
    .small-img,
    .big-img {
      @border-dotted();
    }
    .hot {
      color: @theme-red;
      margin-top: 10px;
    }
    .describe,
    .price {
      color: @theme-black;
    }
    .describe {
      line-height: 17px;
      font-size: 14px;
    }
    .price {
      font-size: 20px;
      font-family: Tahoma;
      margin-top: 5px;
      line-height: 24px;
    }
    .calculate {
      margin-top: 50px;
    }

    .buy-btn {
      width: 400px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background: @theme-black;
      color: @theme-white;
      margin-top: 35px;
      @cursor-pointer();
    }
    .buy-btn:hover{
      background:#575757;
    }
    .collect {
      width: 400px;
      margin-top: 16px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border: @border;
      @cursor-pointer();
    }
    .collect:hover{
      color:#575757;
      border: 1px solid #575757;
    }
  }
  .detail {
    background: @theme-white;
    padding: 20px;
    margin-bottom: 120px;
    .line1 {
      display: flex;
      justify-content: center;
      span {
        color: @theme-lightgray;
        margin: 0 10px;
        @cursor-pointer();
      }
      .selected {
        color: @theme-black;
        border-bottom: 4px @theme-black solid;
      }
    }
    .line2 {
      height: 1px;
      background: @theme-black;
    }
    .table {
      margin-top: 20px;
      .table-title {
        line-height: 66px;
        text-align: center;
        border-top: 1px solid #ebeef5;
        border-left: 1px solid #ebeef5;
        border-right: 1px solid #ebeef5;
      }
    }
    .img-list {
      margin: 25px auto;
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
  }
}

.calculate /deep/ .el-input__inner:focus{border: 1px solid #DCDFE6 !important;}
</style>
