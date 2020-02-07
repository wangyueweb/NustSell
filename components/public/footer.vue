<template>
  <div class="footer">
    <div class="top">
      <div class="content">
        <el-row>
          <el-col :span="8" v-for="(item,index) in icon" :key="index" >
            <div class="grid-content">
              <span class="icon"><i class="iconfont" :class="item.value"></i></span>
              {{item.label}}
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="main">
      <el-row>
        <el-col :span="4" v-for="(item, index) in alias" :key="index" :push="item.push ? item.push : 0"><div class="grid-content" @click.stop="$router.push({name: 'help'})">{{item.label}}</div></el-col>
      </el-row>
    </div>
    <div class="bottom">
      <div class="content">
        <div class="item" v-for="(item, index) in imgs" :key="index">
          <img :src="item.value" alt="">
          {{item.label}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let img1 = require('~/assets/img/download.png');
  let img2 = require('~/assets/img/gongzhonghao.png');
  export default {
    name: 'Footer',
    data() {
      return {
        alias: [
          {
            label: "新手帮助",
            value: ""
          },
          {
            label: "购物指南",
            value: ""
          },
          {
            label: "支付/配送",
            value: ""
          },
          {
            label: "售后服务",
            value: ""
          },
          {
            label: "会员服务",
            value: ""
          },
          {
            label: "王子客服",
            value: ""
          },
          {
            label: "交易条款协议",
            value: ""
          },
          {
            label: "订单流程",
            value: ""
          },
          {
            label: "支付方式",
            value: ""
          },
          {
            label: "退货",
            value: ""
          },
          {
            label: "找回密码",
            value: ""
          },
          {
            label: "在线客服",
            value: ""
          },
          {
            label: "注册条款",
            value: ""
          },
          {
            label: "验货与签收",
            value: ""
          },
          {
            label: "配送方式",
            value: ""
          },
          {
            label: "退款声明",
            value: ""
          },
          {
            label: "联系我们",
            value: ""
          },
          {
            label: "Email: wzeg@gmail.com",
            value: ""
          },
          {
            label: "支付方式说明",
            value: ""
          },
          {
            label: "订单配送",
            value: ""
          },
          {
            label: "配送时间及运费",
            value: ""
          },
          {
            label: "QQ客服: 280261601",
            value: "",
            push: 8,
          },
        ],
        icon: [
          {
            label: "正品保证",
            value: "icon-anquan2"
          },
          {
            label: "下单即送",
            value: "icon-waimai-"
          },
          {
            label: "24小时客服",
            value: "icon-kefu"
          }
        ],
        imgs: [
          {
            label: "APP下单",
            value: img1
          },
          {
            label: "关注公众号",
            value: img2
          },
        ]
      };
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/css/theme.less";
  @theme-dark: #9E9E9E;
  .footer{
    background: @theme-black;
    width: 100%;
    @1200-min();
    .top{
      border-bottom: @border;
      .content{
        @1200();
        padding: 40px 0 23px 0;
        .grid-content{
          @centered();
          color: @theme-white;
          font-family: Tahoma;
          font-size: 20px;
          font-weight: 700;
          .icon{
            width: 58px;
            height: 58px;
            line-height: 58px;
            text-align: center;
            @circle();
            border: @border;
            display: inline-block;
            i{
              font-size: 28px;
              color: @theme-white;
            }
          }
        }
      }
    }
    .main{
      @1200();
      padding-top: 45px;
      color: @theme-dark;
      .grid-content{
        margin: 0px 0 20px 0;
        @cursor-pointer();
        &:hover{
          color: @theme-white;
        }
      }
    }
    .bottom{
      margin-top: 20px;
      padding-bottom: 33px;
      .content{
        @1200();
        @centered();
        .item{
          color: @theme-white;
          @centered();
          flex-flow: column;
          margin: 0 26px;
          line-height: 40px;
          img{
            width: 158px;
            height: 158px;
          }
        }
      }
    }
  }
</style>
