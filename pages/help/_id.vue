<!-- help -->
<template>
  <div class="help">
    {{$route.query.name}}
  </div>
</template>

<script>
import { mapState } from "vuex";
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

  computed: {
    ...mapState({
      
    })
  },

  created () {
  },

  mounted () {},

  methods: {}
}
</script>

<style lang='less' scoped>
@import "../../assets/css/theme.less";
.help{
  padding: 20px 40px;
  background: @theme-white;
}
</style>
