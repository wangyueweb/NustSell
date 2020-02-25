<!-- orderCenter -->
<template>
  <div>
    <div class="main-wrapper">
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="grid-content">
            <CardTitle name="确认订单信息">
              <div slot="tool">
                <nuxt-link :to="{name: 'pay-shopCar'}" class="returnShopCar">返回购物车修改</nuxt-link>
              </div>
            </CardTitle>

            <div class="total">{{payShopCarList.length || 0}}件商品在购物篮中</div>

            <div class="list-wrapper">
              <div class="list">
                <div v-for="(item, index) in payShopCarList" :key="index" class="item">
                  <el-row type="flex" style="width: 100%;">
                    <el-col :span="8">
                      <img :src="item.products.image_path" :alt="item.products.name" width="94" height="94">
                    </el-col>
                    <el-col :span="16">
                      <div class="describe">
                        {{item.products.name}}
                      </div>
                      <div>
                        <span>
                          {{item.nums}}
                        </span>
                        <span class="price">{{item.products.amount}}P</span>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content right">
            <div class="title">收货信息</div>
            <div class="tips" v-if="addressList.length === 0">您还没有收货信息</div>

            <div class="address">
              <el-checkbox-group
                v-model="checkList"
              >
                <el-checkbox
                  v-for="(item, index) in addressList"
                  :key="index"
                  @change="checkboxChange(item)"
                  border
                  :label="item.name"
                  :checked="item.is_def === 1"
                  style="height: 32px;display: flex;align-items: center;margin:5px 0;padding: 0 20px;"
                >
                  <div style="width: 690px;">
                    <span class="name" style="display:inline-block; width:30%">{{item.name}}</span>
                    <span class="mobile" style="display:inline-block; width:30%">{{item.mobile}}</span>
                    <span class="address" style="display:inline-block; width:25%">{{item.address}}</span>
                    <span class="tools">
                      <span>修改</span> | <span>删除</span>
                    </span>
                  </div>
                </el-checkbox>
              </el-checkbox-group>
            </div>

            <div class="primary-box">
                <el-button type="primary" size="mini" class="add-btn" @click="addsiteTo">+新增收获地址</el-button>
                <div class="addsite" v-if="addsiteShow">
                  <div class="close" @click="closeTo">X</div>
                  <div class="addsite-name">由于您未登录下单，填入以下信息将会自动注册账号</div>
                  <div>
                    <div class="item">
                      <div class="alias d-ib">所 在 地 区</div> 
                      <el-radio-group v-model="addsite.choice">
                        <el-radio :label="1" border>Makati</el-radio>
                        <el-radio :label="2" border>BGC</el-radio>
                        <el-radio :label="3" border>Mandaluyon</el-radio>
                      </el-radio-group>
                    </div>
                    <div class="item">
                      <div class="alias d-ib">详 细 地 址</div> 
                      <div class="address d-ib">
                        <el-input class="siteinput" v-model="addsite.site" placeholder="请输入详细地址"></el-input>
                      </div>
                    </div>
                    <div class="item">
                      <div class="alias d-ib">收货人姓名</div> 
                      <div class="name d-ib">
                          <el-input v-model="addsite.name" placeholder="请输入收货人姓名"></el-input>
                      </div>
                    </div>
                    <div class="item">
                      <div class="alias d-ib">收货人手机</div> 
                      <div class="mobile hintbox d-ib">
                        <el-input class="hintinput" v-model="addsite.phone" placeholder="请输入在菲手机号"></el-input>
                        <div class="hint">+63  |</div>
                      </div>
                    </div>
                    <div class="item">
                      <div class="alias d-ib">输入手机验证码</div> 
                      <div class="name d-ib">
                          <el-input v-model="addsite.code" placeholder="请输入手机验证码"></el-input>
                      </div>
                      <div class="authcode d-ib">获取验证码</div>
                    </div>
                    <div class="item">
                      <div class="alias d-ib">输入登录密码</div> 
                      <div class="name d-ib">
                          <el-input v-model="addsite.password" placeholder="请输入登录密码"></el-input>
                      </div>
                    </div>
                  </div>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary">保 存</el-button>
                    <el-button>取 消</el-button>
                  </div>
                  
                  <div class="protocol">
                      <el-checkbox-group v-model="addsite.deal" style="display: inline-block;">
                        <el-checkbox label="注册即同意" name="agree" class="agree"></el-checkbox>
                      </el-checkbox-group>
                      <a href="" class="userAgreement">《用户协议》</a>
                  </div>
                </div>
            </div>  
            <div class="line"></div>

            <div class="title">收货时间</div>

            <el-date-picker
              v-model="receiving_time"
              type="date"
              placeholder="选择日期"
              :picker-options="expireTimeOption">
            </el-date-picker>

            <el-time-picker
              arrow-control
              v-model="receiving_time"
              :picker-options="{
                selectableRange: '18:30:00 - 20:30:00'
              }"
              placeholder="任意时间点">
            </el-time-picker>

            <div class="line"></div>
            <div class="title">请选择您的付款方式 <span class="discount">（满500P免运费）</span></div>
            
            <el-radio-group class="radiogroup" v-model="receipt_type" @change="histTypeUpdate">
              <el-radio :label="0" border>货到付款</el-radio>
              <el-radio :label="1" border>微信</el-radio>
              <el-radio :label="2" border>支付宝</el-radio>
              <el-radio :label="3" border>余额付款</el-radio>
            </el-radio-group>
            <div class="line"></div>
            
            <div class="current" v-if="currentShow">
                <span class="current-span1">您目前的帐号余额：</span>
                <span class="current-span2">P728.00</span>
                <span class="current-span3">立即充值</span>
            </div>

            <div class="line" v-if="currentShow"></div>

            <div class="title">给我们留言<span class="tips">（非必填项）</span></div>

            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 6}"
              placeholder="亲，如果您有什么特别嘱咐，请备注给我们哟～～"
              v-model="memo">
            </el-input>
          </div>
        </el-col>
      </el-row>
    </div>
    
    <el-footer height="80px" class="footer">
      <div class="content">
        <el-row>
          <el-col :span="10">&nbsp;</el-col>
          <el-col :span="14">
            <el-row type="flex" align="middle" style="height:80px">
              <el-col>
                <div>商品金额</div>
                <div>P{{(amount.goods_amount - amount.order_pmt) || 0 }}</div>
              </el-col>
              <el-col>
                <div>商品优惠</div>
                <div>P{{amount.order_pmt || 0}}</div>
              </el-col>
              <el-col>
                <div>运费</div>
                <div>0.00</div>
              </el-col>
              <el-col>
                <div>还需支付</div>
                <div class="count">P{{amount.goods_amount || 0}}</div>
              </el-col>
              <el-col>
                <div>
                  <el-button type="danger" class="large-btn" @click="shopCarSubmit">提交订单</el-button>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-footer>

    <el-dialog
      title="由于您未登录下单，填入以下信息将会自动注册账号"
      :visible.sync="no_login">

      <el-form :model="registerForm" :rules="registerRules" ref="registerForm" class="registerForm">
        <el-form-item prop="mobile" label="+63" label-width="50px">
          <el-input v-model="registerForm.mobile" placeholder="请输入在菲手机号"></el-input>
        </el-form-item>

        <el-form-item prop="code" label-width="0">
          <el-row :gutter="10">
            <el-col :span="16">
              <el-input v-model="registerForm.code" autocomplete="off" placeholder="请输入短信验证码" maxlength="6"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" class="large-btn" @click="sendMsg" :disabled="statusMsg ? true : false" v-text="statusMsg ? statusMsg : '获取验证码'"></el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="password" label-width="0">
          <el-input type="password" v-model="registerForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item label-width="0">
          <el-button class="large-btn" type="danger" @click="doVerify">确认</el-button>
        </el-form-item>
      </el-form>

      <el-checkbox-group v-model="agree" style="display: inline-block;">
        <el-checkbox label="注册即同意" name="agree" class="agree"></el-checkbox>
      </el-checkbox-group>
      <a href="" class="userAgreement">《用户协议》</a>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary">保 存</el-button>
        <el-button @click="no_login = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CardTitle from "@/components/public/cardTitle";
