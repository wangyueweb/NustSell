<template>
  <div class="nav">
    <div class="nav-main">
      <div class="nav-left">
        <span>关注
          <div>
            <img src="https://js.tuguaishou.com/new-index/vx-code.png" alt="">
            关注公众号
          </div>
        </span>
        <span style="color: #707070">&nbsp; | &nbsp;</span>
        <span>下载APP
          <div>
            <img src="https://js.tuguaishou.com/new-index/vx-code.png" alt="">
            专为菲律宾华人打造<br>
            扫码有惊喜
          </div>
        </span>
      </div>

      <div class="nav-right">
        <span class="text" @click="dologin" v-if="!hasToken">登录 </span>
        <span v-if="!hasToken" style="color: #707070">/</span>
        <span class="text" @click="doRegister" v-if="!hasToken"> 注册</span>

        <nuxt-link to="/myCenter" no-prefetch v-if="hasToken && authUser">您好, {{authUser.nickname || ''}}</nuxt-link>

        <span class="text" v-if="authUser" @click="lagout">[退出]</span>
        <span style="color: #707070" v-if="hasToken">&nbsp; | &nbsp;</span>

        <nuxt-link to="/myCenter/collect" no-prefetch v-if="hasToken">
          <i class="iconfont icon-shoucang" v-if="collectCount === 0"></i>
          <i class="iconfont icon-shoucangxing2" v-if="collectCount > 0"></i>
          收藏
        </nuxt-link>
        <span style="color: #707070">&nbsp; | &nbsp;</span>

        <span @mouseenter="showNoticeList = !showNoticeList" @mouseleave="showNoticeList = !showNoticeList" class="text" style="position:relative">
          公告
          <div class="notice-list" v-if="showNoticeList">
            <div v-for="(item, index) in noticeList" :key="index" class="notice-list-item">
              {{item.title}}
            </div>
          </div>
        </span>
      </div>
    </div>

    <el-dialog :visible.sync="dialogFormVisible" class="dialog" width="384px" top="40px" :append-to-body="false" custom-class="dialog">
      <div v-if="stepActive !== 'verify' && stepActive !== 'find'">
        <span :class="stepActive === 'register' ? 'active' : ''" class="login-title" @click="doRegister">注册</span>
        <span :class="stepActive === 'login' ? 'active' : ''" class="login-title" @click="dologin">登录</span>
      </div>

      <div v-if="stepActive === 'find'">
        <span class="login-title" @click="stepActive = 'login'" style="line-height:20px">返回</span>
        <span class="login-title active" style="margin-left:20px;">找回密码</span>
      </div>

      <div v-if="stepActive === 'login'" style="margin-top:22px;">
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="registerForm">

          <div v-if="loginError" class="loginError">{{loginErrorMsg}}</div>

          <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile" placeholder="输入手机号/邮箱"></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="密码"></el-input>
          </el-form-item>


          <div class="auto">
            <el-checkbox-group v-model="autoLogin">
              <el-checkbox label="自动登录" class="autoLogin"></el-checkbox>
            </el-checkbox-group>
            <div class="find-password" @click="stepActive = 'find'">找回密码</div>
          </div>
        </el-form>
        
        <el-button type="danger" class="large-btn" @click="login">确认</el-button>
      </div>

      <div v-if="stepActive === 'find'" style="margin-top:22px;">
        
        <el-form :model="registerForm" :rules="registerRules" ref="registerForm" class="registerForm">
          <el-form-item prop="mobile" label-width="0" class="hintbox">
            <el-input class="hintinput" v-model="registerForm.mobile" placeholder="请输入在菲手机号"></el-input>
            <div class="hint">+63  |</div>
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

        </el-form>
        
        <el-button type="danger" class="large-btn" @click="login">确认</el-button>
      </div>

      <div v-if="stepActive === 'verify'">
        <slide-verify :l="42"
          :r="10"
          :w="300"
          :h="155"
          slider-text="向右滑动"
          @success="verifyHandle('success')"
          @fail="verifyHandle('error')"
        />
      </div>

      <div v-if="stepActive === 'register'">
        <div class="tips">首次下单 享受8折</div>
        <el-form :model="registerForm" :rules="registerRules" ref="registerForm" class="registerForm">
          <el-form-item prop="mobile" label-width="0" class="hintbox">
            <el-input class="hintinput" v-model="registerForm.mobile" placeholder="请输入在菲手机号"></el-input>
            <div class="hint">+63  |</div>
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
            <el-button class="large-btn" type="danger" @click="validateBeforeSubmit">确认</el-button>
          </el-form-item>
        </el-form>

        <el-checkbox-group v-model="agree" style="display: inline-block;">
          <el-checkbox label="注册即同意" name="agree" class="agree"></el-checkbox>
        </el-checkbox-group>
        <a href="" class="userAgreement">《用户协议》</a>
      </div>
    </el-dialog>
