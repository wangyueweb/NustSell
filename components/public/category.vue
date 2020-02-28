<template>
  <div>
    <!-- {{option}} -->
    <div class="title">{{option.HeadertName}}
      <span></span>
    </div>
    <!-- <div class="main"> -->
      <el-row type="flex" justify="center" align="middle" :gutter="10">
        <el-col :span="9">
          <nuxt-link v-if="option.goods[0]" :to="{name: 'goodsDetail', query: {id: option.goods[0].id}}">
            <div class="box1">
              <div class="name">{{( option.goods[0]['name'])}}</div>
              <div class="describe">{{option.goods[0]['brief']}}</div>
              <div class="img-wrapper" @mouseenter="changeActive($event)" @mouseleave="removeActive($event)">
                <el-image class="img" fit="fill" :src="option.goods[0]['url']"></el-image>
              </div>
            </div>
          </nuxt-link>
        </el-col>
        <el-col :span="10">
          <el-row :gutter="10">
            <el-col :span="12">
              <nuxt-link v-if="option.goods[1]" :to="{name: 'goodsDetail', query: {id: option.goods[1].id}}">
                <div class="box2">
                  <div class="name">{{( option.goods[1]['name'])}}</div>
                  <div class="describe">{{option.goods[1]['brief']}}</div>
                  <div class="img-wrapper" @mouseenter="changeActive($event)" @mouseleave="removeActive($event)">
                    <el-image class="img" fit="fill" :src="option.goods[1]['url']"></el-image>
                  </div>
                </div>
              </nuxt-link>
            </el-col>
            <el-col :span="12">
              <nuxt-link v-if="option.goods[2]" :to="{name: 'goodsDetail', query: {id: option.goods[2].id}}">
                <div class="box3">
                  <div class="name">{{( option.goods[2]['name'])}}</div>
                  <div class="describe">{{option.goods[2]['brief']}}</div>
                  <div class="img-wrapper" @mouseenter="changeActive($event)" @mouseleave="removeActive($event)">
                    <el-image class="img" fit="fill" :src="option.goods[2]['url']"></el-image>
                  </div>
                </div>
              </nuxt-link>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="24">
              <nuxt-link v-if="option.goods[3]" :to="{name: 'goodsDetail', query: {id: option.goods[3].id}}">
                <div class="box4">
                  <el-row>
                    <el-col :span="14">
                      <div class="name">{{( option.goods[3]['name'])}}</div>
                      <div class="describe">{{option.goods[3]['brief']}}</div>
                    </el-col>
                    <el-col :span="10">
                      <div class="img-wrapper" @mouseenter="changeActive($event)" @mouseleave="removeActive($event)">
                        <el-image class="img" fit="fill" :src="option.goods[3]['url']"></el-image>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </nuxt-link>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5">
          <el-row>
            <el-col>
              <nuxt-link v-if="option.goods[4]" :to="{name: 'goodsDetail', query: {id: option.goods[4].id}}">
                <div class="box5">
                  <div class="name">{{( option.goods[4]['name'])}}</div>
                  <div class="img-wrapper" @mouseenter="changeActive($event)" @mouseleave="removeActive($event)">
                    <el-image class="img" fit="fill" :src="option.goods[4]['url']"></el-image>
                  </div>
                </div>
              </nuxt-link>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <nuxt-link v-if="option.goods[5]" :to="{name: 'goodsDetail', query: {id: option.goods[5].id}}">
                <div class="box6">
                  <div class="name">{{( option.goods[5]['name'])}}</div>
                  <div class="img-wrapper" @mouseenter="changeActive($event)" @mouseleave="removeActive($event)">
                    <el-image class="img" fit="fill" :src="option.goods[5]['url']"></el-image>
                  </div>
                </div>
              </nuxt-link>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <nuxt-link v-if="option.goods[6]" :to="{name: 'goodsDetail', query: {id: option.goods[6].id}}">
                <div class="box7">
                  <div class="name">{{( option.goods[6]['name'])}}</div>
                  <div class="img-wrapper" @mouseenter="changeActive($event)" @mouseleave="removeActive($event)">
                    <el-image class="img" fit="fill" :src="option.goods[6]['url']"></el-image>
                  </div>
                </div>
              </nuxt-link>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: "Category",
  props:{
    option: {
      type: Object,
      default: []
    }
  },
  data() {
    return {
    }
  },
  components: {},

  created() {},

  mounted() {},

  methods: {
    changeActive($event) {
      $event.currentTarget.className = 'img-wrapper activeimg';
    },
    removeActive($event) {
      $event.currentTarget.className = 'img-wrapper';
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/theme.less";
@height: 480px;
@padding:{
  padding: 16px 20px;
}
@padding2: {
  padding: 16px 50px;
}
@border-top: {
  border-top: solid @theme-light 5px;
}
@border-bottom: {
  border-bottom: solid @theme-light 5px;
}
.title{
  font-size: 22px;
  color: @theme-black;
  font-weight: 700;
  text-align: center;
  flex-flow: column;
  @centered();
  @cursor-pointer();
  margin: 55px 0 20px 0;
  span{
    width: 276px;
    height: 15px;
    display: block;
    margin: 3px 0 3px 0;
    background: url(../../assets/img/line_title.png) no-repeat center center;
    background-size: 100% 100%;
  }
}
// .main{
//   @1200();
  .box1,.box2,.box3,.box4,.box5,.box6,.box7{
    @box();
    background: @theme-white;
    .name{
      font-size: 20px;
      @text-ellipsis();
    }
    .describe{
      color: @theme-lightgray;
      margin-top: 4px;
      @text-ellipsis();
    }
  }
  .box1{
    height: @height;
    .img-wrapper{
      padding: 32px;
      .img{
        width: 100%;
      }
    }
  }
  .box2, .box3{
    height: @height * 0.5;
    @border-bottom();
    .img-wrapper{
      padding: 11px 0 0 67px;
      .img{
        width: 100%;
      }
    }
  }
  .box4{
    height: @height * 0.5;
    @border-top();
    .img-wrapper{
      .img{
        width: 100%;
      }
    }
  }
  .box1,.box2,.box3,.box4{
    @padding();
  }
  .box5,.box6,.box7{
    @padding2();
    height: @height / 3;
    .img-wrapper{
      padding: 0 0 0 48px;
      .img{
        width: 100%;
      }
    }
  }
  .activeimg{position: relative;top: 0;left: -5px;}
</style>
