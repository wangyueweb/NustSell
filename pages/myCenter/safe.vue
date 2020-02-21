<!-- 我的收藏 -->
<template>
  <div class="safe">
    <div class="title">
      安全设置
    </div>
    
    <div class="main">
      <div class="grade">您目前的账号安全等级：<span>中</span></div>
      <div class="tips">不要等到后悔莫及！通过完成下方的设置来提高账户安全等级，保障您的信息和资产安全。</div>

      <el-row class="row">
        <el-col :span="6">
          <div>
            <el-row type="flex">
              <el-col class="item">
                <div class="icon">
                  <i class="iconfont icon-shuruzhengque"></i>
                </div>
                <!-- <i class="iconfont icon-icon"></i> -->
              </el-col>
              <el-col>
                <div class="name">登录密码</div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="content">安全性高的密码可以使账号更安全。建议您定期更换密码，且设置一个包含数字和字母，并长度超过6位以上的密码。</div>
        </el-col>
        <el-col :span="6">
          <div class="handle">
            <el-button size="mini" type="primary" @click="dialogVisible = !dialogVisible">修改密码</el-button>
            <div class="amend" v-if="dialogVisible">
                <div class="close" @click="dialogVisible = !dialogVisible">X</div>
              <div class="amend-name">修改密码</div>
                <div style="width: 400px;margin: auto;">
                  <div class="item">
                    <div class="alias">原 密 码</div> 
                    <div class="address">
                      <el-input v-model="formData.oldPassword" style="width: 200px;"></el-input>
                    </div>
                  </div>
                  <div class="item">
                    <div class="alias">新 密 码</div> 
                    <div class="address">
                      <el-input v-model="formData.newPassword" style="width: 200px;"></el-input>
                    </div>
                  </div>
                  <div class="item">
                    <div class="alias">确认密码</div> 
                    <div class="address">
                      <el-input v-model="formData.newPassword" style="width: 200px;"></el-input>
                    </div>
                  </div>
                  <span slot="footer" class="dialog-footer item">
                    <el-button type="primary" style="width:130px;font-size: 15px;padding: 9px 0;">修改密码</el-button>
                    <el-button @click="dialogVisible = false" style="width:130px;font-size: 15px;padding: 9px 0;">取消</el-button>
                  </span>
                </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="6">
          <div>
            <el-row type="flex">
              <el-col class="item">
                <!-- <div class="icon">
                  <i class="iconfont icon-shuruzhengque"></i>
                </div> -->
                <i class="iconfont icon-icon"></i>
              </el-col>
              <el-col>
                <div class="name">绑定邮箱</div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="content">可使用已绑定邮箱登录王子易购账号。并订阅 最新马尼拉华人没事咨询</div>
        </el-col>
        <el-col :span="6">
          <div class="handle"><el-button size="mini" type="primary">立即绑定</el-button></div>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="6">
          <div>
            <el-row type="flex">
              <el-col class="item">
                <div class="icon">
                  <i class="iconfont icon-shuruzhengque"></i>
                </div>
                <!-- <i class="iconfont icon-icon"></i> -->
              </el-col>
              <el-col>
                <div class="name">绑定手机</div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="content">绑定手机后，您即可享受王子网丰富的手机服务，如手机登录、手机找回密码等，保证您账户更安全。</div>
        </el-col>
        <el-col :span="6">
          <div class="handle"><el-button size="mini" type="primary">修改绑定</el-button></div>
        </el-col>
      </el-row>
    </div>

    <div class="card">
      常见问题<br/>
      <br/>
      Q 为什么要进行安全设置？进行安全设置后有什么好处？<br/>
      A 王子商城账户涉及您的优惠券、礼品卡和积分资产，我们强烈建议您完善安全设置，以免造成不必要的损失；<br/>
      <br/>
      Q 安全设置完成之后可以修改吗？<br/>
      A 您可以点击“修改”按钮进行修改。
    </div>
  </div>
</template>

<script>
export default {
  name: "Collect",
  layout: function(context){
    return 'user'
  },
  data() {
    return {
      amendShow: false,
      dialogVisible: false,
      formData: {
        oldPassword: "",
        newPassword: "",
      }
    }
  },

  components: {},

  computed: {},

  created() {},

  mounted() {},

  methods: {
    toId: function (e) {
      this.$router.push({path: '/myCenter/order/' + e.id});
    },
    handleSelectionChange: function (e) {
      console.log(e)
    },
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/theme.less");
.safe{
  background: @theme-white;
  padding: 31px 36px;
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
    .row{
      padding: 25px 0;
      border-bottom: 1px solid @theme-silvergray;
      &:last-child{
        border: none;
      }

      .icon{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: @theme-black;
        margin-left: 4px;
        @centered();
        i{
          color: @theme-white;
        }
      }
      .icon-icon{
        font-size: 40px;
        color: @theme-black;
      }
      .item{
        display: flex;
        align-items: center;
      }
      .name{
        font-weight: 700;
        border-right: 1px solid @theme-lightgray;
        height: 44px;
        line-height: 44px;
      }
      .content{
        font-size: 14px;
        color: @theme-gray;
        padding-left: 20px;
        display: flex;
        align-items: center;
      }
      .handle{
        height: 44px;
        padding-left: 32px;
        display: flex;
        align-items: center;
        position: relative;
      }
    }
    
  }
  .card{
    margin-top: 13px;
    padding: 38px 45px;
    border: solid 1px @theme-silvergray;
    line-height: 28px;
  }
  .item{
    display: flex;
    margin: 10px 0;
    .alias{
      width: 8.5em;
      margin: 0 10px 0 0;
      text-align: right;
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

.amend{position: absolute;width: 875px;border: 1px solid #000;top: 35px;left: -644px;background: #fff;z-index: 100;}
.amend .amend-name{font-size: 16px;padding: 10px 0 10px 28px;font-weight: 600;}
.amend .dialog-footer{margin: 35px 0 45px 0 !important;}
.amend .close{cursor: pointer;position: absolute;top: 0;right: 5px;display: inline-block;padding: 10px;font-size: 20px;}


</style>
