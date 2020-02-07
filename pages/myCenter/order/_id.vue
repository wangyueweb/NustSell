<!-- 订单详情 -->
<template>
  <div class="detail">
    <div class="status">
      <CardTitle :textLine='true' :titleLine='true' name='订单状态'></CardTitle>
      <div class="content">
        <div class="item">
          <span class="alias">订单号</span>
          <span class="value">2019092145593</span>
        </div>
        <div class="item">
          <span class="alias">订单状态</span>
          <span class="value">已确认</span>
        </div>
        <div class="item">
          <span class="alias">付款状态</span>
          <span class="value">未付款</span>
          <span><el-button type="primary" size="mini">立即支付</el-button></span>
        </div>
        <div class="item">
          <span class="alias">配送状态</span>
          <span class="value">未发货</span>
        </div>
      </div>
    </div>

    <div class="list">
      <CardTitle :textLine='true' :titleLine='true' name='商品列表'></CardTitle>

      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%"
          @row-click="toId">
            <el-table-column
              prop="name"
              label="商品名称"
              align="center"
              width="260px">
            </el-table-column>
            <el-table-column
              prop="property"
              label="属性"
              align="center">
            </el-table-column>
            <el-table-column
              prop="price"
              label="价格"
              align="center">
            </el-table-column>
            <el-table-column
              prop="num"
              label="购买数量"
              align="center">
            </el-table-column>
            <el-table-column
              prop="count"
              label="小计"
              align="center">
            </el-table-column>
        </el-table>
      </div>
      <div class="summary">
        <span>商品总价 <b>₱ 1800.00</b></span>
        <span>支付方式 <b>支付宝扫码</b></span>
      </div>
    </div>

    <div class="info">
      <CardTitle :textLine='true' :titleLine='true' name='收货人信息'></CardTitle>
      <div class="content">
        <el-row>
          <el-col :span="12">
            <div class="item">
              <span class="alias">收货人姓名</span>
              <span class="value"><b>Dwan</b></span>
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
              <span class="value"><b>B4518 SM JAZZ Residences Makati</b></span>
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
              <span class="value"><b>09566781122</b></span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item">
              <span class="alias">支付方式</span>
              <span class="value"><b>支付宝扫码</b></span>
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
              <span class="value"><b>RCBC 附近</b></span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import CardTitle from '@/components/public/cardTitle';
export default {
  name: "OrderDetail",
  layout: function(context){
    return 'user'
  },
  
  data () {
    return {
      tableData: [
        {
          name: '【椰树-椰汁铁罐装245ml】正宗椰树牌椰子汁 植物蛋白椰奶',
          property: '889.00',
          price: '₱ 109.00',
          num: '1',
          count: '₱ 109.00'
        },
        {
          name: '【椰树-椰汁铁罐装245ml】正宗椰树牌椰子汁 植物蛋白椰奶',
          property: '889.00',
          price: '₱ 109.00',
          num: '1',
          count: '₱ 109.00'
        },
        {
          name: '【椰树-椰汁铁罐装245ml】正宗椰树牌椰子汁 植物蛋白椰奶',
          property: '889.00',
          price: '₱ 109.00',
          num: '1',
          count: '₱ 109.00'
        },
        {
          name: '【椰树-椰汁铁罐装245ml】正宗椰树牌椰子汁 植物蛋白椰奶',
          property: '889.00',
          price: '₱ 109.00',
          num: '1',
          count: '₱ 109.00'
        },
        {
          name: '【椰树-椰汁铁罐装245ml】正宗椰树牌椰子汁 植物蛋白椰奶',
          property: '889.00',
          price: '₱ 109.00',
          num: '1',
          count: '₱ 109.00'
        },
      ],
    };
  },

  fetch ({ app: { context: ctx, router: { currentRoute: cur } }, redirect}) {
  },

  components: {
    CardTitle
  },

  computed: {},

  created(){},

  mounted(){
  },

  methods: {}
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
      display: inline-block;
      margin-right: 25px;
    }
    .alias{
      width: 4em;
    }
    .value{
      width: 140px;
    }
  }
  .info{
    margin-top: 20px;
    .alias, .value{
      display: inline-block;
      margin-right: 25px;
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
</style>