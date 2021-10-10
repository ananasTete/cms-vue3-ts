<template>
  <div class="not-found">
    <a href=""><h3>page not found!</h3></a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: ''
})
</script>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
}
h2 {
  margin: 80px auto;
}
</style>
