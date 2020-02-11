<!-- orderCenter -->
<template>
  <div class="main-wrapper">
    <div class="content" v-if="success === 1">
      <div class="img-wrapper">
        <el-image :src="require('@/assets/img/erweima.png')" style="width:225px;height:225px;"></el-image>
      </div>
      <div class="content-wrapper">
        <div class="describe">微信扫码二维码付款</div>
        <div class="time">支付剩余时间：29分42秒</div>
        <div class="number">
            <span id="key">订单号：20184878851</span>
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
        <div class="number">订单号：20184878851</div>
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
  
export default {
  name: 'Success1',
  layout: context => 'payment',
  data () {
    return {
      success: 1
    }
  },

  components: {
  },

  computed: {},

  created () {},

  mounted () {},

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
      @border-dotted();
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
