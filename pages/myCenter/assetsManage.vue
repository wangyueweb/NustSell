<!-- assetsManage -->
<template>
  <div class="assetsManage">
    <div class="title">
      账户余额
    </div>

    <div class="main">
      <div class="grade">您目前的账号余额 <span>P{{authUser ? authUser.balance : 0}}</span></div>
      <div class="tips">
        立即充值，获取积分，享受10%的购物优惠。
        <el-button type="primary" size="mini" @click="pay" style="margin-left:15px;padding: 7px 26px;font-size: 14px;">立即充值</el-button>
        <div class="recharge" v-if="dialogVisible">
          <div class="close" @click="pay">X</div>
          <div class="recharge-name">账户充值</div>

          <el-form :model="rechargeForm" :rules="rechargeRules" ref="rechargeForm">
            <el-form-item prop="money" label="充值金额" label-width="108px" class="item">
              <el-input
                style="width: auto"
                v-model="rechargeForm.money"
                @input="$store.dispatch('order/getHuilv')"
                placeholder="0.00"
                type="number"
                :step="20"
                :min="0"
              ></el-input>
              <!-- <el-input-number v-model="rechargeForm.money" :step="20" controls-position="right" @change="$store.dispatch('order/getHuilv')"></el-input-number> -->
              <div class="discount">( ￥ {{rechargeForm.money ? (rechargeForm.money * huilv).toFixed(2) : 0}} )</div>
            </el-form-item>

            <el-form-item prop="type" label="支付方式" label-width="108px" class="item">
              <el-radio-group v-model="rechargeForm.type">
                <el-radio :label="1" border>微信</el-radio>
                <el-radio :label="2" border>支付宝</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item prop="remark" label="备注" label-width="108px" class="item">
              <div class="address">
                <el-input v-model="rechargeForm.remark" placeholder="亲，如果您有什么特别嘱咐，请备注给我们哟～～" type="textarea" :rows="3"></el-input>
              </div>
            </el-form-item>

          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button type="primary" style="font-size: 16px;padding: 8px 48px;" @click="recharge">确认</el-button>
            <el-button @click="dialogVisible = false" style="font-size: 16px;padding: 8px 48px;">取消</el-button>
          </span>
        </div>
      </div>
    </div>

    <CardTitle :textLine='true' :titleLine='true' name='充值记录' style="margin-top:26px;"/>

    <div v-if="balance.data.length === 0">暂无数据</div>
    <div class="table" v-else>
      <el-table
        :data="balance.data"
        style="width: 100%"
        >
          <el-table-column
            prop="type"
            label="类型"
            align="center">
          </el-table-column>
          <el-table-column
            prop="ctime"
            label="时间"
            align="center">
          </el-table-column>
          <el-table-column
            prop="money"
            label="金额"
            align="center">
          </el-table-column>
          <el-table-column
            prop="memo"
            label="状态"
            align="center">
          </el-table-column>
      </el-table>
    </div>

    <el-pagination
      v-if="balance.data.length > 0"
      @current-change="paginationChange"
      :page-count="balance.total"
      :current-page="formData.page"
      background
      layout="prev, pager, next"
      style="text-align: right;margin-top:10px;"
    >
    </el-pagination>

  </div>
</template>

<script>
import CardTitle from "@/components/public/cardTitle";
import { mapState } from 'vuex';
import { getSellInfo } from "@/services/api";
export default {
  name: "assetsManage",
  layout: function(context){
    return 'user'
  },
  data () {
    var validatorMoney = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入充值金额'));
      } else {
        if (this.rechargeForm.money <= 0) {
          callback(new Error('充值金额必须大于0'));
        }
        callback();
      }
    };
    return {
      restaurants: [],
      state1: '',
      dialogVisible: false,
      payData: {
        value: "",
        pay_method: "",
        remark: ""
      },

      formData: {
        method: "user.balancelist",
        token: this.$store.state.app.token,
        page: 1,
        limit: 10,
      },
      rechargeForm: {
        money: "",
        type: 1,
        remark: "",
        token: this.$store.state.app.token,
        method: "user.payChongzhi"
      },
      rechargeRules: {
        money: [{
          required: true, type: 'string', message: '请输入充值金额', trigger: ['blur', 'change']
        }, {validator: validatorMoney}]
      },
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

  components: {
    CardTitle
  },

  computed: {
    ...mapState({
      authUser: state => state.app.authUser,
      balance: state => state.user.balance,
      huilv: state => state.order.huilv
    }),
  },

  created(){
    this.getBalance();
  },

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
    // 充值金额
    recharge: function(){
      this.$refs['rechargeForm'].validate((valid) => {
        console.log(valid);
        if(valid){
          this.$store.dispatch('order/recharge', this.rechargeForm)
            .then(res => {
              this.$router.push({name: "pay-success2", query: {id: res.number}});
            });
        }
      })
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

    getBalance: function(){
      this.$store.dispatch("user/getBalance", this.formData);
    },
    // 分页变化
    paginationChange: function (e) {
      console.log(e);
      this.$set(this.formData, 'page', e);
      this.getBalance();
    }
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
      display: inline-block;
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

.recharge{position: absolute;width: 881px;border: 1px solid #000;top: 27px;left: -16px;background: #fff;z-index: 98;color: #000;}
.recharge .recharge-name{font-size: 16px;padding: 10px 0 15px 28px;font-weight: 600;}
.recharge .close{cursor: pointer;position: absolute;top: 0;right: 5px;display: inline-block;padding: 10px;font-size: 20px;}
.recharge /deep/ .el-input__inner{width: 150px;height: 38px;line-height: 38px;padding-right: 0;}
.recharge /deep/ .el-radio{text-align: center;height: 36px;padding: 10px 55px 0 55px;margin: 0;border-radius: 0;}

.dialog-footer{margin: 25px 0 30px 0;display: flex;
    align-items: center;
    justify-content: center;}
.table /deep/ .el-table th{background: #F2F2F2;font-weight: 100;}

</style>