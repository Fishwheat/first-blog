<template>
  <div class="home">
    <HomeHeader/>
    <HomeContent/>
    <HomeFooter class="home-footer"/>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import HomeHeader from './components/home-header.vue';
import HomeContent from './components/home-content.vue';
import HomeFooter from './components/home-footer.vue';

// const headerEl = ref<typeof HomeHeader>();
// onMounted(() => {
//   console.log(headerEl.value?.getCount);
// });
</script>

<script lang='ts'>
export default { name: 'Home' }

</script>

<style lang="scss">
.home {
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 100px;
  .home-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    margin-top: 40px;
  }
}
</style>