import { mapState } from "vuex";
export default {
  name: "OrderCenter",
  layout: function(context){
    return 'payment'
  },
  data () {
    return {
      checkList: [],
      receiving_time: new Date(),
      receipt_type: 1,
      memo: "",

      
        expireTimeOption: {
            disabledDate(date) {
                    return date.getTime() <= Date.now();
            }
        },
      addsiteShow: false,
      value1: '',
      currentShow: false,
      textarea2: "",

      no_login: this.$store.state.app.token ? false : true,

      registerRules:{
        mobile: [{
          required: true, type: 'string', message: '请输入在菲手机号', trigger: ['blur', 'change']
        }],
        password: [{
          required: true, type: 'string', message: '请输入密码', trigger: ['blur', 'change']
        }],
        code: [{
          required: true, type: 'string', message: '请输入短信验证码', trigger: ['blur', 'change']
        }]
      },
      registerForm: {
        mobile: '',
        password: '',
        code: '',
      },
      agree:[],
      statusMsg: '',
      addsite: {
          choice:'',
          site:'',
          name:'',
          phone:'',
          code:'',
          password:'',
          deal:'',
      }
    };
  },

  components: {
    CardTitle
  },

  computed: {
    ...mapState({
      payShopCarList: state => state.order.payShopCar.list.filter(item => (item.is_select === true)),
      addressList: state => state.user.addressList,
      amount: state => state.order.amount
    })
  },

  created(){
    this.getPageData();
  },

  mounted(){},

  methods: {
    getPageData: async function(){
      let data = {
        ids: this.$route.query.ids,
        method:'cart.getlist',
        area_id:0,
        coupon_code:'',
        point:0,
        receipt_type:0,
        token: this.$store.state.app.token
      }
      // 获取前往结账购物车列表
      this.$store.dispatch('order/payShopCar', data);

      const formData = {
        method:'user.getusership',token: this.$store.state.app.token
      }
      // 获取获取收货地址
      this.$store.dispatch('user/getAddress', formData);
    },
    checkboxChange: function(e){
      console.log(e);
      this.checkList = [];
      this.checkList.push(e.name);
    },

    shopCarSubmit: async function(){
      let addressID = this.addressList.find(item => item.name === this.checkList[0])['id'];
      console.log(addressID);
      let data = {
        cart_ids: this.$route.query.ids,
        memo: this.memo, // 留言备注
        receipt_type: this.receipt_type, // 支付方式 （目前默认为1，线下支付）
        uship_id: addressID, // 收货地址ID
        receiving_time: this.dayjs(this.receiving_time).format('YYYY-MM-DD HH:mm:ss'), // 收货时间
        method: "order.create",
        token: this.$store.state.app.token
      }

      console.log(data);

      await this.$store.dispatch("order/shopCarSubmit", data)
        .then(() => {
          console.log('提交成功');
          this.$router.push({name: 'pay-success1'});
        })
        .catch(err => {
          console.log('提交失败');
        })

      
    },



    // 拼图验证
    doVerify: function () {
      this.$refs['registerForm'].validate((valid) => {
        console.log(valid);
        if(valid){
          this.stepActive = 'verify'
        }
      })
    },
    // 发送短信验证码
    sendMsg: function () {
      console.log('sendMsg');
      const self = this;
      let mobilePass;

      if ( this.timerid ){
        return false;
      }

      this.$refs['registerForm'].validateField('mobile', (valid) => {
        mobilePass = valid;
      })

      this.statusMsg = '';

      if(mobilePass){
        return false;
      }

      if (!mobilePass) {
        let data = {
          mobile: this.registerForm.mobile,
          code: 'reg',
          method: 'user.sms'
        }
        mainRequest(data)
          .then(({ status, data }) => {
            console.log(status,data);
            if(status === 200){
              if(data.status){
                let count = 60;
                this.statusMsg = `${count --}秒`;
                this.timerid = setInterval(function(){
                  self.statusMsg = `${count --}秒`;
                  if(count === 0){
                    clearInterval(self.timerid);
                    self.timerid = null;
                    self.statusMsg = '';
                  }
                },1000)
              }
              this.$message({
                message: data.msg,
                type: data.status ? 'success' : 'danger'
              });
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    histTypeUpdate: function(histType) {
        if(histType == 3){
            this.currentShow = true
        }else{
            this.currentShow = false
        }
    },
    closeTo: function(){
        this.addsiteShow = false
    },
    addsiteTo: function(){
        this.addsiteShow = true
    },
  }
}
</script>

<style lang='less' scoped>
@import "../../assets/css/theme.less";
.current{margin: 0 0 0 0;font-size: 15px;color: #000;}
.current .current-span2{font-weight: 600;}
.current .current-span3{display: inline-block;color: #fff;background: #000;font-size: 16px;width: 120px;height: 33px;line-height: 33px;margin: 0 0 0 20px;text-align: center;}
.footer{
  background: @theme-white;
  .content{
    width: 1200px;
    height: 100%;
    margin: auto;
    .count{
      color: @theme-red;
      font-weight: 700;
    }
  }
}
.main-wrapper{
  margin-bottom: 150px;
}
.grid-content{
  background: @theme-white;
  padding: 20px;
  .returnShopCar{
    color: @theme-lightgray;
  }
  .total{
    margin-top: 25px;
    font-weight: 700;
  }
  .list-wrapper{
    margin-top: 6px;
    border-top: 1px solid @theme-silvergray;
    padding: 8px 0;
  }
  .list{
    max-height: 392px;
    overflow-y: scroll;
    .item{
      height: 114px;
      @centered();
      border-bottom: 1px solid @theme-silvergray;
      .describe{
        line-height: 19px;
        margin-bottom: 20px;
      }
      .price{
        margin-left: 30px;
      }
    }
  }
}
.right{
  background: @theme-white;
  padding: 30px 34px;
  .title{
    margin-bottom: 9px;
    .discount{
      color: @theme-gray;
      font-size: 14px;
    }
  }
  .tips{
    color: @theme-lightgray;
  }
  .add-btn{
    margin-top: 9px;
  }
  .line{
    height: 1px;
    background: @theme-silvergray;
    margin: 20px 0;
  }
}


.d-ib{display: inline-block;}
.primary-box{position: relative;}
.addsite{border: 1px solid #000;position: absolute;top: 36px;left: -34px;width: 797px;background: #fff;z-index: 99;padding: 0 10px;}
.addsite .addsite-name{padding: 6px 0 20px 5px;}
.addsite .alias{width: 125px;margin: 0 6px 0 0;text-align: right;}
.addsite .item{margin: 0 0 10px 0;}
.addsite .el-radio{min-width: 140px;text-align: center;margin: 0 10px 0 0 !important;}
.addsite .siteinput{width: 500px;}
.addsite .authcode{width: 125px;height: 38px;line-height: 38px;margin: 0 0 0 12px;font-size: 16px;background: #404040;color: #fff;text-align: center;}
.addsite .dialog-footer{margin: 20px 0 0 136px;}
.addsite .dialog-footer button{min-width: 110px;}
.addsite .protocol{margin: 10px 0 15px 136px;}
.addsite .close{cursor: pointer;position: absolute;top: 0;right: 5px;display: inline-block;padding: 10px;font-size: 20px;}

.radiogroup /deep/ .el-radio{margin-right: 30px !important;}
.hintbox{position: relative;}
.hintinput /deep/ .el-input__inner{padding: 0 0 0 40px;}
.hint{position: absolute;top: 8px;left: 5px;font-size: 16px;color: #999;}

</style>