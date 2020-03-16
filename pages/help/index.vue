<!-- help -->
<template>
  <div class="help">
    帮助中心
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getSellInfo } from "@/services/api";
export default {
  name: 'Help',
  layout: context => 'help',
  data () {
    return {
      success: 1
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
  },

  computed: {
    ...mapState({
      
    })
  },

  created () {
  },

  mounted () {},

  methods: {}
}
</script>

<style lang='less' scoped>
@import "../../assets/css/theme.less";
.help{
  padding: 20px 40px;
  background: @theme-white;
}
</style>
