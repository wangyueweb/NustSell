<!-- 我的收藏 -->
<template>
  <div class="order">
    <div class="tool">
      <span class="title">我收藏的商品： {{count}}</span>
    </div>

    <div class="table">
      <el-table
        ref="table"
        :data="collectList"
        style="width: 100%"
        @selection-change="handleSelectionChange">
          <el-table-column
            type="selection">
          </el-table-column>

          <el-table-column
            width="100">
            <template slot-scope="scope">
              <img :src="collectList[scope.$index].goods.image_url" style="width:80px;height:80px;"/>
            </template>
          </el-table-column>

          <el-table-column
            label="商品信息"
            align="center"
            prop="goods.name">
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
              <div class="buy-btn" @click.stop="addShopCar(scope.row.goods.product_id)" v-if="scope.row.goods.stock > 0">加入购物车</div>
              <div class="cant-btn" v-else>库存不足</div>
              <div class="cancel-collect" @click="cancelCollect(scope.row.goods_id)">取消收藏</div>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <div style="margin-top: 20px; display:flex; justify-content: space-between;">
      <div>
        <el-button size="mini" type="text" @click="cancelAllCollect(selectList)">取消收藏</el-button>
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
import { getSellInfo } from "@/services/api";
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

  components: {},

  computed: {
    ...mapState({
      collectList: state => state.goods.collect.list,
      page: state => state.goods.collect.page,
      limit: state => state.goods.collect.limit,
      count: state => state.goods.collect.count
    })
  },

  created() {
    this.getCollect();
  },

  mounted() {},
  methods: {
    getCollect () {
      let data = {
        page: this.currentPage,
        limit: this.limit,
        method: "user.goodscollectionlist",
        token: this.$store.state.app.token
      }
      this.$store.dispatch('goods/getCollect', data);
    },

    // 取消单个收藏
    cancelCollect (id) {
      this.$confirm('取消收藏, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('goods/addCollect', {method:'user.goodscollection', goods_id: id, token: this.$store.state.app.token})
          .then(res => {
            console.log(res);
            let {status, data} = res;
            this.$message({
              type: "warning",
              message: data.msg,
            });
            this.getCollect();
          })
          .catch(err => {
            console.log(err);
            this.$message.error(`取消收藏${err}`);
          });
      })
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
              this.getCollect();
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
      this.getCollect();
    },

    // 加入购物车
    async addShopCar(id) {
      await this.$store.dispatch('order/addShopCar', {method:'cart.add', product_id: id, nums:1, token: this.$store.state.app.token})
      this.$store.dispatch('order/getShopCar', {method:'cart.getlist', token: this.$store.state.app.token});
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
    .cancel-collect{
      @cursor-pointer();
    }
    .buy-btn{
      width: 120px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      background: @theme-black;
      color: @theme-white;
      margin:auto;
      @cursor-pointer();
    }
    .cant-btn{
      width: 120px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      background: @theme-lightgray;
      color: @theme-white;
      margin:auto;
      cursor: not-allowed;
    }
  }
}
</style>
