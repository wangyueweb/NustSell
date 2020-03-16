<!-- 订单详情 -->
<template>
  <div class="detail">
    <div class="status">
      <CardTitle :textLine='true' :titleLine='true' name='订单状态'></CardTitle>
      <div class="content">
        <div class="item">
          <span class="alias">订单号</span>
          <span class="value">{{orderDetail.order_id || ''}}</span>
        </div>
        <div class="item">
          <span class="alias">订单状态</span>
          <span class="value">{{orderDetail.ship_status | statusFilter}}</span>
        </div>
        <div class="item">
          <span class="alias">付款状态</span>
          <span class="value value2">{{orderDetail.pay_status | payFilter}}</span>
          <span><el-button type="primary" size="mini" style="padding: 7px 26px;font-size: 14px;">立即支付</el-button></span>
        </div>
        <div class="item">
          <span class="alias">配送状态</span>
          <span class="value">{{orderDetail.status | deliverFilter}}</span>
        </div>
      </div>
    </div>

    <div class="list">
      <CardTitle :textLine='true' :titleLine='true' name='商品列表'></CardTitle>

      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%">
            <el-table-column
              prop="name"
              label="商品名称"
              align="center"
              width="260px">
            </el-table-column>
            <el-table-column
              prop="addon"
              label="属性"
              align="center">
            </el-table-column>
            <el-table-column
              prop="price"
              label="价格"
              align="center">
            </el-table-column>
            <el-table-column
              prop="nums"
              label="购买数量"
              align="center">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="小计"
              align="center">
            </el-table-column>
        </el-table>
      </div>
      <div class="summary">
        <span>商品总价 <b>₱ {{orderDetail.order_amount || "0.00"}}</b></span>
        <span>支付方式 <b>{{orderDetail.payment_name || ""}}</b></span>
      </div>
    </div>

    <div class="info">
      <CardTitle :textLine='true' :titleLine='true' name='收货人信息'></CardTitle>
      <div class="content">
        <el-row>
          <el-col :span="12">
            <div class="item">
              <span class="alias">收货人姓名</span>
              <span class="value"><b>{{orderDetail.ship_name || ''}}</b></span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item">
              <span class="alias">电子邮箱地址</span>
              <span class="value"><b>dwan.designer@gmail.com</b></span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item">
              <span class="alias">详细地址</span>
              <span class="value"><b>{{orderDetail.ship_address ||''}}</b></span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item">
              <span class="alias">缺货处理</span>
              <span class="value"><b></b></span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item">
              <span class="alias">手机</span>
              <span class="value"><b>{{orderDetail.ship_mobile || ''}}</b></span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item">
              <span class="alias">支付方式</span>
              <span class="value"><b>{{orderDetail.payment_name || ''}}</b></span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item">
              <span class="alias">送货时间</span>
              <span class="value"><b>2019-09-21 01:00</b></span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item">
              <span class="alias">标志地址</span>
              <span class="value"><b>{{orderDetail.ship_area_name || ''}}</b></span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import CardTitle from '@/components/public/cardTitle';
import { mapState } from "vuex";
import { getSellInfo } from "@/services/api";
export default {
  name: "OrderDetail",
  layout: function(context){
    return 'user'
  },
  
  data () {
    return {
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
      if(status < 3){
        return '未发货'
      }
      if(status === 3) {
        return '已发货 等待收货'
      }
      if(status > 3) {
        return '已收货'
      }
    },
    payFilter: function (status) {
      if(status === 1) {
        return '未付款'
      }
      if(status > 1) {
        return '已付款'
      }
    },
    
    deliverFilter: function (status) {
      if(status < 2){
        return '待发货'
      }
      if(status === 3) {
        return '已发货 等待收货'
      }
      if(status > 3) {
        return '已完成'
      }
    }
  },

  fetch ({ app: { context: ctx, router: { currentRoute: cur } }, redirect}) {
  },

  components: {
    CardTitle
  },

  computed: {
    ...mapState({
      orderDetail: state => state.order.orderDetail,
    }),
    tableData: {
      get: function(){
        return this.$store.state.order.orderDetail.items;
      },
      set: function(val){}
    }
  },

  created(){
    this.tableData = this.$route.query.items;

    this.getPageData();
  },

  mounted(){
  },

  methods: {
    getPageData: function () {
      this.$store.dispatch("order/getOrderDetail", {method: 'order.details', order_id: this.$route.query.id, token: this.$store.state.app.token});
    }
  }
}
</script>

<style lang='less' scoped>
@import "../../../assets/css/theme.less";
.detail{
  padding: 25px 37px;
  background: @theme-white;
  .status, .info{
    .content{
      margin-top:20px;
      .item{
        line-height: 32px;
      }
    }
  }
  .status{
    .alias, .value{
      font-size: 15px;
      display: inline-block;
      margin-right: 25px;
    }
    .alias{
      width: 4em;
    }
    .value{
      font-weight: 600;
      width: 90px;
    }
    .value2{
        color: #F51717;
    }
  }
  .info{
    margin-top: 40px;
    .alias, .value{
      display: inline-block;
      margin-right: 20px;
    }
    .alias{
      width: 6em;
    }
    .value{
      width: 280px;
    }
  }
  .list{
    margin-top: 20px;
    .table{
      margin-top: 15px;
      border-top: solid 1px @theme-silvergray;
      border-left: solid 1px @theme-silvergray;
      border-right: solid 1px @theme-silvergray;
    }
    .summary{
      margin-top: 20px;
      span{
        color: @theme-black;
        margin-right: 80px;
        b{
          margin-left: 25px;
        }
      }
    }
  }
}

.table /deep/ .el-table th{font-size: 15px;font-weight: 100;text-align: center;background: #F2F2F2;color: #000;}
.table /deep/ .el-table td .cell{font-size: 14px;text-align: center;}

</style>