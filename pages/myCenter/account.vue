
<!-- 账户信息 -->
<template>
  <div class="account">
    <CardTitle :textLine='true' :titleLine='true' :name="`欢迎您${authUser ? '，' + authUser.nickname : ''}`"/>

    <el-row type="flex" justify="space-between" style="margin-top:12px;">
      <el-col>
        <div>
          <div class="title">联系信息</div>
          <div class="name-wrapper">姓名<span class="name">{{authUser ? authUser.nickname : ''}}</span></div>
          <div class="phone-wrapper">电话<span class="phone">{{authUser ? authUser.mobile : ''}}</span></div>
          <div class="email-wrapper">邮件<span class="email">{{authUser ? authUser.email : ''}}</span></div>
        </div>

        <div style="margin-top: 10px;">
          <!-- <nuxt-link to="" class="edit">编辑</nuxt-link> -->
          <div class="handle">
            <span class="edit" @click="dialogVisible = !dialogVisible">编辑</span>
            <div class="amend" v-if="dialogVisible">
              <div class="close" @click="dialogVisible = !dialogVisible">X</div>
              <div class="amend-name">编辑资料</div>
                <div style="width: 400px;margin: auto;">
                  <div class="item">
                    <div class="alias">用户名</div> 
                    <div class="address">
                      <el-input v-model="editName" style="width: 160px;"></el-input>
                    </div>
                  </div>
                  <div class="item">
                    <div class="alias">电话</div> 
                    <div class="address phonebox">
                      <el-input v-model="editPhone" style="width: 245px;"></el-input>
                      <div class="phoneline">+63 |</div>
                    </div>
                  </div>
                  <div class="item">
                    <div class="alias">邮箱地址</div> 
                    <div class="address">
                      <el-input v-model="editEmail" style="width: 245px;"></el-input>
                    </div>
                  </div>
                  <span slot="footer" class="dialog-footer item">
                    <el-button type="primary" style="width:130px;font-size: 15px;padding: 9px 0;">保存</el-button>
                    <el-button @click="dialogVisible = false" style="width:130px;font-size: 15px;padding: 9px 0;">取消</el-button>
                  </span>
                </div>
            </div>
          </div>
          
          <el-button size="mini" @click="lagout" :disabled="!isLogin" style="border-radius: 4px;font-size: 14px;">安全退出</el-button>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <div class="title">邮箱订阅</div>
          <div class="name-wrapper2">订阅“王子小卖部”获取最新<br/>马尼拉美食咨询</div>
        </div>
        <el-button type="primary" size="mini" style="margin-top:10px;padding: 8px 26px;font-size: 14px;">立即订阅</el-button>
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
        <div class="name-wrapper" style="line-height: 50px;">可用积分 : <span class="name">0积分</span></div>
        <div class="name-wrapper" style="line-height: 50px;margin-top: -12px;">积分兑换活动进行中，您现在可使用积分购买商品。</div>

        <div class="card">
          积分兑换说明：<br/>
          ·为了保障您积分安全，已绑定手机的账户才给予兑换，下次兑换时需验证手机；<br/>
          ·每分享一次好友，好友下单即可获得相应积分；<br/>
          ·积分仅限本ID使用，不能折算为现金；<br/>
          ·每天最多兑换10次。
        </div>
      </div>


      <div v-if="selected === 1">
        <!-- <div class="table">
          <div class="table-title">品名 百草味金枕头泰国风味 冻干榴莲共30g</div>
        </div> -->
        <div class="img-list">
          <!-- <el-image
            class="img"
            src="https://b2c.jihainet.com/static/uploads/9f/c9/54/5bcd2b69d8e2d.jpg"
            fit="fill"
          >
          </el-image> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardTitle from '@/components/public/cardTitle';
import { mapState } from 'vuex';
import { getSellInfo } from "@/services/api";
export default {
  name: 'Account',
  layout: function(context){
    return 'user'
  },
  data () {
    return {
      selected: 0,
      dialogVisible: false,
      
      editName:'',
      editPhone:'',
      editEmail:'',
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
    color: #666;
    line-height: 30px;
  }
  .name, .phone, .email{
    margin-left: 13px;
    font-weight: 700;
  }
  .edit{
    margin-right: 15px;
    color: @theme-lightgray;
  }

  .detail {
    margin-top: 40px;
    .line1 {
      padding: 0 0 6px 0;
      span {
        color: @theme-lightgray;
        margin-right: 20px;
        @cursor-pointer();
      }
      .selected {
        padding: 0 0 6px 0;
        font-weight: 600;
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
  .item{
      display: flex;
      margin: 10px 0;
      align-items: center;
      justify-content: center;
      .alias{
        width: 8.5em;
        margin: 0 10px 2px 0;
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
        position: relative;
      }
      .name{
        width: 200px;
      }
      .mobile{
        display: flex;
        width: 200px;
      }
  }
}
.name-wrapper span, .phone-wrapper span, .email-wrapper span{color: #000;}
.name-wrapper2{line-height: 22px;color: #666;margin: 4px 0 5px 0;}

.handle{display: inline-block;position: relative;}
.handle .edit{cursor:pointer;}
.amend{position: absolute;width: 853px;border: 1px solid #000;top: 35px;left: 0;background: #fff;z-index: 100;}
.amend .amend-name{font-size: 16px;padding: 10px 0 10px 28px;font-weight: 600;}
.amend .dialog-footer{margin: 35px 0 45px 0 !important;}
.amend .close{cursor: pointer;position: absolute;top: 0;right: 5px;display: inline-block;padding: 10px;font-size: 20px;}
.phoneline{position: absolute;color: #999;top: 7px;left: 6px;font-size: 17px;}
.phonebox /deep/ .el-input__inner{text-indent: 30px;}


</style>