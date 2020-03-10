<!-- assetsManage -->
<template>
  <div class="assetsManage">
    <div class="title">
      账户余额
    </div>

    <div class="main">
      <div class="grade">您目前的账号余额 <span>P728.00</span></div>
      <div class="tips">
        立即充值，获取积分，享受10%的购物优惠。
        <el-button type="primary" size="mini" @click="pay" style="margin-left:15px;padding: 7px 26px;font-size: 14px;">立即充值</el-button>
        <div class="recharge" v-if="dialogVisible">
            <div class="close" @click="pay">X</div>
            <div class="recharge-name">账户充值</div>
          <div>
            <div class="item">
              <div class="alias">充 值 金 额</div> 
              <el-autocomplete
                v-model="payData.value"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
              ></el-autocomplete>
              
              <div class="discount">( ￥ 21.79 )</div>
            </div>
            <div class="item">
              <div class="alias">支 付 方 式</div> 
              <el-radio-group v-model="payData.pay_method" @change="radioChange">
                <el-radio :label="1" border>微信</el-radio>
                <el-radio :label="2" border>支付宝</el-radio>
              </el-radio-group>
            </div>
            <div class="item">
              <div class="alias"> 备 注</div> 
              <div class="address">
                <el-input v-model="payData.remark" placeholder="亲，如果您有什么特别嘱咐，请备注给我们哟～～" type="textarea" :rows="3"></el-input>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" style="font-size: 16px;padding: 8px 48px;">确认</el-button>
            <el-button @click="dialogVisible = false" style="font-size: 16px;padding: 8px 48px;">取消</el-button>
          </span>
        </div>
      </div>
    </div>

    <CardTitle :textLine='true' :titleLine='true' name='充值记录' style="margin-top:26px;"/>
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        >
          <el-table-column
            prop="id"
            label="类型"
            align="center">
          </el-table-column>
          <el-table-column
            prop="time"
            label="时间"
            align="center">
          </el-table-column>
          <el-table-column
            prop="count"
            label="金额"
            align="center">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            align="center">
          </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
import CardTitle from "@/components/public/cardTitle"
export default {
  name: "assetsManage",
  layout: function(context){
    return 'user'
  },
  data () {
    return {
      restaurants: [],
      state1: '',
      dialogVisible: false,
      payData: {
        value: "",
        pay_method: "",
        remark: ""
      },
      tableData: [
        {
          time: '2019-10-1 19:00:00',
          count: 'P1000(￥140）',
          id: '微信充值',
          state: '充值成功',
        },
        {
          time: '2019-10-1 19:00:00',
          count: 'P1000(￥140）',
          id: '支付宝充值',
          state: '等待支付',
        },
        {
          time: '2019-10-1 19:00:00',
          count: 'P1000(￥140）',
          id: '缺货退款',
          state: '退款成功',
        },
      ],
    };
  },

  components: {
    CardTitle
  },

  computed: {},

  created(){},

  mounted(){
      this.restaurants = this.loadAll();
  },

  methods: {
    pay: function(){
      this.dialogVisible = !this.dialogVisible;
    },
    radioChange: function (selection, row) {
      console.log('checkboxChange',selection, row);
    },
    
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [
        { "value": "1" },
        { "value": "5"},
        { "value": "10"},
        { "value": "15"},
        { "value": "20"},
        { "value": "25"},
      ];
    },
  }
}
</script>

<style lang='less' scoped>
@import url("../../assets/css/theme.less");
.assetsManage{
  background: @theme-white;
  padding: 30px 33px;
  .title{
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    border: 1px solid @theme-silvergray;
    background: @theme-light;
  }
  .main{
    padding: 17px 15px;
    border-left: 1px solid @theme-silvergray;
    border-right: 1px solid @theme-silvergray;
    border-bottom: 1px solid @theme-silvergray;
    .grade{
      span{font-weight: 700;}
    }
    .tips{
      font-size: 14px;
      color: @theme-gray;
      margin-bottom: 15px;
      position: relative;
    }
  }
  .table{
    margin-top: 10px;
    border-top: solid 1px @theme-silvergray;
    border-left: solid 1px @theme-silvergray;
    border-right: solid 1px @theme-silvergray;
  }
  .item{
    display: flex;
    margin: 10px 0 15px 0;
    .alias{
      font-size: 15px;
      width: 8em;
      text-align: right;
      margin: 8px 10px 0 0;
    }
    .discount{
      font-size: 14px;
      color: @theme-gray;
      display: flex;
      align-items: flex-end;
      margin-left: 8px;
    }
    .address{
      width: 570px;
    }
    .name{
      width: 200px;
      font-weight: 600;
    }
    .mobile{
      display: flex;
      width: 200px;
    }
  }
  .dialog-footer{
    @centered()
  }
}

.recharge{position: absolute;width: 881px;border: 1px solid #000;top: 27px;left: -16px;background: #fff;z-index: 100;color: #000;}
.recharge .recharge-name{font-size: 16px;padding: 10px 0 15px 28px;font-weight: 600;}
.recharge .close{cursor: pointer;position: absolute;top: 0;right: 5px;display: inline-block;padding: 10px;font-size: 20px;}
.dialog-footer{margin: 25px 0 30px 0;}
.table /deep/ .el-table th{background: #F2F2F2;font-weight: 100;}
.recharge /deep/ .el-input__inner{width: 150px;height: 38px;line-height: 38px;}
.recharge /deep/ .el-radio{text-align: center;height: 36px;padding: 10px 55px 0 55px;margin: 0;border-radius: 0;}
</style>