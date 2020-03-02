<!-- 账户信息 -->
<template>
  <div class="order">
    
    <div class="tool">
      <span class="title">显示</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <div class="table">
      <el-table
        :data="orderList"
        style="width: 100%"
        @row-click="toId">
          <el-table-column
            prop="order_id"
            label="订单号">
          </el-table-column>
          <el-table-column
            label="下单时间">
            <template slot-scope="scope">
              <div>
                {{dayjs(scope.row.ctime).format('YYYY-MM-DD HH:mm:ss')}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="总金额">
            <template slot-scope="scope">
              <div>
                ₱ {{scope.row.goods_amount}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <div>
                {{scope.row.status | statusFilter}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <div @click="handle(scope.row.status)">
                {{scope.row.status | statusHandle}}
              </div>
            </template>
          </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "Order",
  layout: function(context){
    return 'user'
  },
  data() {
    return {
      formData: {
        method:'order.getorderlist',
        token: this.$store.state.app.token,
        page: 1,
        limit: 10,
        start_time: "",
        end_time: "",
        status:0
      },
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
    };
  },
  filters: {
    statusFilter: function (status) {
      switch (status) {
        case 1:
          return '待付款';
        case 2:
          return '已确认 待发货';
        case 3:
          return '已确认 已发货';
        case 4:
          return '已完成';
        default:
          return ''
      }
    },
    statusHandle: function (status) {
      switch (status) {
        case 1:
          return '撤销申请';
        case 2:
          return '已确认';
        case 3:
          return '确认收货';
        case 4:
          return '已完成';
        default:
          return ''
      }
    }
  },

  components: {},

  computed: {
    ...mapState({
      orderList: state => state.order.orderList.list
    })
  },

  created() {
    this.getOrderList();
  },

  mounted() {},

  methods: {
    getOrderList: function() {
      this.$store.dispatch("order/getOrderList", this.formData);
    },
    // 表格操作
    handle: function (status) {
      if(status === 1){
        console.log('撤销申请');
      }

      if(status === 3){
        console.log('确认收货');
      }
    },
    toId: function (e) {
      this.$router.push({path: '/myCenter/order/' + e.order_id, query: e});
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../../assets/css/theme.less");
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

.tool /deep/ .el-input__inner{height: 36px;line-height: 36px;width: 150px;}
.tool /deep/ .el-input__icon{height: 36px;line-height: 36px;}
.table /deep/ .el-table th{font-size: 14px;font-weight: 100;text-align: center;background: #F2F2F2;color: #000;}
.table /deep/ .el-table td .cell{font-size: 14px;text-align: center;}

</style>
