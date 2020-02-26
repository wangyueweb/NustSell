<!-- 账户信息 -->
<template>
  <div class="addressManage">
    <div class="newaddress">
      <AddAddress @success="getPageData()" :type="1"/>
    </div>

    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%">
          <el-table-column
            prop="name"
            label="收货人">
          </el-table-column>
          <el-table-column
            prop="area_name"
            label="收货地址">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="收货人手机">
          </el-table-column>
          <el-table-column
            label="默认地址">
            <template slot-scope="scope">
              <div>
                {{scope.row.is_def === 1 ? '默认地址' : ''}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <div>
                <el-button @click="deleteAddress(scope.row)" type="text" size="small">修改</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button @click="deleteAddress(scope.row)" class="delete" type="text" size="small">删除</el-button>
              </div>
            </template>
          </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import AddAddress from "@/components/public/addAddress1";
import { mapState } from 'vuex';
export default {
  name: "addressManage",
  layout: function(context){
    return 'user'
  },
  data() {
    return {
    };
  },

  components: {
    AddAddress
  },

  computed: {
    ...mapState({
      tableData: state => state.user.addressList
    }),
  },

  created() {
    this.getPageData();
  },

  mounted() {},

  methods: {
    getPageData: function () {
      const formData = {
        method:'user.getusership',token: this.$store.state.app.token
      }
      this.$store.dispatch('user/getAddress', formData);
    },
    // 删除地址
    deleteAddress: function (item) {
      let formData = {
        method:'user.removeship',
        token: this.$store.state.app.token,
        id:item.id
      }
      this.$confirm('删除地址, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async () => {
          await this.$store.dispatch("user/deleteAddress", formData);
          this.getPageData();
        })
        .catch(err => {})
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/theme.less");
.addressManage{
  padding: 20px 36px;
  background: @theme-white;
  position: relative;
  .table{
    margin-top: 19px;
    border-top: solid 1px @theme-silvergray;
    border-left: solid 1px @theme-silvergray;
    border-right: solid 1px @theme-silvergray;
    .delete{
      color: @theme-lightgray;
    }
  }
}
</style>
