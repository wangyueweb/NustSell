<!-- orderCenter -->
<template>
  <div class="main-wrapper">
    <div class="content" v-if="success === 1">
      <div class="img-wrapper">
        <el-image :src="require('@/assets/img/erweima.png')" style="width:225px;height:225px;"></el-image>
      </div>
      <div class="content-wrapper">
        <div class="describe">微信扫码二维码付款</div>
        <div class="time">下单时间：{{dayjs($store.state.order.order.receiving_time).format('YYYY-MM-DD HH:mm:ss')}}</div>
        <div class="number">
            <span id="key">订单号：{{$store.state.order.order.order_id}}</span>
            <span title="复制" type="copy" class="copy"  data-clipboard-target="#key" @click="copy" >
                <img src="../../assets/img/fz.png" alt="" class="copeimg">
            </span>
        </div>
        <div class="btn-wrapper">
          <el-button @click="$router.push({name: 'index'})">返回首页</el-button>
          <el-button @click="success = 2">联系客服</el-button>
        </div>
      </div>
    </div>

    <div class="content" v-if="success === 2">
      <div class="img-wrapper">
        <el-image :src="require('@/assets/img/success.png')" style="width:450px;"></el-image>
      </div>
      <div class="content-wrapper">
        <div class="describe">订单成功 派送员在路上 请保持电话畅通</div>
        <div class="number">订单号：{{$store.state.order.order.order_id}}</div>
        <div class="btn-wrapper">
          <el-button @click="$router.push({name: 'index'})">返回首页</el-button>
          <el-button @click="success = 1">联系客服</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import { getSellInfo } from "@/services/api";
  
export default {
  name: 'Success1',
  layout: context => 'payment',
  data () {
    return {
      success: 2
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

  computed: {},

  created () {},

  mounted () {
    if(JSON.stringify(this.$store.state.order.order) === '{}'){
      this.$router.push({path: '/'});
    }
  },

  methods: {
      copy(){
            const clipboard = new Clipboard('.copy')
            clipboard.on('success', e => {
              alert("复制成功")
              e.clearSelection()
              clipboard.destroy()
            })
            clipboard.on('error', e => {
              alert("复制失败")
              clipboard.destroy()
            })
          },
  }
}
</script>

<style lang='less' scoped>
@import "../../assets/css/theme.less";
.copeimg{width: 18px;height: auto;vertical-align: middle;margin: -2px 0 0 5px;}
.main-wrapper{
  padding: 90px 0;
  background: @theme-white;
  @centered();
  .content{
    .img-wrapper{

    }
    .describe, .time, .number{
      text-align: center;
    }
    .describe{
      margin: 10px 0;
      font-size: 22px;
      font-weight: 700;
    }
    .time{
      color: @theme-gray;
    }
    .number{
      font-size: 20px;
      margin: 15px 0;
    }
    .btn-wrapper{
      @centered();
    }
  }
}
</style>
