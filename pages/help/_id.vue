<!-- help -->
<template>
  <div class="help">
    <CardTitle :name="$route.query.name" :textLine="true" :titleLine="true"/>
    <div v-html="articleCtx.list.length > 0 ? articleCtx.list[0].content : '暂无内容'" v-if="showCtx"></div>
  </div>
</template>

<script>
import CardTitle from "@/components/public/cardTitle"
import { mapState } from "vuex";
import { getSellInfo } from "@/services/api";
export default {
  name: 'Help',
  layout: context => 'help',
  data () {
    return {
      showCtx: false
    }
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
      articleCtx: state => state.app.articleCtx
    })
  },

  async created () {
    await this.$store.dispatch('app/getArticelCtx', {type_id: this.$route.query.id, method:'articles.getArticleList'})
      .then(() => {
        this.showCtx = true;
      })
  },

  mounted () {},

  methods: {}
}
</script>

<style lang='less' scoped>
@import "../../assets/css/theme.less";
.help{
  padding: 20px 40px;
  background: @theme-white;
}
</style>
