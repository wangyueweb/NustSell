<template>
  <div>
    <Nav />
    <Menu/>
    <div class="main-wrapper" :class="{nick : isFixed}">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <nuxt-link to="/help">帮助中心</nuxt-link>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          {{$route.query.type}}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.query.name}}</el-breadcrumb-item>
      </el-breadcrumb>

      <el-row :gutter="15">
        <el-col :span="5">
          <div class="title">帮助中心</div>
          
          <div class="alias">
            <div
              v-for="(item, index) in alias"
              :key="index"
              class="alias-wrapper"
            >
              <div class="bold">
                {{item.type_name}}
              </div>
              
              <div
                v-for="(itemJ, indexJ) in item.child"
                :key="indexJ"
              >
                <nuxt-link
                  :to="{path: '/help/' + itemJ.id, query: {type:item.type_name, name: itemJ.type_name, id: itemJ.id}}"
                  class="alias-item"
                  v-if="index < 5"
                >
                  {{itemJ.type_name}}
                </nuxt-link>

                <div class="alias-item" v-if="index === 5">
                  {{itemJ.type_name}}
                </div>
              </div>
              
            </div>
          </div>
        </el-col>
        <el-col :span="19">
          <nuxt />
        </el-col>
      </el-row>
    </div>
    <Footer />
  </div>
</template>

<script>
import Nav from '@/components/public/nav'
import Menu from '@/components/public/menu'
import Footer from '@/components/public/footer'
import { mapState } from 'vuex';
export default {
  components: {
    Nav,
    Menu,
    Footer
  },
  data(){
    return {
      alias: []
    }
  },
  computed: {
    ...mapState({
      isFixed: state => state.app.isFixed,
      articleList: state => state.app.article.list
    }),
  },
  watch: {},
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
  },
  methods:{},
}
</script>

<style lang="less" scoped>
@import "../assets/css/theme.less";
.breadcrumb{
  margin: @bianju 0;
}
.main-wrapper{
  padding-bottom: 80px;
}
.title{
  height: 34px;
  line-height: 34px;
  background: @theme-black;
  color: @theme-white;
  text-align: center;
}
.alias{
  padding: 30px 20px;
  background: @theme-white;
  .alias-wrapper{
    .bold{
      padding: 10px 0;
      font-weight: 700;
    }
    .alias-item{
      font-weight: normal;
      font-size: 16px;
      padding: 10px 0;
      display: block;
      &:hover{
        color: @theme-red;
      }
      .iconfont{
        font-size: 20px;
        margin-right: 10px;
      }
    }
  }
}
</style>
