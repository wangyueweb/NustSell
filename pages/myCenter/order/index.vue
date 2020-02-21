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
        :data="tableData"
        style="width: 100%"
        @row-click="toId">
          <el-table-column
            prop="id"
            label="订单号">
          </el-table-column>
          <el-table-column
            prop="time"
            label="下单时间">
          </el-table-column>
          <el-table-column
            prop="count"
            label="总金额">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="handle"
            label="操作">
          </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Order",
  layout: function(context){
    return 'user'
  },
  data() {
    return {
      tableData: [
        {
          time: '2016-05-03',
          count: '₱ 889.00',
          id: '2019082808353',
          state: '已确认 已付款 收货确认',
          handle: '已确认'
        },
        {
          time: '2016-05-03',
          count: '₱ 889.00',
          id: '2019082808353',
          state: '已确认 已付款 收货确认',
          handle: '已确认'
        },
        {
          time: '2016-05-03',
          count: '₱ 889.00',
          id: '2019082808353',
          state: '已确认 已付款 收货确认',
          handle: '已确认'
        },
        {
          time: '2016-05-03',
          count: '₱ 889.00',
          id: '2019082808353',
          state: '已确认 已付款 收货确认',
          handle: '已确认'
        },
        {
          time: '2016-05-03',
          count: '₱ 889.00',
          id: '2019082808353',
          state: '已确认 已付款 收货确认',
          handle: '已确认'
        },
        {
          time: '2016-05-03',
          count: '₱ 889.00',
          id: '2019082808353',
          state: '已确认 已付款 收货确认',
          handle: '已确认'
        },
        {
          time: '2016-05-03',
          count: '₱ 889.00',
          id: '2019082808353',
          state: '已确认 已付款 收货确认',
          handle: '已确认'
        }
      ],
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

  components: {},

  computed: {},

  created() {},

  mounted() {},

  methods: {
    toId: function (e) {
      this.$router.push({path: '/myCenter/order/' + e.id});
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
