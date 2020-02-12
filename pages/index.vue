<template>
  <div class="container">
    <!-- 轮播 -->
    <div :class="{nick : isFixed}" class="carousel">
      <Swiper :imgs="adverlist.map(item => item.img)" :options="bannerOption" style="height:500px" :customArrow="true">
        <div slot="arrow" class="arrow-wrapper">
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </Swiper>
    </div>
    
    <div class="main">
      <!-- 商品分类一级列表 -->
      <Category :option="item" v-for="(item, index) in headerCatList" :key="index"/>
      <!-- 底部商品展示 -->
      <div class="swiper">
        <div class="title">
          新品速购
          <span></span>
        </div>
        <!-- <div style="padding:37px;background:#fff;"> -->
          <GoodsScroll :list="newList" imgKey="image_url" :options="goodsScrollOption" :customArrow="false"></GoodsScroll>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Category from "~/components/public/category"
import Swiper from "~/components/public/swiper"
import GoodsScroll from "~/components/public/GoodsScroll"
import {getCategories, mainRequest, getSellInfo} from "~/services/api"
import { mapState } from "vuex"
export default {
  layout: function(context){
    return 'Footer'
  },
  data() {
    return {
      bannerOption: {
        slidesPerView: 1,
        centeredSlidesBounds: true,
        // spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      },
      goodsScrollOption: {
        slidesPerView: 5,
        centeredSlidesBounds: true,
        spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      },
      newList: []
    };
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
  components: {
    Category,
    Swiper,
    GoodsScroll
  },
  computed:{
    ...mapState({
      isFixed: state => state.app.isFixed,
    })
  },
  async asyncData () {
    try{
      // 获取商城基本信息
      const basicInfo = await getSellInfo();

      const headerCat = await mainRequest({method:'categories.getheadercat'});
      // 轮播
      const adverlistData = await getCategories({ method: 'advert.getAdvertList', code: 'tpl1_slider'});
      
      return {
        headerCatList: headerCat.data.data || [],
        adverlist: adverlistData.data.data.list || [],
        basicInfo: basicInfo.data
      }
    }catch(e){
      return {
        headerCatList: [],
        adverlist: []
      }
    }
  },
  created(){
    this.getNewList();
  },
  methods:{
    // 新品速购
    getNewList: async function () {
      let data = {
        page: 1,
        limit: 10,
        where: '{"hot": "1"}',
        method: "goods.getlist"
      }
      await this.$store.dispatch('goods/getGoodsList', data)
        .then(({status, data}) => {
          if(status === 200 && data && data.data){
            this.newList = data.data.list;
          }
        })
        .catch(err => {
          this.$message.error(`新品速购${err}`);
        })
      
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/css/theme.less';
.swiper-button-prev{width: 32px;height: 55px;background-image: url(../assets/img/arrow-left3.png) !important;background-size: 40px 40px !important;opacity: 0.7 !important;}
.swiper-button-next{width: 32px;height: 55px;background-image: url(../assets/img/arrow-right3.png) !important;background-size: 40px 40px !important;opacity: 0.7 !important;}

.banner{
  width: 100%;
}
.carousel{
  @1200-min();
  height: 500px;
}
.main{
  @1200();
  .arrow-wrapper{
    position: relative;
    @1200();
    .swiper-button-prev,.swiper-button-next{
      top: -250px;
    }
  }
  .swiper{
    margin-top: 50px;
    margin-bottom: 80px;
    overflow: hidden;
    .detail{
      width: 100%;
    }
  }
  
}
.title{
  font-size: 28px;
  color: @theme-black;
  font-weight: 700;
  text-align: center;
  flex-flow: column;
  @centered();
  @cursor-pointer();
  margin: 33px 0 20px 0;
  span{
    width: 60px;
    height: 6px;
    display: block;
    background: @theme-black;
  }
}
</style>
