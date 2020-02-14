<!-- Swiper -->
<template>
<div style="padding:37px;background:#fff;position:relative">
  <div v-swiper:mySwiper="options">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in list" :key="index" @click="$router.push({name: 'goodsDetail', query: {id: item.id}})">
        <div style="background:#fff">
          <el-image :src="item[imgKey]" style="width:180px;height:180px"></el-image>
        </div>
        
        <el-tooltip :content="item.name" placement="top">
          <div class="detail">
            <div class="describe">{{item.name}}</div>
            <div class="price">P {{item.price}}</div>
            <div class="buy-btn" @click.stop="addShopCar(item.product.id, 1)">
              加入购物车
            </div>
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
  <div class="arrow">
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: function(){
        return {};
      }
    },
    list: {
      type: Array,
      default: function(){
        return [];
      }
    },
    imgKey: {
      type: String,
      default: '',
    },
    customArrow: {
      type: Boolean,
      default: null
    }
  },
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  created(){},

  mounted(){},

  methods: {
    // 加入购物车
    async addShopCar(id, num) {
      await this.$store.dispatch('goods/addShopCar', {method:'cart.add', product_id: id, nums:num, token: this.$store.state.app.token})
      this.$store.dispatch('goods/getShopCar', {method:'cart.getlist', token: this.$store.state.app.token});
    }
  }
}
</script>

<style lang='less' scoped>
@import url('../../assets/css/theme.less');
.swiper-slide{
  display: flex;
  justify-content: center;
  flex-flow: wrap;
  .detail{
    width: 100%;
    .describe,
    .price {
      color: @theme-black;
      text-align: center;
    }
    .describe {
      margin-top: 10px;
      line-height: 17px;
      font-size: 14px;
      @text-ellipsis();
    }
    .price {
      font-size: 20px;
      font-family: Tahoma;
      margin: 0 0 12px 0;
      line-height: 24px;
    }
    .buy-btn {
      height: 34px;
      line-height: 34px;
      text-align: center;
      background: @theme-black;
      color: @theme-white;
      margin-top: 4px;
      width: 124px;
      margin: auto;
      @cursor-pointer();
    }
  }
}
.swiper-button-prev.swiper-button-disabled{
  background-image: url('../../assets/img/arrow-left1.png');
  background-size: 40px 44px;
}
.swiper-button-prev{
  background-image: url('../../assets/img/arrow-left1.png');
  background-size: 40px 44px;
}

.swiper-button-next.swiper-button-disabled{
  background-image: url('../../assets/img/arrow-right1.png');
  background-size: 40px 44px;
}
.swiper-button-next{
  background-image: url('../../assets/img/arrow-right1.png');
  background-size: 40px 44px;
}
</style>