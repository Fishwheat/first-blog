<template>
  <input type="text" v-model="form.loginName" />
  <br />
  <input type="text" v-model="form.password" />
  <br />
  <button @click="handleLogin">Login</button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { postAuthLogin } from '@/apis/modules/auth';
import { PostAuthLoginBody } from '@/apis/modules/auth/post-auth-login';

const form = ref<PostAuthLoginBody>({
  loginName: '',
  password: '',
});

const handleLogin = async () => {
  const { data, error } = await postAuthLogin(form.value);
  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data.token);
  }
};
</script>

<style lang="less"></style>
