<template>
  <div class="login-panel">
    <!--标题-->
    <h1 class="panel-text">后台管理系统</h1>
    <!--登录框-->
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user"></i> 账号登录</span>
        </template>
        <LoginAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="mobile">
        <template #label>
          <span><i class="el-icon-mobile"></i> 手机登录</span>
        </template>
        <LoginMobile ref="MobileRef" />
      </el-tab-pane>
    </el-tabs>
    <!--记住密码与忘记密码-->
    <div class="login-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <!--登录按钮-->
    <el-button type="primary" class="login-button" @click="loginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-acount.vue'
import LoginMobile from './login-mobile.vue'

export default defineComponent({
  name: 'LoginPanel',
  components: {
    LoginAccount,
    LoginMobile
  },
  setup() {
    //获取是否选中记住密码
    const isKeepPassword = ref(false)

    //获取表单组件中选中了哪个tab
    //定义字符串的ref，通过v-model绑定到el-tabs，给el-panl添加name属性，选中哪个el-panl就将其name传给v-model
    //传递给currenttab,判断currentTab即可
    const currentTab = ref('account')

    //获取账号登陆组件和手机登陆组件
    const accountRef = ref<InstanceType<typeof LoginAccount>>() //获取组件的类型给ref对象
    const MobileRef = ref<InstanceType<typeof LoginMobile>>()

    //登录按钮事件，判断当前是哪个组件再调用
    function loginClick() {
      if (currentTab.value === 'account') {
        accountRef.value?.accountLoginAction(isKeepPassword.value)
      } else {
        MobileRef.value?.mobileLoginAction()
      }
    }

    return {
      currentTab,
      isKeepPassword,
      accountRef,
      MobileRef,
      loginClick
    }
  }
})
</script>

<style scoped>
.login-panel {
  margin-top: 6%;
  width: 30%;
  min-width: 300px;
}
.panel-text {
  text-align: center;
}
.login-control {
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
}
.login-button {
  width: 100%;
  height: 50px;
}
</style>
