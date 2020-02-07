<!--  -->
<template>
  <div class="card-title">
    <div class="line1">
      <div class="left">
        <span class="name" :class="{textLine : !textLine}">{{name}}{{text}}</span>
      </div>
      <slot name="tool" class="tool"></slot>
    </div>
    <div class="line2" v-if="titleLine"></div>
  </div>
</template>

<script>
export default {
  name: "CardTitle",
  props: {
    name: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    textLine: {
      type: Boolean,
      default: false
    },
    titleLine: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  created(){},

  mounted(){},

  methods: {}
}
</script>

<style lang='less' scoped>
  @import "../../assets/css/theme.less";
  .card-title{
    color: @theme-black;
    .line1{
      display: flex;
      justify-content: space-between;
      .left{
        display: flex;
        flex-flow: column-reverse;
      }
      .name{
        border-bottom: 4px @theme-black solid;
      }
      .textLine{
        border-bottom: none;
      }
    }
    .line2{
      height: 1px;
      background: @theme-black;
    }
  }
</style>