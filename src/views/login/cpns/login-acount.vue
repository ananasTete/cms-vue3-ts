<template>
  <div class="login-account">
    <!--label-width：label的宽度；rules:表单应用的验证规则；model:获取表单中的数据；数据与规则自动进行验证-->
    <el-form
      label-width="70px"
      :rules="rulesAccount"
      :model="userAccount"
      ref="fromRef"
    >
      <!--账号表单-->
      <el-form-item label="账号" prop="name">
        <!--prop:应用验证规则rulesAccount中的account-->
        <el-input v-model="userAccount.name"></el-input>
      </el-form-item>
      <!--密码表单-->
      <el-form-item label="密码" prop="password">
        <!--prop:应用验证规则rulesAccount中的password-->
        <el-input v-model="userAccount.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import localCache from '@/utils/cache'

export default defineComponent({
  name: 'LoginAccount',
  setup() {
    const store = useStore()
    //接收表单数据
    const userAccount = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    //编写表单验证规则rulesAccount
    const rulesAccount = {
      name: [
        { required: true, message: '请输入用户名', trigger: 'blur' }, //规则1：是否必传
        {
          pattern: /^[a-z,A-Z,0-9]{5,11}$/, //规则2：输入格式验证
          message: '用户名必须是5-11个大/小写字母或数字', //不符合规则时的提示信息
          trigger: 'blur' //焦点离开时验证
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          pattern: /^[a-z,A-Z,0-9]{5,}$/,
          message: '用户名必须是大于5位的大/小写字母或数字',
          trigger: 'blur'
        }
      ]
    }

    //获取表单组件
    const fromRef = ref<InstanceType<typeof ElForm>>() //获取组件的类型给ref对象

    //登陆操作
    function accountLoginAction(isKeepPassword: boolean) {
      //1. 登陆前验证,调用validate方法进行验证，验证成功则valid为true
      fromRef.value?.validate((valid) => {
        if (valid) {
          //1. 判断是否需要记住密码
          if (isKeepPassword) {
            localCache.setCache('name', userAccount.name)
            localCache.setCache('password', userAccount.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          //2. 登录操作
          store.dispatch('loginModule/accountLoginAction', { ...userAccount }) //将响应式对象解构传过去
        }
      })
    }
    return {
      userAccount,
      rulesAccount,
      fromRef,
      accountLoginAction
    }
  }
})
</script>

<style scoped lang="less"></style>
