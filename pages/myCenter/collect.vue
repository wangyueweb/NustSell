<!-- 我的收藏 -->
<template>
  <div class="order">
    <div class="tool">
      <span class="title">我收藏的商品： {{count}}</span>
    </div>

    <div class="table">
      <el-table
        ref="table"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange">
          <el-table-column
            type="selection">
          </el-table-column>

          <el-table-column
            width="100">
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
    <div style="margin-top: 20px; display:flex; justify-content: space-between;">
      <div>
        <span @click="cancelAllCollect(selectList)">取消收藏</span>
        <el-button size="mini">共享收藏</el-button>
      </div>

      <el-pagination
        @current-change="paginationChange"
        :page-count="page"
        :current-page="currentPage"
        background
        layout="prev, pager, next"
      >
      </el-pagination>
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
      currentPage: 1,
      selectList: []
    }
  },

  components: {},

  computed: {
    ...mapState({
      tableData: state => state.goods.collectList.list,
      page: state => state.goods.collectList.page,
      limit: state => state.goods.collectList.limit,
      count: state => state.goods.collectList.count
    })
  },

  created() {
    this.getCollectList();
  },

  mounted() {},
  methods: {
    getCollectList(){
      let data = {
        page: this.currentPage,
        limit: this.limit,
        method: "user.goodscollectionlist",
        token: this.$store.state.app.token
      }
      this.$store.dispatch('goods/getCollectList', data);
    },

    // 取消单个收藏
    cancelCollect: function(id) {
      this.$confirm('取消收藏, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('goods/addCollect', {method:'user.goodscollection', id: id, token: this.$store.state.app.token})
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
      })
      console.log(id);
    },

    // 取消多条收藏
    cancelAllCollect: function(list) {
      if (list.length === 0) {
        this.$message.error('请勾选至少一条');
        return;
      }else{
        this.$confirm('取消收藏, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          const idList = list.map(item => item.id);
          console.log(idList);
          this.$store.dispatch('goods/addCollect', {method:'user.goodscollectionall', id: idList, token: this.$store.state.app.token})
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
        })
        .catch(err => {})
      }
    },

    // 表格勾选
    handleSelectionChange(val) {
      this.selectList = val;
    },

    // 分页变化
    paginationChange: function (e) {
      this.currentPage = e;
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
