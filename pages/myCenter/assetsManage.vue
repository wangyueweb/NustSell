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
        <el-button type="primary" size="mini" @click="pay">立即充值</el-button>
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

    <el-dialog
      title="账户充值"
      :visible.sync="dialogVisible">
      <div>
        <div class="item">
          <div class="alias">充 值 金 额</div> 
          <el-select v-model="payData.value" placeholder="请选择">
            <el-option
              v-for="(item,index) in 100"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
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
            <el-input v-model="payData.remark" placeholder="亲，如果您有什么特别嘱咐，请备注给我们哟～～" type="textarea" :rows="2"></el-input>
          </div>
        </div>
      </div>


      <span slot="footer" class="dialog-footer">
        <el-button type="primary">保 存</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
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

  mounted(){},

  methods: {
    pay: function(){
      this.dialogVisible = !this.dialogVisible;
    },
    radioChange: function (selection, row) {
      console.log('checkboxChange',selection, row);
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
    padding-left: 24px;
    border: 1px solid @theme-silvergray;
    background: @theme-light;
  }
  .main{
    padding: 17px 24px;
    border-left: 1px solid @theme-silvergray;
    border-right: 1px solid @theme-silvergray;
    border-bottom: 1px solid @theme-silvergray;
    .grade{
      span{font-weight: 700;}
    }
    .tips{
      font-size: 14px;
      color: @theme-gray;
      margin-bottom: 43px;
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
    margin: 10px 0;
    .alias{
      width: 7em;
      display: flex;
      align-items: center;
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
</style>