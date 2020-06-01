<!-- 站内公告 -->
<template>
  <div class="notice">
    <!-- 详情 -->
    <div class="detail">
      <div class="tab">
        <div class="line1">
          <span :class="{ selected: selected === 0 }" @click="tabChange(0)">系统提醒</span>
          <span :class="{ selected: selected === 1 }" @click="tabChange(1)">促销活动公告</span>
        </div>
        <div class="line2"></div>
      </div>

      <div>
        <el-table
          :data="tableData"
          style="width: 100%"
          @row-click="toId"
          :show-header="false"
          @selection-change="handleSelectionChange"
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
        <div style="margin-top: 20px;cursor: pointer;" @click="deleteNoticeList(selectList)">
          <span>删除</span>
        </div>
      </div>

      <el-pagination
        :page-count="currentPage"
        :current-page="1"
        @current-change="paginationChange"
        background
        layout="prev, pager, next"
        style="text-align: right;margin-top:10px;"
      >
      </el-pagination>
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
      selectList: []
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
      tableData: state => state.user.noticeList.data,
      currentPage: state => Math.ceil(state.user.noticeList.coent/5)
    })
  },

  created(){
  },

  mounted(){
    this.getPageData();
  },

  methods: {
    getPageData(){
      let data;
      if(this.selected === 0){
        data = {
          page: 1,
          pageSize: 5,
          orderType: 'desc',
          method: 'notice.noticeList',
          token:this.$store.state.app.token
        }
      }
      if(this.selected === 1){
        data = {
          type: 2,
          page: 1,
          pageSize: 5,
          orderType: 'desc',
          method: 'notice.noticeList',
          token:this.$store.state.app.token
        };
      }
      this.getNoticeList(data);
      // this.$store.dispatch('user/getNotice', {page: 1,pageSize: 3,orderType: 'desc',method: 'notice.noticeList', token:this.$store.state.app.token} );
    },
    tabChange(type){
      this.selected = type;
      let data;
      if(type === 0){
        data = {
          page: 1,
          pageSize: 5,
          orderType: 'desc',
          method: 'notice.noticeList',
          token:this.$store.state.app.token
        }
      }
      if(type === 1){
        data = {
          type: 2,
          page: 1,
          pageSize: 5,
          orderType: 'desc',
          method: 'notice.noticeList',
          token:this.$store.state.app.token
        };
      }

      this.$store.dispatch('user/getNotice', data);
    },
    getNoticeList(data){
      this.$store.dispatch('user/getNotice', data);
    },
    toId: function (e) {
      console.log(e);
      this.$router.push({name: 'myCenter-notice-id', params: e});
    },
    // 分页变化
    paginationChange: function (e) {
      let data;
      if(this.selected === 0){
        data = {
          page: e,
          pageSize: 5,
          orderType: 'desc',
          method: 'notice.noticeList',
          token:this.$store.state.app.token
        }
      }
      if(this.selected === 1){
        data = {
          type: 2,
          page: e,
          pageSize: 5,
          orderType: 'desc',
          method: 'notice.noticeList',
          token:this.$store.state.app.token
        };
      }

      this.getNoticeList(data);
    },
    handleSelectionChange(val) {
      this.selectList = val;
    },
    // 批量删除公告
    deleteNoticeList: function(list) {
      if (list.length === 0) {
        this.$message.error('请勾选至少一条');
        return;
      }else if(list.length === 1){
        this.$confirm('删除此条公告, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          const id = list[0]['id'];
          let data = {
            method: 'notice.noticadel',
            id:id,
            token:this.$store.state.app.token
          }
          this.$store.dispatch('user/deleteNotice', data)
            .then(() => {
              this.getPageData();
            });
        })
        .catch(err => {})
      }else{
        this.$confirm('批量删除公告, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          const idList = list.map(item => item.id);
          console.log(idList);
          let data = {
            method: 'notice.noticadelall',
            id:idList.join(','),
            token:this.$store.state.app.token
          }

          this.$store.dispatch('user/deleteNoticeList', data)
            .then(() => {
              this.getPageData();
            });

        })
        .catch(err => {})
      }
    },
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