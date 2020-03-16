<!-- 订单详情 -->
<template>
  <div class="detail">
    <div class="title">
      {{detail.title || ''}}
      <div class="time">{{dayjs.unix(detail.ctime).format('YYYY-MM-DD HH:mm:ss') || ''}}</div>
    </div>
    <div class="content">
      尊敬的客户：<br/>
      <br/>
      &#8195;&#8195;{{detail.content || ''}}<br/>
      <br/>
      感谢您长期对王子的关注与支持
    </div>
    <div class="footer">
      王子易购<br/>
      {{dayjs.unix(detail.ctime).format('YYYY-MM-DD HH:mm:ss') || ''}}
    </div>
  </div>
</template>

<script>
import { getSellInfo } from "@/services/api";
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