<!-- Swiper -->
<template>
  <div v-swiper:mySwiper="options">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in list" :key="index">
        <el-image :src="item.img" @click="toURL(item.val)"></el-image>
        <slot name="detail"></slot>
      </div>
    </div>
    
    <!-- <div class="arrow" v-if="!customArrow">
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div> -->
    
    <slot name="arrow" v-if="customArrow"></slot>

    <slot name="pagination" v-if="customArrow"></slot>

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
    isRoute: {
      type: Boolean,
      default: false
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
    toURL: function(id){
      if(this.isRoute){
        this.$router.push({name: 'goodsDetail', query: {id: id}});
      }
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
}
.swiper-button-prev.swiper-button-disabled{
  background-image: url('../../assets/img/arrow-left2.png');
  background-size: 35px 35px;
  background: #000000;
  background-position: center;
  background-repeat: no-repeat;
}
.swiper-button-prev{
  background-image: url('../../assets/img/arrow-left2.png');
  background-size: 35px 35px;
  background: #000000;
  background-position: center;
  background-repeat: no-repeat;
}

.swiper-button-next.swiper-button-disabled{
  background-image: url('../../assets/img/arrow-right2.png');
  background-size: 35px 35px;
  background: #000000;
  background-position: center;
  background-repeat: no-repeat;
}
.swiper-button-next{
  background-image: url('../../assets/img/arrow-right2.png');
  background-size: 35px 35px;
  background: #000000;
  background-position: center;
  background-repeat: no-repeat;
}
</style>