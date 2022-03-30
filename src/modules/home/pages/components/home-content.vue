<template>
  <div class="home-content">
    <div class="home-music" ref="music">
      music
      <!-- <audio ref="audio" :src="unstoppableMusic" controls ></audio>
      <button @click="play">play</button>
      <button @click="stop">stop</button> -->
    </div>
    <div class="home-content-center">
      <div class="aside">
        <aside>aside</aside>
      </div>
      <div class="learning-records">
        <BlogLists :toTalLists="toTalList" />
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import '@/assets/svg/home-svg/fonticon/iconfont.css';
import {reactive, ref, onBeforeMount, onMounted, computed} from 'vue';
import BlogLists from '@/components/blog-lists/index.vue'

const toTalList = computed(() => {
  return Array.from({ length: 31 }).map((_, i) => ({
    id: i,
    img: '',
    title: `${i+1}Hide on bush`,
    text: `${i+1}李相赫（游戏ID：Faker），绰号“大魔王”，1996年5月7日出生于韩国，
    《英雄联盟》职业选手，司职中单，是国际电子竞技俱乐部T1英雄联盟分部的队员之一。 [1] 
    2013年2月，李相赫被招入SKTelecom T1#2队，该队伍于2013年11月更名为SKTelecom T1 K队， 
    [97]  2015年，SKTelecom T1 K与SKTelecom T1 S队伍合并为SKTelecom T1。 [1]  
    2019年2月，SKTelecom T1官宣正式更名为T1，其中英雄联盟分部则在2020LCK春季赛开始正式更名。 [117] `,
    label: Array.from({ length: 4 }).map((_, i) => ([`vscode${i}`, `vue${i}`, `css${i}`, `js${i}`])),
    time: '2022/3/28',
  }))
})

// const audio = ref<HTMLAudioElement>()
// const unstoppableMusic  = require('@/assets/audio/Sia-Unstoppable.mp3?raw')
// const play = () => {
//   audio.value?.play()
// }

onMounted(() => {
  // audio.value?.addEventListener('waiting', () => {
  //   audio.value?.play()
  // })
});
defineExpose({
});
</script>

<script lang='ts'>
export default { name: '' };

</script>

<style lang='scss'>
.home-content {
  display: flex;
  flex-direction: column;
  align-items: center;

  .home-music {
  }
  .home-content-center {
    width: 82%;
    display: flex;
    justify-content: space-between;

    .learning-records {
      width: 70%;
    }
  }
}
</style>
