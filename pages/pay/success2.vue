<!-- orderCenter -->
<template>
  <div class="main-wrapper">
    <div class="content">
      <div class="img-wrapper">
        <el-image :src="result.img" style="width:225px;height:295px;" v-if="result.type === 1"></el-image>
      </div>
      <div class="content-wrapper">
        <div class="describe">{{result.type === 1 ? '微信扫码二维码付款' : result.type === 2 ? '请转账支付宝:' + result.paynum : ''}}</div>
        <div class="number">
            <span id="key">充值编号: {{$route.query.id}}</span>
            <span title="复制" type="copy" class="copy"  data-clipboard-target="#key" @click="copy" >
                <img src="../../assets/img/fz.png" alt="" class="copeimg">
            </span>
        </div>
        <div class="btn-wrapper">
          <el-button @click="$router.push({name: 'index'})">返回首页</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Clipboard from 'clipboard'
import { getSellInfo } from "@/services/api";
  
export default {
  name: 'Success2',
  layout: context => 'payment',
  data () {
    return {
      formData: {
        method: "user.getPaycode",
        token: this.$store.state.app.token,
        number: this.$route.query.id
      },
      result: {
        type: '',
        img: ''
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

  components: {
  },

  computed: {},

  created () {
    this.getPageData();
  },

  mounted () {},

  methods: {
    getPageData: function(){
      this.$store.dispatch("order/getRechargeCode", this.formData)
        .then(res => {
          this.result = res;
        })
    },
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
      text-align: center;
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
