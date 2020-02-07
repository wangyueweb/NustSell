
<!-- 账户信息 -->
<template>
  <div class="account">
    <CardTitle :textLine='true' :titleLine='true' :name="`欢迎您${authUser ? '，' + authUser.nickname : ''}`"/>

    <el-row type="flex" justify="space-between" style="margin-top:18px;">
      <el-col>
        <div>
          <div class="title">联系信息</div>
          <div class="name-wrapper">姓名<span class="name">{{authUser ? authUser.nickname : ''}}</span></div>
          <div class="phone-wrapper">电话<span class="phone">{{authUser ? authUser.mobile : ''}}</span></div>
          <div class="email-wrapper">邮件<span class="email">{{authUser ? authUser.email : ''}}</span></div>
        </div>

        <div style="margin-top: 10px;">
          <nuxt-link to="" class="edit">编辑</nuxt-link>
          <el-button size="mini" @click="lagout" :disabled="!isLogin">安全退出</el-button>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <div class="title">邮箱订阅</div>
          <div class="name-wrapper">订阅“王子小卖部”获取最新<br/>马尼拉美食咨询</div>
        </div>
        <el-button type="primary" size="mini" style="margin-top:10px;">立即订阅</el-button>
      </el-col>
    </el-row>

    <!-- 详情 -->
    <div class="detail">
      <div class="tab">
        <div class="line1">
          <span :class="{ selected: selected === 0 }" @click="selected = 0">我的积分</span>
          <span :class="{ selected: selected === 1 }" @click="selected = 1">积分明细</span>
          <span :class="{ selected: selected === 2 }" @click="selected = 2">使用记录</span>
        </div>
        <div class="line2"></div>
      </div>

      <div v-if="selected === 0">
        <div class="name-wrapper" style="line-height: 50px;">可用积分 : <span class="name">100积分</span></div>
        <div class="name-wrapper" style="line-height: 50px;">积分兑换活动进行中，您现在可使用积分购买商品。</div>

        <div class="card">
          积分兑换说明：<br/>
          ·为了保障您积分安全，已绑定手机的账户才给予兑换，下次兑换时需验证手机；<br/>
          ·每分享一次好友，好友下单即可获得相应积分；<br/>
          ·积分仅限本ID使用，不能折算为现金；<br/>
          ·每天最多兑换10次。
        </div>
      </div>


      <div v-if="selected === 1">
        <div class="table">
          <div class="table-title">品名 百草味金枕头泰国风味 冻干榴莲共30g</div>
        </div>
        <div class="img-list">
          <el-image
            class="img"
            src="https://b2c.jihainet.com/static/uploads/9f/c9/54/5bcd2b69d8e2d.jpg"
            fit="fill"
          >
          </el-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardTitle from '@/components/public/cardTitle'
import { mapState } from 'vuex';
export default {
  name: 'Account',
  layout: function(context){
    return 'user'
  },
  data () {
    return {
      accountOption: {
        name: "Johnny Wang",
        phone: "09054624544",
        email: "dwan.designer@gmail.com"
      },
      selected: 0
    };
  },

  components: {
    CardTitle
  },

  computed: {
    ...mapState({
      authUser: state => state.app.authUser
    }),
    isLogin: {
      get: function(){
        return this.$store.state.app.token ? true : false
      },
      set: function(val){}
    }
  },

  created(){
    this.getUserInfo();
  },

  mounted(){},

  methods: {
    lagout: function(){
      let data = {
        token: this.$store.state.app.token,
        method:'user.logout'
      }
      this.$store.dispatch("app/logout", data)
        .then(res => {
          this.$message(res);
          this.$router.push({name: 'index'});
        })
        .catch(err => {
          this.$message.error(err);
        })
    },
    getUserInfo: function(){
      let data = {
        token:this.$store.state.app.token,
        method:'user.info'
      }
      this.$store.dispatch("app/getUserInfo", data)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          this.$message.error(err);
        })
    }
  }
}
</script>

<style lang='less' scoped>
@import url('../../assets/css/theme.less');
.account{
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
    margin-top: 40px;
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