<!-- 账户信息 -->
<template>
  <div class="addressManage">
    <div class="newaddress">
      <CardTitle :textLine='true' :titleLine='true' name='我的收货地址'>
        <el-button type="primary" slot="tool" style="margin-bottom:10px;" size="mini" @click="dialogVisible = !dialogVisible">+新增收货地址</el-button>
      </CardTitle>
      
      <div class="newbox" v-if="dialogVisible">
        <div class="close" @click="dialogVisible = !dialogVisible">X</div>
        <div class="newbox-name">修改密码</div>
        <div>
          <div class="item">
            <div class="alias">所 在 地 区</div> 
            <el-radio-group v-model="addData.area_id" @change="radioChange">
              <el-radio :label="1" border>Makati</el-radio>
              <el-radio :label="2" border>BGC</el-radio>
              <el-radio :label="3" border>Mandaluyon</el-radio>
            </el-radio-group>
          </div>
          <div class="item">
            <div class="alias">详 细 地 址</div> 
            <div class="address">
              <el-input v-model="addData.address" placeholder="请输入详细地址"></el-input>
            </div>
          </div>
          <div class="item">
            <div class="alias">收货人姓名</div> 
            <div class="name"><el-input v-model="addData.name" placeholder="请输入收货人姓名"></el-input></div>
          </div>
          <div class="item">
            <div class="alias">收货人手机</div> 
            <div class="mobile">
              <el-input v-model="addData.mobile" placeholder="+63    |"></el-input>
            </div>
          </div>
          <el-checkbox label="设置为默认收货地址" v-model="auto"></el-checkbox>
        </div>
      
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="add">保 存</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </div>
      
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
import CardTitle from "@/components/public/cardTitle";
import { mapState } from 'vuex';
import { mainRequest } from "@/services/api";
export default {
  name: "addressManage",
  layout: function(context){
    return 'user'
  },
  data() {
    return {
      dialogVisible: false,
      agree: true,
      addData: {
        area_id: "",
        address: "",
        name: "",
        mobile: "",
        method: "user.vuesaveusership",
        is_def: false,
        token: this.$store.state.app.token
      },
    };
  },

  components: {
    CardTitle
  },

  computed: {
    ...mapState({
      tableData: state => state.user.addressList
    }),
    auto: {
      get: function(){},
      set: function(val){
        console.log(val);
        if(val){
          this.$set(this.addData, 'is_def', 1);
        }else{
          this.$set(this.addData, 'is_def', 2);
        }
      }
    }
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
    radioChange: function (selection, row) {
      console.log('checkboxChange',selection, row);
    },
    // 添加地址
    add: function () {
      mainRequest(this.addData)
        .then(({status, data}) => {
          console.log(data);
          this.$message({
            message: data.msg,
            type: data.status ? 'success' : 'warning'
          });
          this.dialogVisible = false;
          this.getPageData();
        })
        .catch(err => {
          console.log(err);
          this.$message.error(`添加地址${err}`);
        })
    },
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
        .then(() => {
          mainRequest(formData)
            .then(({status, data}) => {
              console.log(data);
              this.$message({
                message: data.msg,
                type: data.status ? 'success' : 'warning'
              });
              this.getPageData();
            })
            .catch(err => {
              console.log(err);
              this.$message.error(`删除地址${err}`);
            })
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
.item{
  display: flex;
  margin: 10px 0;
  .alias{
    width: 8em;
    text-align: right;
    margin: 9px 10px 0 0;
  }
  .address{
    width: 570px;
  }
  .name{
    width: 200px;
  }
  .mobile{
    display: flex;
    width: 200px;
  }
}
.dialog-footer{
  @centered()
}


.newbox{position: absolute;width: 947px;border: 1px solid #000;top: 48px;left: 0;background: #fff;z-index: 100;}
.newbox .newbox-name{font-size: 16px;padding: 10px 0 10px 28px;}
.newbox .close{cursor: pointer;position: absolute;top: 0;right: 5px;display: inline-block;padding: 10px;font-size: 20px;}
.newbox .el-radio{margin: 0;min-width: 120px;}
.newbox .el-checkbox{margin: 0 0 0 138px;}
.dialog-footer{margin: 25px 0 30px 0;}

</style>
