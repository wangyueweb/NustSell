<!-- 站内公告 -->
<template>
  <div class="notice">
    <!-- 详情 -->
    <div class="detail">
      <div class="tab">
        <div class="line1">
          <span :class="{ selected: selected === 0 }" @click="selected = 0">系统提醒</span>
          <span :class="{ selected: selected === 1 }" @click="selected = 1">促销活动公告</span>
        </div>
        <div class="line2"></div>
      </div>

      <div v-if="selected === 0">
        <el-table
        :data="tableData"
        style="width: 100%"
        @row-click="toId"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="title">
          </el-table-column>
          <el-table-column
            align="right">
            <template slot-scope="scope">
              <span>{{dayjs.unix(scope.row.ctime).format('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <span>删除</span>
        </div>
      </div>
        
      <div v-if="selected === 1">
        促销活动公告
      </div>
    </div>
  </div>
</template>

<script>
import { mainRequest } from "@/services/api"
import { mapState } from 'vuex';
import { getSellInfo } from "@/services/api";
export default {
  name: "Notice",
  layout: function(context){
    return 'user'
  },
  data () {
    return {
      selected: 0,
      // tableData: [
      //   {
      //     msg: "欢迎您加入“王子易购“ 网，快速下单，立马送达。马尼拉最实惠的商品......",
      //     time: '2016-05-03',
      //   },
      //   {
      //     msg: "恭喜您注册成功，您的账号为“09054624544‘’",
      //     time: '2016-05-03',
      //   },
      //   {
      //     msg: "国庆期间，全场优惠惠赠",
      //     time: '2016-05-03',
      //   }
      // ],
      formData: {
        page: 1,
        pageSize: 10,
        orderType: 'desc',
        method: 'notice.noticeList'
      }
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

  components: {},

  computed: {
    ...mapState({
      tableData: state => state.user.noticeList
    })
  },

  created(){
    this.$store.dispatch('user/getNotice', this.formData);
  },

  mounted(){},

  methods: {
    toId: function (e) {
      console.log(e);
      this.$router.push({name: 'myCenter-notice-id', params: e});
    }
  }
}
</script>

<style lang='less' scoped>
@import url('../../../assets/css/theme.less');
.notice{
  background: @theme-white;
  padding: 23px 47px;
  .title, .name-wrapper, .phone-wrapper, .email-wrapper{
    line-height: 30px;
  }
  .name, .phone, .email{
    margin-left: 13px;
    font-weight: 700;
  }
  .edit{
    margin-right: 40px;
    color: @theme-lightgray;
  }

  .detail {
    .line1 {
      span {
        color: @theme-lightgray;
        margin-right: 20px;
        @cursor-pointer();
      }
      .selected {
        color: @theme-black;
        border-bottom: 4px @theme-black solid;
      }
    }
    .line2 {
      height: 1px;
      background: @theme-black;
      margin-top: 4px;
    }
    .card{
      padding: 38px 45px;
      border: solid 1px @theme-silvergray;
      line-height: 28px;
    }
  }
}
</style>