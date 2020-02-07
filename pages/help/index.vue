<!-- help -->
<template>
  <div class="main-wrapper">
    帮助中心
  </div>
</template>

<script>
export default {
  name: 'Help',
  layout: context => 'help',
  data () {
    return {
      success: 1
    }
  },

  components: {
  },

  computed: {},

  created () {},

  mounted () {},

  methods: {}
}
</script>

<style lang='less' scoped>
@import "../../assets/css/theme.less";
.main-wrapper{
  padding: 20px 40px;
  background: @theme-white;
}
</style>
