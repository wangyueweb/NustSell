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
        <el-col :span="4" v-for="(item, index) in alias" :key="index" :push="item.push ? item.push : 0">
          <div class="grid-content" :class="index<=5?'activef':''" @click.stop="$router.push({name: 'help'})">{{item.type_name}}</div>
          <div v-for="(itemJ, indexJ) in item.child" :key="indexJ">
            <div class="grid-content" @click.stop="$router.push({path: '/help/' + itemJ.id, query: {type:item.type_name, name: itemJ.type_name, id: itemJ.id}})" v-if="index < 5">{{itemJ.type_name}}</div>
            <div class="grid-content" v-if="index === 5">{{itemJ.type_name}}</div>
          </div>
          
        </el-col>
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
import { mapState } from "vuex"
  let img1 = require('~/assets/img/download.png');
  let img2 = require('~/assets/img/gongzhonghao.png');
  export default {
    name: 'Footer',
    data() {
      return {
        alias: [],
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
    },
    computed: {
      ...mapState({
        
      }),
    },
    async created() {
      await this.$store.dispatch("app/getArticleList", {method: 'articles.getArticleType'})
        .then(() => {
          let endList = {
            child:[
              {type_name: '在线客服'},
              {type_name: 'Email:wzeg@gmail.com'},
              {type_name: 'QQ客服: 280261601'} 
            ],
            type_name:"王子客服"
          }
          this.alias = this.$store.state.app.article.list.concat(endList);
        });
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
      border-bottom: 1px solid #707070;
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
            border:1px solid #707070;
            display: inline-block;
            i{
              font-size: 32px;
              color: @theme-white;
            }
          }
        }
      }
    }
    .main{
      @1200();
      font-size: 14px;
      padding-top: 45px;
      color: @theme-dark;
      .grid-content{
        height:20px;
        line-height: 20px;
        overflow: hidden;
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
  .activef{color: #fff !important;}
</style>
