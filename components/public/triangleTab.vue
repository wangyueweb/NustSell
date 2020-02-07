<!-- 三角箭头形切换卡 -->
<template>
  <el-row :gutter="-3">
    <el-col :span="24 / tabs.length" v-for="(item, index) in tabs" :key="index" class="tabs">
      <div v-if="index === 0" class="tab" :class="{selected : selected === index}">
        <span class="square">{{item.label}}</span>
        <span class="triangle"></span>
      </div>
      <div v-else class="tab" :class="{selected : selected === index}">
        <span class="triangle-back"></span>
        <span class="square">{{item.label}}</span>
        <span class="triangle"></span>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "TriangleTab",
  props: {
    tabs: {
      type: Array,
      default: function() {
        return [];
      }
    },
    selected: {
      type: Number,
      default: function(){
        return 0
      }
    }
  },
  data() {
    return {}
  },

  components: {},

  computed: {},

  created() {},

  mounted() {},

  methods: {}
};
</script>

<style lang="less" scoped>
@import "../../assets/css/theme.less";
.tabs{
  .tab {
    display: flex;
    margin-left: -3px;
    margin-right: -3px;
  }
}
.square, .triangle-back{
  background: @theme-lightgray;
}
.triangle{
  border-color: @theme-lightgray;
}
// 选中后的状态
.selected{
  .square, .triangle-back{
    background: @theme-red;
    color: @theme-white;
  }
  .triangle{
    border-color: @theme-red;
    border-right-width: 0;
    border-top-color: transparent;
    border-bottom-color: transparent;
  }
}
// 中间方形
.square {
  flex: 1;
  text-align: center;
  line-height: 26px;
}
// 前三角
.triangle {
  border-width: 13px;
  border-right-width: 0;
  border-style: dashed;
  border-left-style: solid;
  border-top-color: transparent;
  border-bottom-color: transparent;
  z-index: 9;
}
// 后三角
.triangle-back {
  border-width: 10px;
  border-color: @theme-light;
  border-right-width: 0;
  border-style: dashed;
  border-left-style: solid;
  border-top-color: transparent;
  border-bottom-color: transparent;
  z-index: 8;
}
</style>
