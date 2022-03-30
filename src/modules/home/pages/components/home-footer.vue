<template>
  <div class="home-footer">
    <div class="home-footer-content">Footer</div>
  </div>
</template>

<script lang='ts' setup>
import {reactive, ref, onBeforeMount, onMounted} from 'vue';


onMounted(() => {
  // console.log('3.-组件挂载到页面之后执行-------onMounted');
});
defineExpose({
});
</script>

<script lang='ts'>
export default { name: 'HomeFooter' };

</script>

<style lang='scss'>
.home-footer {
  width: 100vw;
  height: 60px;
  background: #0a0a2e;
  .home-footer-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 20px;
    color: #fff;
    box-shadow: 0 0 0 2px rgba($color: #0a0a2e, $alpha: .5);
  }
}
</style>
