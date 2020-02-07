<!-- 订单详情 -->
<template>
  <div class="detail">
    <div class="title">
      {{detail.title || ''}}
      <div class="time">{{detail.ctime || ''}}</div>
    </div>
    <div class="content">
      尊敬的客户：<br/>
      &#8195;&#8195;{{detail.content || ''}}<br/>
      <br/>
      感谢您长期对王子的关注与支持
    </div>
    <div class="footer">
      王子易购<br/>
      {{detail.ctime || ''}}
    </div>
  </div>
</template>

<script>
import { mainRequest } from "@/services/api"
export default {
  name: "noticeDetail",
  layout: function(context){
    return 'notice'
  },
  
  data () {
    return {
      detail: {}
    };
  },

  fetch ({ app: { context: ctx, router: { currentRoute: cur } }, redirect}) {
  },

  components: {
  },

  computed: {},

  created(){
    this.getNoticeDetail();
  },

  mounted(){
  },

  methods: {
    async getNoticeDetail () {
      try{
        let formData = {
          id: this.$route.params.id,
          method: 'notice.noticeInfo'
        }
        let {status, data} = await mainRequest(formData);
        console.log(status,data);
        if(status === 200 && data && data.status){
          this.detail = data.data;
        }
      }
      catch(error){
        console.log(`getNoticeDetail + ${error}`);
      }
    }
  }
}
</script>

<style lang='less' scoped>
@import "../../../assets/css/theme.less";
.detail{
  padding: 25px 37px;
  background: @theme-white;
  .title{
    font-size: 22px;
    font-weight: 700;
    text-align: center;
    .time{
      font-size: 14px;
      text-align: center;
      color: @theme-gray;
    }
  }
  .footer{
    text-align: right;
  }
}
</style>