<!-- 账户信息 -->
<template>
  <div class="order">
    
    <div class="tool">
      <span class="title">显示</span>

      <el-date-picker
        v-model="value"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="timestamp"
        @change="dataPickerChange">
      </el-date-picker>

      <el-select v-model="formData.status" placeholder="请选择" @change="selectChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <div class="table">
      <el-table
        :data="orderList"
        style="width: 100%"
        @row-click="toId">
          <el-table-column
            prop="order_id"
            label="订单号">
          </el-table-column>
          <el-table-column
            label="下单时间">
            <template slot-scope="scope">
              <div>
                {{dayjs.unix(scope.row.ctime).format('YYYY-MM-DD HH:mm:ss') || ''}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="总金额">
            <template slot-scope="scope">
              <div>
                ₱ {{scope.row.goods_amount}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <div>
                {{scope.row.status | statusFilter}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            >
            <template slot-scope="scope">
              <el-button type="text" @click.stop="handle(scope.row)">{{scope.row.status | statusHandle}}</el-button>
            </template>
          </el-table-column>
      </el-table>

      
    </div>

    <el-pagination
      @current-change="paginationChange"
      :page-count="page"
      :current-page="formData.page"
      background
      layout="prev, pager, next"
      style="margin-top: 10px;"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { getSellInfo } from "@/services/api";
export default {
  name: "Order",
  layout: function(context){
    return 'user'
  },
  data() {
    return {
      formData: {
        method:'order.getorderlist',
        token: this.$store.state.app.token,
        page: 1,
        limit: 10,
        start_time: "",
        end_time: "",
        status:0
      },
      value: [],
      options: [{
        value: 0,
        label: '全部'
      }, {
        value: 1,
        label: '待付款'
      }, {
        value: 2,
        label: '待发货'
      }, {
        value: 3,
        label: '待收货'
      }],
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
  filters: {
    statusFilter: function (status) {
      switch (status) {
        case 1:
          return '待付款';
        case 2:
          return '已确认 待发货';
        case 3:
          return '已确认 已发货';
        case 4:
          return '已完成';
        default:
          return ''
      }
    },
    statusHandle: function (status) {
      switch (status) {
        case 1:
          return '取消订单';
        case 2:
          return '已确认';
        case 3:
          return '确认收货';
        case 4:
          return '已完成';
        default:
          return ''
      }
    }
  },

  components: {},

  computed: {
    ...mapState({
      orderList: state => state.order.orderList.list,
      page: state => state.order.orderList.page,
    })
  },

  created() {
    this.getPageData();
  },

  mounted() {},

  methods: {
    getPageData: function() {
      this.$store.dispatch("order/getOrderList", this.formData);
    },
    // 表格操作
    handle: function (item) {
      if(item.status === 1){
        console.log('取消订单');
        this.orderCancel(item.order_id);
      }

      if(item.status === 3){
        console.log('确认收货');
        this.orderConfirm(item.order_id);
      }
    },
    toId: function (e) {
      this.$router.push({path: '/myCenter/order/' + e.order_id, query: {id: e.order_id}});
    },
    dataPickerChange: function (val) {
      console.log(val);
      if(val){
        this.$set(this.formData, "start_time", val[0]);
        this.$set(this.formData, "end_time", val[1]);
      }else{
        this.$set(this.formData, "start_time", "");
        this.$set(this.formData, "end_time", "");
      }
      this.$store.dispatch("order/getOrderList", this.formData);
    },
    selectChange: function(){
      console.log(this.formData);
      this.$store.dispatch("order/getOrderList", this.formData);
    },
    paginationChange: function(e) {
      this.$set(this.formData, 'page', e);
      this.$store.dispatch("order/getOrderList", this.formData);
    },
    // 取消订单
    orderCancel: function (id) {
      let data = {
        method: "order.cancel",
        token: this.$store.state.app.token,
        order_ids: id
      }
      this.$confirm('取消订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async () => {
          await this.$store.dispatch("order/orderCancel", data);
          this.$store.dispatch("order/getOrderList", this.formData);
        })
        .catch(err => {})
    },

    // 确认收货
    orderConfirm: function (id) {
      let data = {
        method: "order.confirm",
        token: this.$store.state.app.token,
        order_id: id
      }
      this.$confirm('确认收货, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async () => {
          await this.$store.dispatch("order/orderConfirm", data);
          this.$store.dispatch("order/getOrderList", this.formData);
        })
        .catch(err => {})
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../../assets/css/theme.less");
.order{
  padding: 20px 36px;
  background: @theme-white;
  .tool{
    margin-bottom: 20px;
    .title{
      margin-right: 5px;
    }
  }
  .table{
    border-top: solid 1px @theme-silvergray;
    border-left: solid 1px @theme-silvergray;
    border-right: solid 1px @theme-silvergray;
  }
}

.tool /deep/ .el-input__inner{height: 36px;line-height: 36px;}
.tool /deep/ .el-input__icon{height: 36px;line-height: 36px;}
.tool /deep/ .el-range-separator{width: auto; line-height: 27px;}
.table /deep/ .el-table th{font-size: 14px;font-weight: 100;text-align: center;background: #F2F2F2;color: #000;}
.table /deep/ .el-table td .cell{font-size: 14px;text-align: center;}
/deep/ .el-pagination{padding: 2px 0;}

</style>
