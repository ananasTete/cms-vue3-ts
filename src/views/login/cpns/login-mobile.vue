<template>
  <div class="login-mobile">
    <!--label-width：label的宽度；rules:表单应用的验证规则；model:获取表单中的数据；数据与规则自动进行验证-->
    <el-form
      label-width="70px"
      :rules="rulesMobile"
      :model="userMobile"
      ref="fromRef"
    >
      <!--手机号表单-->
      <el-form-item label="手机号" prop="phone">
        <!--prop:应用验证规则rulesMobile中的phone-->
        <el-input v-model="userMobile.phone"></el-input>
      </el-form-item>
      <!--验证码表单-->
      <el-form-item label="验证码" prop="code">
        <!--prop:应用验证规则rulesMobile中的code-->
        <div class="get-code">
          <el-input v-model="userMobile.code"></el-input>
          <el-button type="primary" class="commit-code">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { useStore } from 'vuex'
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  name: 'LoginMobile',
  setup() {
    const store = useStore()
    //获取表单数据
    const userMobile = reactive({
      phone: '',
      code: ''
    })
    //编写表单验证规则rulesMobile
    const rulesMobile = {
      phone: [
        { required: true, message: '请输入手机号码', trigger: 'blur' }, //规则1：是否必传
        {
          pattern: /^[0-9]{11}$/, //规则2：输入格式验证
          message: '请输入11位手机号码', //不符合规则时的提示信息
          trigger: 'blur' //焦点离开时验证
        }
      ],
      code: [
        {
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        },
        {
          pattern: /^[0-9]{6}$/,
          message: '请输入6位验证码',
          trigger: 'blur'
        }
      ]
    }
    //获取表单组件
    const fromRef = ref<InstanceType<typeof ElForm>>() //获取组件的类型给ref对象
    //登陆操作
    function mobileLoginAction() {
      //1. 登陆前验证,调用validate方法进行验证，验证成功则valid为true
      fromRef.value?.validate((valid) => {
        //2. 登录操作
        store.dispatch('loginModule/mobileLoginAction', { ...userMobile }) //将响应式对象解构传过去
      })
    }
    return {
      userMobile,
      rulesMobile,
      fromRef,
      mobileLoginAction
    }
  }
})
</script>

<style scoped lang="less">
.get-code {
  display: flex;
}
.commit-code {
  margin-left: 10px;
}
</style>
