<template>
  <div class="main">
    <Nav />
    <Menu />
    <nuxt />
    <Footer />
    
    <el-backtop :bottom="100" :right="30"></el-backtop>
  </div>
</template>

<script>
import Nav from '@/components/public/nav'
import Menu from '@/components/public/menu'
import Footer from '@/components/public/footer'
export default {
  data(){
    return{
    }
  },
  components: {
    Nav,
    Footer,
    Menu
  },
  created(){},
  methods: {},
}
</script>

<style lang="less" scoped></style>
