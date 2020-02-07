<!-- 我的收藏 -->
<template>
  <div class="order">
    <div class="tool">
      <span class="title">我收藏的商品： 3</span>
    </div>

    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        @row-click="toId"
        @selection-change="handleSelectionChange">
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <img :src="tableData[scope.$index].img" style="width:80px;height:80px;"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="detail"
            label="商品信息">
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格">
          </el-table-column>
          <el-table-column
            prop="id"
            label="操作">
            <template>
              <el-button size="mini" type="primary">移入购物车</el-button>
              <div>取消收藏</div>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <div style="margin-top: 20px">
      <span>取消收藏</span>
      <el-button size="mini">共享收藏</el-button>
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
      tableData: [
        {
          detail: "【老干妈-风味鸡油辣椒酱280g】 火锅酱料拌面下饭菜调料调味品",
          price: "110.00",
          id: '2019082808353',
          state: '',
          img: 'https://b2c.jihainet.com/static/uploads/9f/c9/54/5bcd2b69d8e2d.jpg'
        },
        {
          detail: "【天香唻-盐焗鸡爪】盐焗凤爪 ���美短骨凤爪",
          price: "300.00",
          id: '2019082808353',
          state: '',
          img: 'https://b2c.jihainet.com/static/uploads/9f/c9/54/5bcd2b69d8e2d.jpg'
        },
        {
          detail: "鸡蛋-土黄色10个一袋】乡下土鸡蛋 营养高 味道香",
          price: "160.00",
          id: '2019082808353',
          state: '',
          img: 'https://b2c.jihainet.com/static/uploads/9f/c9/54/5bcd2b69d8e2d.jpg'
        }
      ]
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
.order{
  padding: 20px 36px;
  background: @theme-white;
  .tool{
    margin-bottom: 20px;
    .title{
      margin-right: 5px;
    }
  }
  .table{
    border-top: solid 1px @theme-silvergray;
    border-left: solid 1px @theme-silvergray;
    border-right: solid 1px @theme-silvergray;
  }
}
</style>
