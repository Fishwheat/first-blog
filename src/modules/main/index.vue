<template>
  <div class="main">
    <main-nav ref="mainNav" :is-home="isHome"></main-nav>
    <div class="main--content" :style="isHome ? '--mainNavHeight:0px' : `--mainNavHeight:${mainNavHeight}px`">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang='ts' setup>
import MainNav from './components/main-nav.vue';
import {reactive, ref, onBeforeMount, onMounted, onUpdated, watch, computed} from 'vue';
import RoutesEnum from '@/enums/routes.enums';
import { useRoute, useRouter } from 'vue-router';

const mainNav = ref()
const mainNavHeight = ref()
// const mainNavEl = ref<typeof MainNav>();

// 拿到route
const route = useRoute()
// 定义存放当前的页面路径上的meta page 的变量
const routePage = ref();
// 监听route路径是否发生变化，并更新routePage
watch(route, () => {
  routePage.value = route.meta.page
})
// 判断当前页面是否在主页Home
const isHome = computed(() => {
  return routePage.value === RoutesEnum.HOME;
})

onMounted(() => {
  // console.log(mainNavEl.value);

  routePage.value = route.meta.page
  mainNavHeight.value = mainNav.value.$el.offsetHeight
});
onUpdated(() => {

})
defineExpose({
});
</script>

<script lang='ts'>
export default { name: 'Main' };

</script>

<style lang='scss'>
.main {
  position: relative;
  .main--content {
    position: absolute;
    width: 100%;
    min-height: calc(100vh - var(--mainNavHeight));
    background: #f9f9f9 url('../../assets/img/common/background.png') fixed -5%;
    z-index: -2;
  }
}
</style>