</div>
</template>

<script>
  import { mainRequest } from "@/services/api"
  import Cookie from 'js-cookie'
  import Vue from "vue"
  import SlideVerify from 'vue-monoplasty-slide-verify'
  import { mapState } from "vuex"
  Vue.use(SlideVerify);
  export default {
    name: 'Nav',
    components: {
    },
    data() {
      return {
        dialogFormVisible: false,
        stepActive: "",
        registerForm: {
          mobile: '',
          password: '',
          code: '',
        },
        statusMsg: '',
        agree:[],
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
        loginRules: {
          mobile: [{
            required: true, type: 'string', message: '请输入账号', trigger: ['blur', 'change']
          },{
            validator:(rule, value, callback) => {
              // let reg=/[0-9a-zA-Z]{4,9}/
              // if(!reg.test(value)){
              //   callback(new Error('账号必须是由4-9位数字和字母组合'))
              // }else{
                callback()
              // }
            },
            trigger:'blur'
          }],
          password: [{
            required: true, type: 'string', message: '请输入密码', trigger: ['blur', 'change']
          }]
        },

        loginForm: {
          mobile: "",
          password: "",
        },

        loginError: false, // 登录错误
        loginErrorMsg: '', // 登录错误提示
        autoLogin: [], // 自动登录
        showNoticeList: false
      };
    },
    mounted(){
      if(this.hasToken){
        // console.log('已经登录');
        this.getUserInfo();
        this.getCollect();
      }
    },
    created(){
      this.$store.dispatch('user/getNotice', {page: 1,pageSize: 3,orderType: 'desc',method: 'notice.noticeList'});
    },
    computed: {
      ...mapState({
        authUser: state => state.app.authUser,
        noticeList: state => state.user.noticeList,
        collectCount: state => state.goods.collect.count || 0
      }),
      hasToken: {
        get: function(){
          return this.$store.state.app.token ? true : false;
        },
        set: function(val){}
      }
    },
    methods: {
      // 发送短信验证码
      sendMsg: function () {
        console.log('sendMsg');
        
        let mobilePass;

        if ( this.timerid ){
          return false;
        }

        this.$refs['registerForm'].validateField('mobile', (valid) => {
          console.log(valid);
          mobilePass = valid;
        })

        this.statusMsg = '';
        console.log(mobilePass);
        if(mobilePass){
          return false;
        }

        this.stepActive = 'verify'; // 拼图验证
      },
      // 注册弹框
      doRegister: function() {
        this.clearValue();
        this.dialogFormVisible = true;
        this.stepActive = 'register';
      },
      // 注册提交前表单验证
      validateBeforeSubmit: function () {
        if(this.agree.length > 0){
          this.$refs['registerForm'].validate((valid) => {
            console.log(valid);
            if(valid){
              this.register();
            }
          })
        }else{
          this.$message.error('请勾选并同意用户协议');
        }
      },
      // 拼图验证回调
      verifyHandle(text) {
        console.log(text);
        if(text === 'success'){
          this.getVerifyCode();
          this.stepActive = 'register';
        }
      },
      // 获取验证码
      getVerifyCode: function () {
        const self = this;
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
      },
      // 注册
      register: function () {
        const self = this;
        let data = {
          mobile: this.registerForm.mobile,
          password: this.registerForm.password,
          code: this.registerForm.code,
          method: 'user.smslogin'
        };
        mainRequest(data)
          .then(res => {
            const {status, data} = res;
            console.log(res);
            if(status === 200){
              if(data.status){
                this.dologin();
              }else{
                clearInterval(self.timerid);
                self.timerid = null;
                self.statusMsg = '';
              }
              this.$message({
                message: data.status ? '注册成功' :data.msg,
                type: data.status ? 'success' : 'warning'
              });
            }
          })
          .catch(err => {
            console.log(err);
          })
      },
      // 登录弹框
      dologin: function() {
        this.clearValue();
        this.dialogFormVisible = true;
        this.stepActive = 'login';
      },
      // 登录
      login: function () {
        console.log('login');
        this.$refs['loginForm'].validate((valid) => {
          console.log(valid);
          if(valid){
            let userInfo = {
              mobile: this.loginForm.mobile,
              password: this.loginForm.password,
              method: 'user.login'
            }

            let auto = this.autoLogin.length > 0 ? true : false;

            this.$store.dispatch('app/login', {userInfo, auto})
              .then(res => {
                location.reload();
              })
              .catch(err => {
                this.dologin();
                this.loginError = true;
                this.loginErrorMsg = err;
              })
          }
        })
        
      },
      // 清空form表单数据
      clearValue: function () {
        this.loginError = false;
        this.loginErrorMsg = '';
        // 注册数据
        this.$set(this.registerForm, "mobile", "");
        this.$set(this.registerForm, "password", "");
        this.$set(this.registerForm, "code", "");
        // 登录数据
        this.$set(this.loginForm, "mobile", "");
        this.$set(this.loginForm, "password", "");
      },
      // 获取登录用户信息
      getUserInfo: async function () {
        let data = {
          token:this.$store.state.app.token,
          method:'user.info'
        }
        await this.$store.dispatch("app/getUserInfo", data);
      },
      // 登出
      lagout: function(){
        let data = {
          token: this.$store.state.app.token,
          method:'user.logout'
        }


        this.$confirm(
          '退出, 是否继续?', '提示', 
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            this.$store.dispatch("app/logout", data)
              .then(res => {
                this.$message(res);
                this.$router.push({name: 'index'});
              })
              .catch(err => {
                this.$message.error(err);
              })
          })
      },
      // 获取购物车列表
      getCollect () {
        let data = {
          page: this.currentPage,
          limit: this.limit,
          method: "user.goodscollectionlist",
          token: this.$store.state.app.token
        }
        this.$store.dispatch('goods/getCollect', data);
      },
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../assets/css/theme.less";
  .dialog{}
  .nav {
    height: @nav-height;
    line-height: @nav-height;
    margin: 0 auto;
    background-color: @theme-black;
    color: @theme-white;
    font-size: @theme-font-size;
    @1200-min();
    .error {
      background-color: #D8CCC9;
      color: #F65151;
      line-height: 32px;
      font-size: 14px;
      padding-left: 10px;
      border-radius: 3px;
      margin-bottom: 5px;
    }

    .nav-main {
      @1200();
      display: flex;
      justify-content: space-between;

      .nav-left {
        z-index: 9999;
        span {
          cursor: pointer;
          display: inline-block;
          position: relative;

          div {
            position: absolute;
            width: 200px;
            overflow: hidden;
            text-align: center;
            background-color: @theme-white;

            img {
              display: block;
              margin: auto;
              width: 160px;
              height: 160px;
            }

            color: @theme-black;
            line-height: 20px;
            border: 1px solid #C5C5C5;
            box-shadow: 1px 1px 2px 0px #eaeaea;
            padding: 5px 0 10px 0;
            display: none;
          }

          &:hover div {
            display: block;
          }
        }
      }

      .nav-right {
        position: relative;
        span {
          cursor: pointer;
          display: inline-block;
        }

        .noite {
          position: absolute;
          width: 200px;
          overflow: hidden;
          background-color: @theme-white;
          color: @theme-black;
          line-height: 20px;
          border: 1px solid #C5C5C5;
          box-shadow: 1px 1px 2px 0px #eaeaea;
          padding: 5px 15px 15px;
          right: 0px;
          font-size: 14px;
          line-height: 40px;

          div {
            border-bottom: 1px solid #dedede;
            cursor: pointer;
          }
        }

        .login {
          position: absolute;
          width: 384px;
          overflow: hidden;
          background-color: @theme-white;
          color: @theme-black;
          line-height: 20px;
          border: 1px solid #C5C5C5;
          box-shadow: 1px 1px 2px 0px #eaeaea;
          padding: 5px 0 30px 0;
          left: -70px;

          .el-tabs__nav-wrap::after {
            background-color: #fff;
          }

          .el-tabs__active-bar {
            background-color: @theme-black;
            height: 6px;
            width: 40px;
          }

          .el-tabs__item.is-active {
            font-size: 22px;
            font-weight: bold;
            color: @theme-black;
          }

          .el-tabs__item {
            font-size: 20px;
          }

          .el-tabs__item:hover {
            color: @theme-black;
          }

          .el-tabs__nav-scroll {
            padding: 0 @bianju;
          }

          .el-tabs__header {
            margin: 0;
          }

          .form {
            padding: 0 @bianju;
            font-size: 16px;
            line-height: 16px;

            .ztitle {
              line-height: 40px;
              font-size: 20px;
              position: relative;

              i {
                font-size: 22px;
                font-weight: bold;
              }

              div {
                display: inline-block;
                font-weight: bold;
                font-size: 22px;
                width: 50%;
                text-align: center;
                position: absolute;
                left: 0;
                right: 0;
                margin: auto;
              }
            }

            p {
              margin: 0;
            }

            .title {
              margin-top: 15px;
            }

            .iinput {
              margin-top: 15px;
            }

            .el-input-group__append,
            .el-input-group__prepend {
              background-color: #fff;
              border-radius: 0;
            }

            .el-input-group__append,
            .el-input-group__prepend {
              border-color: #c5c5c5;
            }

            .el-input__inner {
              border-color: #c5c5c5;
              border-radius: 0;
            }

            .bbtn {
              background-color: #404040;
              color: #fff;
              font-size: 16px;
              border-radius: 0;
              margin-left: -15px;
              box-sizing: border-box;
              border: 2px solid #404040;
              height: 40px;
              position: relative;
              top: 1px;

              &:hover {
                background-color: #fff;
                color: #404040;
              }
            }

            .el-input-group__append {
              border: 0;
            }

            .danger {
              border-radius: 0;
              width: 100%;
              border: 2px solid #F65151;
              background-color: #F65151;
              font-size: 20px;
              font-weight: bold;

              &:hover {
                background-color: #fff;
                color: #F65151;
              }
            }

            .el-checkbox__label,
            .el-checkbox__inner {
              font-size: 16px;
              color: #9E9E9E;
            }

            .pwd {
              color: #9E9E9E;
              float: right;
            }

            .el-checkbox__label {
              padding-left: 2px;
            }

            .el-checkbox__inner {
              width: 16px;
              height: 16px;
            }

            .el-checkbox__inner::after {
              height: 8px;
              left: 5px;
            }

            .el-checkbox__input.is-checked .el-checkbox__inner,
            .el-checkbox__input.is-indeterminate .el-checkbox__inner {
              background-color: #404040;
              border-color: #404040;
            }

            .el-checkbox__input.is-focus .el-checkbox__inner {
              border-color: #404040;
            }

            .router-link-active {
              text-decoration: none;
              color: #404040;
            }
          }
        }

        .notice-list{
          width:200px;
          padding:0 10px 10px;
          border:1px solid #DEDEDE;
          position:absolute;
          left: -150px;
          z-index: 9999;
          background: #fff;
          .notice-list-item{
            color: #404040;
            border-bottom: 1px solid #DEDEDE;
            @text-ellipsis();
            // &:last-child{
            //   border: none;
            // }
          }
        }
      }
    }
  }
  .tips{
    margin: 16px 0;
    font-size: 16px;
  }
  .loginError{
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color:@theme-red;
    background: rgba(246,81,81, 0.3);
    color: #EE4E4E;
    padding: 0 7px;
    margin-bottom: 7px;
  }
  .auto{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    color: @theme-gray;
    .autoLogin{
      color: @theme-gray;
    }
    .find-password{
      @cursor-pointer();
    }
  }
  .agree{
    color: @theme-gray;
  }
  .dialog{
    padding-left: 1100px;
  }
  @media screen and (max-width: 1518px) {
    .dialog{
      padding-left: 900px;
    }
  }
  @media screen and (max-width: 1200px) {
    .dialog{
      padding-left: 800px;
    }
  }
  .hintbox{position: relative;}
  .hintinput /deep/ .el-input__inner{padding: 0 0 0 40px;}
  .hint{position: absolute;top: -1px;left: 5px;font-size: 16px;}
</style>
