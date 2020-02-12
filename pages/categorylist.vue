<template>
  <div class="categoryList">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.query.name}}</el-breadcrumb-item>
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
              <div class="common" v-for="(itemI, indexI) in categoryList" :key="indexI" @click="$router.push({name: 'categorylist', query: itemI})">{{itemI.name}}</div>
              <div>
                <span class="other" v-for="(itemJ, indexJ) in other" :key="indexJ">{{itemJ}}</span>
              </div>
            </div>
          </div>
          <div class="grid-content">
            <CardTitle name="最近浏览商品" :textLine="true" :titleLine="true">
              <div slot="tool">
                  <img src="../assets/img/arrow-left1.png" alt="" class="tool-img" />
                  <img src="../assets/img/arrow-right1.png" alt="" class="tool-img" />
              </div>
            </CardTitle>
            <div class="content">
              <el-row :gutter="10">
                <el-col :span="8" v-for="(itemK, indexK) in imgs" :key="indexK" class="img-wrapper">
                  <img :src="itemK" alt="" class="img" />
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
                  <el-select v-model="value" placeholder="销量">
                    <el-option
                      value="1">
                    </el-option>
                  </el-select>
                  <el-col class="rankBtn">
                    <i class="iconfont icon-fangxiang rank"></i>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <!-- 商品列表 -->
          <el-row :gutter="10">
            <el-col :span="small ? 6 : 24" v-for="(item, index) in goodsOptions.list" :key="index" :class="small ? 'big-good-wrapper' : 'small-good-wrapper'">
              <div class="grid-content">
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
                      <div class="buy-btn" @click.stop="addShopCar(item.product.id, 1)">加入购物车</div>
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
import {getCategories} from "~/services/api";
export default {
  name: 'categoryList',
  data(){
    return {
      // categoryList: [{name: '膨化.零嘴（20）'}, {name: '饼干糕点'}, {name: '坚果.果干'}, {name: '肉干.肉铺'}, {name: '槟榔'}],
      common: [
        "饼干.糕点",
        "坚果.果干",
        "肉干.肉铺",
        "槟榔",
      ],
      other: [
        "卫龙",
        "好丽友",
        "达利园",
        "盼盼",
        "康师傅",
        "百草味",
        "农夫山泉",
        "自然派",
      ],
      imgs: [
        "https://b2c.jihainet.com/static/uploads/9f/c9/54/5bcd2b69d8e2d.jpg",
        "https://b2c.jihainet.com/static/uploads/9f/c9/54/5bcd2b69d8e2d.jpg",
        "https://b2c.jihainet.com/static/uploads/9f/c9/54/5bcd2b69d8e2d.jpg"
      ],
      small: true,
      value: null,

      formData: {},
      goodsOptions: {},
    }
  },
  components: {
    CardTitle
  },
  computed: {
    categoryList: {
      get: function () {
        let arr = [];
        for (let i in this.$store.state.goods.allCategories){
          for (let j in this.$store.state.goods.allCategories[i].child){
              if(this.$route.query.id.toString() === this.$store.state.goods.allCategories[i].child[j].id.toString()){
                arr = this.$store.state.goods.allCategories[i]['child'];
                return arr;
              }
          }
        }
      },
      set: function (val) {}
    }
  },
  // async asyncData (ctx) {
  //   console.log(ctx);
  //   try{
  //     // 商品子分类
  //     const { data: { data }, status } = await getCategories({parent_id: ctx.query.id, method: 'categories.getchildcat'});
  //     return {
  //       categoryList: (status === 200) ? data : [],
  //     }
  //   }catch(e){
  //     return {
  //       categoryList: [],
  //     }
  //   }
  // },
  created(){
    this.getPageData();
    this.getBrowsingList();
  },
  methods:{
    async getPageData(){
      // const { data: { data }, status } = await getCategories({parent_id: this.$route.query.id, method: 'categories.getchildcat'});
      // this.categoryList = (status === 200) ? data : []
      this.formData = {
        page: 1,
        limit: this.small ? 10 : 3,
        where: `{"cat_id": ${this.$route.query.id}}`,
        method: "goods.getlist",
        token: this.$store.state.app.token
      }
      this.getGoodsList();
    },
    getBrowsingList(){
      this.$store.dispatch('goods/getBrowsingList', {method: "user.goodsbrowsing", limit: 3, page: 1, token: this.$store.state.app.token})
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
      await this.$store.dispatch('goods/addShopCar', {method:'cart.add', product_id: id, nums:num, token: this.$store.state.app.token})
      this.$store.dispatch('goods/getCarnumber', { method: 'cart.getnumber', token: this.$store.state.app.token });
    },
    // 分页变化
    paginationChange: function (e) {
      console.log(e);
      this.formData.page = e;
      this.getGoodsList();
    }
  },
  watch:{
    $route(to,from){
      console.log('route改变')
      return this.getPageData();
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
            color: @theme-red;
          }
        }
        .other{
          text-decoration:underline;
          line-height: 20px;
          color: @theme-gray;
          margin-right: 12px;
        }
        .img-wrapper{
          margin-top: 10px;
          .img{
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
</style>
