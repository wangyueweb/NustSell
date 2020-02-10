<!-- 我的收藏 -->
<template>
  <div class="order">
    <div class="tool">
      <span class="title">我收藏的商品： 3</span>
    </div>

    <div class="table">
      <el-table
        ref="table"
        :data="tableData"
        style="width: 100%"
        @selection-change="toId">
          <el-table-column
            type="selection">
          </el-table-column>

          <el-table-column>
            <template slot-scope="scope">
              <img :src="tableData[scope.$index].goods.image_url" style="width:80px;height:80px;"/>
            </template>
          </el-table-column>

          <el-table-column
            label="商品信息"
            align="center">
            <template slot-scope="scope">
              <div v-html="tableData[scope.$index].goods.intro"></div>
            </template>
          </el-table-column>

          <el-table-column
            prop="goods.price"
            label="价格"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary">移入购物车</el-button>
              <div @click="cancelCollect(tableData[scope.$index].goods_id)">取消收藏</div>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <div style="margin-top: 20px">
      <el-pagination
        @current-change="paginationChange"
        :page-count="goodsOptions.total_page"
        :current-page="value"
        background
        layout="prev, pager, next"
      >
      </el-pagination>

      <span @click="cancelCollect(idList)">取消收藏</span>
      <el-button size="mini">共享收藏</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Collect",
  layout: function(context){
    return 'user'
  },
  data() {
    return {
      goodsOptions: {},
      value: null,
      formData: {
        page: 1,
        limit: 10,
        method: "user.goodscollectionlist",
        token: this.$store.state.app.token
      },
      idList: [45, 46]
    }
  },

  components: {},

  computed: {
    ...mapState({
      tableData: state => state.goods.collectList.list
    })
  },

  created() {
    this.getCollectList();
  },

  mounted() {},
  methods: {
    async getCollectList(){
      this.$store.dispatch('goods/getCollectList', this.formData);
    },

    // 取消收藏
    cancelCollect: function(id) {
      console.log(id);
      this.$store.dispatch('goods/addCollect', {method:'user.goodscollectionall', id: id, token: this.$store.state.app.token})
        .then(res => {
          console.log(res);
          let {status, data} = res;
          this.$message({
            message: data.msg,
          });
          this.getCollectList();
        })
        .catch(err => {
          console.log(err);
          this.$message.error(`取消收藏${err}`);
        });
    },

    toId: function (rows) {
      console.log(rows)
      if (rows) {
        rows.forEach(row => {
          this.$refs.table.toggleRowSelection(row);
        });
      } else {
        this.$refs.table.clearSelection();
      }

      console.log(rows);
    },
    // 分页变化
    paginationChange: function (e) {
      console.log(e);
      this.formData.page = e;
      this.getCollectList();
    }
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
