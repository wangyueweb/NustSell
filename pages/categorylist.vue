<template>
  <div class="categoryList">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.query.firstName ? $route.query.firstName : $route.query.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部标识 -->
    <div class="title">
      {{$route.query.name}}
    </div>
    <!-- 详情 -->
    <div class="main">
      <el-row :gutter="10">
        <el-col :span="5">
          <div class="grid-content">
            <CardTitle name="分类" :textLine="true" :titleLine="true"/>
            <div class="content">
              <!-- <div class="hot">_膨化.零嘴（20）</div> -->
              <div class="common" :style="$route.query.name == itemI.name ? 'color:#F65151':''" v-for="(itemI, indexI) in categoryList" :key="indexI" @click="$router.push({name: 'categorylist', query: itemI})">{{itemI.name}}</div>
              <div>
                <span class="other" v-for="(itemJ, indexJ) in brand" :key="indexJ" @click="$router.push({name: 'categorylist', query: {...itemJ}})">{{itemJ.name}}</span>
              </div>
            </div>
          </div>
          <div class="grid-content" v-if="browsing">
            <CardTitle name="最近浏览商品" :textLine="true" :titleLine="true">
              <div slot="tool">
                  <img src="../assets/img/arrow-left1.png" alt="" class="tool-img" @click="currentPage --;" v-if="currentPage > 1"/>
                  <img src="../assets/img/arrow-left4.png" alt="" class="tool-img" v-if="currentPage <= 1"/>
                  <img src="../assets/img/arrow-right1.png" alt="" class="tool-img" v-if="browsing.count > currentPage * 3" @click="currentPage ++;"/>
                  <img src="../assets/img/arrow-right4.png" alt="" class="tool-img" v-if="browsing.count <= currentPage * 3"/>
              </div>
            </CardTitle>
            <div class="content">
              <el-row :gutter="10">
                <el-col :span="8" v-for="(item, index) in browsing.list" :key="index" class="img-wrapper">
                  <img :src="item.goods.image_url" class="img" @click="$router.push({name: 'goodsDetail', query: {id: item.goods_id}})"/>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="19">
          <!-- 头部筛选工具 -->
          <div class="tool grid-content">
            <el-row type="flex" justify="space-between">
              <el-col>
                <el-row class="layoutBtn-wrapper" type="flex" align="middle">
                  <div @click.stop="small = true; getPageData()" :class="{selected : small}" class="layoutBtn">
                    <i class="iconfont icon-liebiao2"></i>
                  </div>
                  <div @click.stop="small = false; getPageData()" :class="{selected : !small}" class="layoutBtn">
                    <i class="iconfont icon-liebiao1"></i>
                  </div>
                  <span class="count">
                    {{goodsOptions.total_page}}个产品
                  </span>
                </el-row>
              </el-col>
              <el-col>
                <el-row class="layoutBtn-wrapper" type="flex" align="middle" justify="end">
                  <span class="count">
                    排列条件
                  </span>
                  <el-select v-model="sort" style="width: 110px;">
                    <el-option
                      value="销量">
                    </el-option>
                    <el-option
                      value="价格">
                    </el-option>
                  </el-select>
                  <el-col class="rankBtn">
                    <i class="iconfont icon-fangxiang rank" style="color: #DEDEDE;"></i>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <!-- 商品列表 -->
          <el-row :gutter="10">
            <el-col :span="small ? 6 : 24" v-for="(item, index) in goodsOptions.list" :key="index" :class="small ? 'big-good-wrapper' : 'small-good-wrapper'">
              <div class="grid-content productList">
                <div class="sign" v-if="item.is_preferential === 2">特惠</div>
                <nuxt-link :to="{name: 'goodsDetail', query: {id: item.id}}">
                  <div class="goodpic-wrapper">
                    <el-image
                      style="width: 180px; height: 180px"
                      :src="item.image_url">
                    </el-image>
                  </div>
                </nuxt-link>
                <div class="main">
                  <div class="top">
                    <div class="describe">
                      {{item.name}}
                    </div>
                    <div class="price">
                      P {{item.price}}
                      <div class="discount">P {{item.mktprice}}</div>
                    </div>
                  </div>

                  <el-row type="flex" justify="space-between" align="middle" class="tool">
                    <el-col class="collect" :span="!small ? 6 : 24">
                      <div @click.stop="addCollect(item)">
                        <i class="iconfont icon-shoucang"></i>
                        {{(item.isfav === 'true') ? '已收藏' : '收藏'}}
                      </div>
                    </el-col>
                    <el-col>
                      <div class="buy-btn" @click.stop="addShopCar(item.product.id, 1)" v-if="item.stock > 0">加入购物车</div>
                      <div class="cant-btn" v-else>库存不足</div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              
            </el-col>
          </el-row>
          <!-- 底部筛选工具 -->
          <div v-if="goodsOptions.total_page > 1" class="tool grid-content bottom">
            <el-row type="flex" justify="space-between">
              <el-col>
                <el-pagination
                  @current-change="paginationChange"
                  :page-count="goodsOptions.total_page"
                  :current-page="value"
                  background
                  layout="prev, pager, next"
                >
                </el-pagination>
              </el-col>
              <el-col>
                <el-row class="layoutBtn-wrapper" type="flex" align="middle" justify="end">
                  <span class="count">
                    展现
                  </span>
                  <el-select v-model="value" :placeholder="`${goodsOptions.page || '0'}`" @change="paginationChange" class="page-select">
                    <el-option
                      v-for="(item, index) in goodsOptions.total_page"
                      :key="index"
                      :value="item">
                    </el-option>
                  </el-select>
                  <el-col class="rankBtn">
                    页
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import CardTitle from '~/components/public/cardTitle';
import { getCategories, getSellInfo } from "@/services/api";
import { mapState } from "vuex";
export default {
  name: 'categoryList',
  data(){
    return {
      small: true,
      value: 1, 
      sort: "", // 排序
      formData: {},
      goodsOptions: {},
      currentPage: 1,
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
  components: {
    CardTitle
  },
  computed: {
    ...mapState({
      browsing: state => state.goods.browsing,
      brand: state => state.goods.brand
    }),
    categoryList: {
      get: function () {
        let arr = [];
        for (let i in this.$store.state.goods.allCategories){
          for (let j in this.$store.state.goods.allCategories[i].child){
            if(this.$route.query.firstId && this.$route.query.firstId === this.$store.state.goods.allCategories[i].id){
              arr = this.$store.state.goods.allCategories[i]['child'];
              return arr;
            }else if(this.$route.query.id && this.$route.query.id.toString() === this.$store.state.goods.allCategories[i].child[j].id.toString()){
              arr = this.$store.state.goods.allCategories[i]['child'];
              return arr;
            }
          }
        }
      },
      set: function (val) {}
    }
  },
  created(){
    this.getPageData();
    this.getBrowsingList(this.currentPage);
  },
  methods:{
    async getPageData(){
      if(this.$route.query.firstId){
        this.formData = {
          page: 1,
          limit: this.small ? 12 : 6,
          where: `{"cat_id": ${this.$route.query.firstId}}`,
          method: "goods.getlist",
        }
      }
      else if(this.$route.query.search_name) {
        this.formData= {
          page: 1,
          limit: this.small ? 12 : 6,
          where: `{"search_name": "${this.$route.query.search_name}"}`,
          method: "goods.getlist"
        }
        this.getGoodsList();
      }
      else{
        this.formData = {
          page: 1,
          limit: this.small ? 12 : 6,
          where: `{"cat_id": ${this.$route.query.id}}`,
          method: "goods.getlist",
        }
      }
      this.getGoodsList();
    },
    // 获取最近浏览商品
    getBrowsingList(page){
      this.$store.dispatch('goods/getBrowsingList', {method: "user.goodsbrowsing", limit: 3, page: page, token: this.$store.state.app.token});
    },
    // 获取商品列表
    getGoodsList: async function () {
      await this.$store.dispatch('goods/getGoodsList', this.formData)
        .then(({status, data}) => {
          console.log(data);
          if(status === 200 && data && data.data){
            this.goodsOptions = data.data;
          }
        })
        .catch(err => {
          this.$message.error(`获取商品列表${err}`);
        })
    },
    // 添加收藏
    addCollect: function (item) {
      console.log(item);
      this.$store.dispatch('goods/addCollect', {method:'user.goodscollection', goods_id: item.id, token: this.$store.state.app.token})
        .then(({status, data}) => {
          this.$message({
            type: "warning",
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
    async addShopCar(id, num) {
      await this.$store.dispatch('order/addShopCar', {method:'cart.add', product_id: id, nums:num, token: this.$store.state.app.token});
      this.$store.dispatch('order/getShopCar', {method:'cart.getlist', token: this.$store.state.app.token});
      this.getGoodsList();
    },
    // 分页变化
    paginationChange: function (e) {
      console.log(e);
      this.$set(this.formData, 'page', e);
      this.getGoodsList();
    }
  },
  watch:{
    $route(to,from){
      console.log('route改变')
      this.getPageData();
      this.getBrowsingList(1);
    },
    sort: function(){
      console.log(this.sort);
      
      if(this.sort === '销量'){

        if(this.$route.query.firstId){
          this.formData = {
            page: 1,
            limit: this.small ? 12 : 6,
            order: "buy_count desc",
            where: `{"cat_id": ${this.$route.query.firstId}}`,
            method: "goods.getlist",
          }
        }
        else if(this.$route.query.search_name) {
          this.formData= {
            page: 1,
            limit: this.small ? 12 : 6,
            order: "buy_count desc",
            where: `{"search_name": "${this.$route.query.search_name}"}`,
            method: "goods.getlist"
          }
          this.getGoodsList();
        }
        else{
          this.formData = {
            page: 1,
            limit: this.small ? 12 : 6,
            order: "buy_count desc",
            where: `{"cat_id": ${this.$route.query.id}}`,
            method: "goods.getlist",
          }
        }

        this.getGoodsList();
      }

      if(this.sort === '价格'){

        if(this.$route.query.firstId){
          this.formData = {
            page: 1,
            limit: this.small ? 12 : 6,
            order: "price asc",
            where: `{"cat_id": ${this.$route.query.firstId}}`,
            method: "goods.getlist",
          }
        }
        else if(this.$route.query.search_name) {
          this.formData= {
            page: 1,
            limit: this.small ? 12 : 6,
            order: "price asc",
            where: `{"search_name": "${this.$route.query.search_name}"}`,
            method: "goods.getlist"
          }
          this.getGoodsList();
        }
        else{
          this.formData = {
            page: 1,
            limit: this.small ? 12 : 6,
            order: "price asc",
            where: `{"cat_id": ${this.$route.query.id}}`,
            method: "goods.getlist",
          }
        }

        this.getGoodsList();
      }
    },
    currentPage: function(){
      this.getBrowsingList(this.currentPage);
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/css/theme.less';
.categoryList{
  @1200();
   .tool-img{width: 15px;height: auto;}
  .breadcrumb{
    margin-top: 20px
  }
  .title{
    margin: 20px 0;
    font-size: 22px;
    color: @theme-black;
    font-weight: 700;
  }
  .main{
    .grid-content{
      padding: 20px;
      margin-bottom: 10px;
      background: @theme-white;
      .content{
        margin-top: 10px;
        .common{
          font-size: 18px;
          line-height: 40px;
          @cursor-pointer();
          &:hover{
            text-indent: 5px;
            color: @theme-red;
          }
        }
        .other{
          text-decoration:underline;
          line-height: 20px;
          color: @theme-gray;
          margin-right: 12px;
          cursor:pointer;
        }
        .img-wrapper{
          margin-top: 10px;
          .img{
            border: 1px solid #F2F2F2;
            width: 100%;
            display: block;
          }
        }
      }
    }
    .tool{
      .layoutBtn-wrapper{
        .layoutBtn{
          width: 40px;
          height: 34px;
          display: inline-block;
          border: 1px solid @theme-black;
          @centered();
          @cursor-pointer();
        }
        .count{
            font-size: 15px;
          margin: 0 10px;
        }
        .selected{
          background: @theme-black;
          color: @theme-white;
        }
        .rankBtn{
          width: 40px;
          height: 34px;
          display: inline-block;
          @centered();
          @cursor-pointer();
          .rank{
            transform: rotate(90deg);
          }
        }
      }
    }
    .big-good-wrapper{
      @cursor-pointer();
      margin-bottom: 10px;
      .grid-content{
        margin-bottom: 0;
      }
      .main{
        .goodpic-wrapper{
          @centered();
        }
        .describe, .price{
          text-align: center;
          color: @theme-black;
        }
        .describe{
          line-height: 17px;
          font-size: 14px;
        }
        .price{
          font-size: 20px;
          font-family: Tahoma;
          margin-bottom: 20px;
          line-height: 24px;
        }
        .collect{
          @cursor-pointer();
        }
        .buy-btn{
          width: 120px;
          height: 34px;
          line-height: 34px;
          text-align: center;
          background: @theme-black;
          color: @theme-white;
        }
        .cant-btn{
          width: 120px;
          height: 34px;
          line-height: 34px;
          text-align: center;
          background: @theme-lightgray;
          color: @theme-white;
          cursor: not-allowed;
        }
      }
    }
    .small-good-wrapper{
      .grid-content{
        display: flex;
        justify-content: space-between;
        padding: 15px 40px;
        @cursor-pointer();
        .main{
          flex: 1;
          padding-left: 40px;
          padding-right: 40px;
          .top{
            display: flex;
            justify-content: space-between;
            .describe{
              line-height: 17px;
              font-size: 14px;
            }
            .price{
              font-size: 20px;
              font-family: Tahoma;
              margin-bottom: 20px;
              line-height: 24px;
            }
          }
          .collect{
            @cursor-pointer();
          }
          .buy-btn{
            width: 120px;
            height: 34px;
            line-height: 34px;
            text-align: center;
            background: @theme-black;
            color: @theme-white;
          }
        }
      }
    }
    .page-select{
      width: 70px;
    }
    .bottom{
      margin-bottom: 150px;
    }
  }
}

.grid-content /deep/ .el-pagination button{border: 1px solid #000}
.grid-content /deep/ .el-pager li{border: 1px solid #000}
.grid-content /deep/ .el-input__inner{height: 30px;line-height: 30px;}
.grid-content /deep/ .el-input__icon{height: 30px;line-height: 30px;}
.grid-content /deep/ .is-justify-space-between{margin: -10px;}
.productList{position: relative;}
.productList .sign{position: absolute;top: 13px;right: 13px;width: 40px;height: 40px;line-height: 40px;font-size: 13px;background: #EB5202;color: #fff;text-align: center;border-radius: 50%;z-index: 98;}
.discount{display: inline-block;margin: 0 0 0 20px;color: #FF3D3D;text-decoration:line-through;}


</style>


