<!-- index -->
<template>
  <div>
  </div>
</template>

<script>
export default {
  name: "MyCenter",
  layout: function(context){
    return 'user'
  },
  data () {
    return {
    };
  },
  fetch ({ app: { context: ctx, router: { currentRoute: cur } }, redirect}) {
    return redirect('/myCenter/account');
  },
  components: {},

  computed: {},

  created(){},

  mounted(){
  },

  methods: {}
}
</script>

<style lang='less' scoped>
@import "../../assets/css/theme.less";
</style>