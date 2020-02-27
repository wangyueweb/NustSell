<!-- AddAddress1 -->
<template>
  <div>
    <div class="newbox">
      <div class="close" @click="close">X</div>
      <div class="newbox-name">修改收货地址</div>
      <div>
        <div class="item">
          <div class="alias">所 在 地 区</div> 
          <el-radio-group v-model="option.area_id">
            <el-radio :label="1" border>Makati</el-radio>
            <el-radio :label="2" border>BGC</el-radio>
            <el-radio :label="3" border>Mandaluyon</el-radio>
          </el-radio-group>
        </div>
        <div class="item">
          <div class="alias">详 细 地 址</div> 
          <div class="address">
            <el-input v-model="option.address" placeholder="请输入详细地址"></el-input>
          </div>
        </div>
        <div class="item">
          <div class="alias">收货人姓名</div> 
          <div class="name"><el-input v-model="option.name" placeholder="请输入收货人姓名"></el-input></div>
        </div>
        <div class="item">
          <div class="alias">收货人手机</div> 
          <div class="mobile hintbox">
            <el-input class="hintinput" v-model="option.mobile" placeholder="请输入在菲手机号"></el-input>
            <div class="hint">+63  |</div>
          </div>
        </div>
        <el-checkbox label="设置为默认收货地址" v-model="auto"></el-checkbox>
      </div>
    
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保 存</el-button>
        <el-button @click="close">取 消</el-button>
      </span>
    </div>
  </div>
</template>

<script>
import CardTitle from "@/components/public/cardTitle";
export default {
  name: "EditAddress",
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
    };
  },

  components: {
    CardTitle
  },

  computed: {
    auto: {
      get: function(){},
      set: function(val){
        console.log(val);
        if(val){
          this.$set(this.option, 'is_def', 1);
        }else{
          this.$set(this.option, 'is_def', 2);
        }
      }
    }
  },

  created(){},

  mounted(){},

  methods: {
    close: function(){
      this.$emit("close");
    },
    // 添加地址
    save: async function () {
      let data = {
        name: this.option.name,
        mobile: this.option.mobile,
        address: this.option.address,
        area_id: this.option.area_id,
        is_def: this.option.is_def,
        token: this.$store.state.app.token,
        id: this.option.id,
        method:"user.editship"
      }
      await this.$store.dispatch("user/editAddress", data);
      this.$emit("success");
    },
  }
}
</script>

<style lang='less' scoped>
@import url("../../assets/css/theme.less");
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

.newbox{position: absolute;width: 100%;border: 1px solid #000;top: 48px;left: 0;background: #fff;z-index: 100;}
.newbox .newbox-name{font-size: 16px;padding: 10px 0 10px 28px;}
.newbox .close{cursor: pointer;position: absolute;top: 0;right: 5px;display: inline-block;padding: 10px;font-size: 20px;}
.newbox .el-radio{margin: 0;min-width: 120px;}
.newbox .el-checkbox{margin: 0 0 0 138px;}
.dialog-footer{margin: 25px 0 30px 0;}

.hintbox{position: relative;}
.hintinput /deep/ .el-input__inner{padding: 0 0 0 40px;}
.hint{position: absolute;top: 8px;left: 5px;font-size: 16px;color: #999;}
</style>