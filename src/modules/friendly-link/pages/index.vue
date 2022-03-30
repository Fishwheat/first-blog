<template>
  <div class="friendly-link">FriendlyLink</div>
</template>

<script lang='ts' setup>
import {reactive, ref, onBeforeMount, onMounted} from 'vue';


onBeforeMount(() => {
  // console.log('2.组件挂载页面之前执行----onBeforeMount');
});
onMounted(() => {
  // console.log('3.-组件挂载到页面之后执行-------onMounted');
});
defineExpose({
});
</script>

<script lang='ts'>
export default { name: 'FriendlyLink' };

</script>

<style lang='scss'>

</style>
