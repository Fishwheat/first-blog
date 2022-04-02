<template>
  <div class="home-content">
    <div class="home-music">
      <div class="player">
        <audio ref="audio" :src="unstoppableMusic"></audio>
        <div class="player-left" @click="playerLeftClick">
          <img src="@/assets/img/common/singer-sia.png" alt="">
          <div class="player-left-icon" :class="{'player-left-icon-is_play':isPlay}">
            <i class="iconfont" :class="isPlay ? 'icon-zanting2':'icon-bofang'"></i>
          </div>
        </div>
        <div class="player-right">
          <div class="title">Unstoppable - <span>Sia</span></div>
          <div class="lrc"></div>
          <div class="controller">
            <div class="progress" @mousedown="progressMousedown" @mouseup="progressMouseup" ref="progress">
              <div class="progress-item" :class="{'progress-item-transition':isProgressItemTransition}" :style="`--progressBuffered:${progressBuffered}%`">
                <div class="progress-item-dot" :class="{'progress-item-dot-transition':isProgressItemTransition}">
                  <span :style="`--dotBuffered:${progressBuffered}`"></span>
                </div>
              </div>
            </div>
            <div class="time">
              <span>{{ audioCurrentTime }} {{ '/' }} {{ audioDuration }}</span>
              <div class="volume" @click="isVolume = !isVolume">
                <i class="iconfont" :class="isVolume ? 'icon-24gf-volumeDisable' : 'icon-24gf-volumeMiddle'"></i>
              </div>
              <div class="play-type" @click="playTypeClick">
                <i class="iconfont" :class="playTypeIcon[playType]"></i>
              </div>
              <div class="reset" @click="resetClick">
                <i class="iconfont icon-zhongzhi2"></i>
              </div>
              <div class="play-lists">
                <i class="iconfont icon-gedan"></i>
              </div>
            </div>
          </div>
          <div class="right-top-icon" :class="{'right-top-icon-rotate': isPlay}" :style="`--dotBuffered:${progressBuffered}`">
            <i class="iconfont icon-yinlegedanyinfu"></i>
          </div>
        </div>
      </div>
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
import {reactive, ref, onBeforeMount, onMounted, onUnmounted, computed, onUpdated, watch} from 'vue';
import BlogLists from '@/components/blog-lists/index.vue';
// 引入音乐
const unstoppableMusic  = require('@/assets/audio/Sia-Unstoppable.mp3?raw')

// homeLists数据
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

// 格式化歌曲时长
const formatMusicTime = (val: number) => {
  if (Math.floor(val % 60).toString().length === 1) {
    return `0${Math.floor(val / 60)}:0${Math.floor(val % 60)}`
  } else if (Math.floor(val / 60).toString().length === 1) {
    return `0${Math.floor(val / 60)}:${Math.floor(val % 60)}`
  } else {
    return `${Math.floor(val / 60)}:${Math.floor(val % 60)}`
  }
}

// 拿到audio标签（歌曲）
const audio = ref<HTMLAudioElement>()
// 定义歌曲的时长
const audioDuration = ref()

// 播放歌曲fn()
const play = () => {
  audio.value?.play()
}

// 暂停歌曲fn()
const stop = () => {
  audio.value?.pause()
}

// 重置歌曲fn()
const load = () => {
  audio.value?.load()
}

// 定义记录当前歌曲是否播放，控制icon的切换
const isPlay = ref(false)

// 组件左边模块的点击事件fn()
const playerLeftClick = () => {
  isPlay.value = !isPlay.value
  if (isPlay.value) {
    play();
  } else {
    stop();
  }
}

// 获取progress的dom
const progress = ref<HTMLDivElement>()
// 获取progress的宽度
const progressWidth = ref()
// 当前彩色进度条的length
const progressBuffered = ref(0)
// 定义是否开启动画，在滑动时关闭，在点击结束时开启
const isProgressItemTransition = ref(true)
// 记录progress最左侧距离浏览器窗口左边的位置
const progressLeft = ref()

// 已播放时长
const audioCurrentTime = ref('00:00')
// 根据播放了的时间与总时长，获取彩色进度条的length
const timeupdateFn = () => {
  audioCurrentTime.value = formatMusicTime(audio.value?.currentTime!)
  progressBuffered.value = audio.value?.currentTime! / audio.value?.duration! * 100
}

// 鼠标点击后滑动触发的事件
const mousemoveFn = (e: MouseEvent) => {
  // 在滑动过程中暂停歌曲
  stop()
  // 关闭进度条的动画效果
  isProgressItemTransition.value = false;
  // 点击的位置与总长度的百分比
  let percent = (e.clientX - progressLeft.value) / progressWidth.value
  if (percent < 0) {
    percent = 0
  } else if (percent > 1) {
    percent = 1
  }
  // 重置当前彩色进度条的length 和 播放位置
  // progressBuffered.value = percent * 100
  audio.value!.currentTime = percent * audio.value?.duration!
  timeupdateFn()
  // audioCurrentTime.value = formatMusicTime(audio.value?.currentTime!)
}

// 记录点击未弹起时的位置
let getIntoPosition: number;
// 鼠标在progress点击时触发事件
const progressMousedown = (e: MouseEvent) => {
  // 此时移除 audio 上的 timeupdate 事件监听
  audio.value?.removeEventListener('timeupdate', timeupdateFn)
  // 获取progress的总长度（在这里获取可保证获取到正确的长度）
  progressWidth.value = progress.value?.getBoundingClientRect().width
  // 获取progress最左侧距离浏览器窗口左边的位置
  progressLeft.value = progress.value?.getBoundingClientRect().left
  // 获取点击未弹起时的位置
  getIntoPosition = e.offsetX
  window.addEventListener('mousemove', mousemoveFn)
  window.addEventListener('mouseup', mouseUpFn);
}

const mouseUpFn = (e: MouseEvent) => {
  // 开启进度条的动画效果
  isProgressItemTransition.value = true;
  // 移除鼠标滑动时的事件监听
  window.removeEventListener('mousemove', mousemoveFn)
  // 根据点击未弹起时的位置和放开时的位置作比较，判断是否有触发move，如果没有移动则是点击事件
  // 在此重置当前歌曲的播放位置(这里e.offsetX是弹起时的位置)
  if (getIntoPosition === e.offsetX) {
    audio.value!.currentTime = e.offsetX / progressWidth.value * audio.value?.duration!
  }
  // 重新开启 audio 上的 timeupdate 事件监听
  audio.value?.addEventListener('timeupdate', timeupdateFn)
  // 在滑动结束时判断是否开启歌曲
   if (isPlay.value) {
    play()
  }
  // 移除鼠标弹起时的事件监听
  window.removeEventListener('mouseup', mouseUpFn);
};

// 鼠标在progress点击松开时触发事件
const progressMouseup = (e: MouseEvent) => {
  // 开启进度条的动画效果
  // isProgressItemTransition.value = true;
  // 移除鼠标滑动时的事件监听
  // progress.value?.removeEventListener('mousemove', mousemoveFn)
  // 重置当前歌曲的播放位置
  // audio.value!.currentTime = e.offsetX / progressWidth.value * audio.value?.duration!
  // 重新开启 audio 上的 timeupdate 事件监听
  // audio.value?.addEventListener('timeupdate', timeupdateFn)
  // 在滑动结束时判断是否开启歌曲
  // if (isPlay.value) {
  //   play()
  // }
}

// 定义记录当前的喇叭icon状态
const isVolume = ref(false)

// 定义播放模式的icon类名
const playTypeIcon = ['icon-hanhan-01-01', 'icon-24gl-shuffle', 'icon-24gl-repeat2']
// 定义播放模式的icon类名下标
const playType = ref(0)
// 播放模式的点击事件，修改icon类名下标
const playTypeClick = () => {
  playType.value++;
  if(playType.value > playTypeIcon.length - 1) {
    playType.value = 0
  }
}

// 重置当前歌曲
const resetClick = () => {
  load();
  if (isPlay.value) {
    play();
  }
}

// audio.value?.buffered // 返回已缓冲的length
// audio.value?.currentTime //属性会以秒为单位返回当前媒体元素的播放时间。设置这个属性会改变媒体元素当前播放位置。
// audio.value?.loop // 属性是 HTML 标签 loop 属性的映射，它决定了媒体元素播放结束时是否重新开始。
// 属性(只读).paused 告诉视频是否正在暂停
// .volume 属性可设置媒体播放时的音量。
// load() 方法重置媒体成初始化状态，选择一个播放源， 为载入媒体重新播放做准备。

onMounted(() => {
  // 当音乐播放时，每隔250ms回调一次该事件
  audio.value?.addEventListener('timeupdate', timeupdateFn)
  // 当音乐准备好可以播放时触发该事件
  audio.value?.addEventListener('canplay', () => {
    // console.log(audio.value?.duration!);
    audioDuration.value = formatMusicTime(audio.value?.duration!)
  })

  // 此位置拿不到正确的progressWidth值（暂不知为什么）
  // progressWidth.value = progress.value?.getBoundingClientRect().width
  // console.log(progressWidth.value);

  // window.addEventListener('resize', () => {
    // progressWidth.value = progress.value?.offsetWidth
    // console.log(progress.value?.offsetWidth);
  // })
});
defineExpose({
});
</script>

<script lang='ts'>
export default { name: '' };

</script>

<style lang='scss'>
@keyframes iconRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.home-content {
  display: flex;
  flex-direction: column;
  align-items: center;

  .home-music {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100%;
    margin: 20px 0;
    .player {
      display: flex;
      height: 100px;
      width: 33.3%;
      background-color: #ffffff;
      box-shadow: 0 2px 2px 0 rgb(0 0 0 / 7%), 0 1px 5px 0 rgb(0 0 0 / 10%);
      .player-left {
        position: relative;
        width: 100px;
        height: 100px;
        cursor: pointer;
        user-select: none;

        &:hover .player-left-icon i {
          opacity: 1;
        }

        img {
          width: 100%;
          height: 100%;
        }
        .player-left-icon {
          position: absolute;
          right: 50%;
          bottom: 50%;
          transform: translate(50%,50%);
          transition: all .1s ease;
          i {
            font-size: 42px;
            color: #ffffff;
            opacity: .8;
            transition: all .1s ease;
          }
        }
        .player-left-icon-is_play {
          position: absolute;
          right: 0;
          bottom: 0;
          transform: translate(-10%,-10%);
          transition: all .1s ease;
          i {
            font-size: 22px;
          }
        }
      }
      .player-right {
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px 8px 0;
        .title {
          font-size: 14px;
          color: #333;
          span {
            font-size: 12px;
            color: #666;
          }
        }
        .lrc {
          height: 30px;
        }
        .controller {
          display: flex;
          align-items: center;
          height: 18px;
          user-select: none;
          .progress {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            cursor: pointer;
            &:hover .progress-item>.progress-item-dot>span {
              width: 10px;
              height: 10px;
            }
            .progress-item {
              position: relative;
              width: 100%;
              height: 2px;
              background: #cdcdcd;
              &::after {
                position: absolute;
                top: 0;
                left: 0;
                content: '';
                width: var(--progressBuffered);
                height: 100%;
                background: linear-gradient(to right, rgb(115, 214, 180), rgb(15, 214, 230));
                z-index: 1;
                // transition: all .1s linear;
              }
              .progress-item-dot {
                position: absolute;
                top: 50%;
                left: calc(var(--progressBuffered) - 5px);
                transform: translateY(-50%);
                width: 10px;
                height: 10px;
                pointer-events: none;
                // transition: all .1s linear;
                // background-color: rgb(127, 218, 180);
                span {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  width: 0;
                  height: 0;
                  border-radius: 50%;
                  background-color: rgb(calc(115 - var(--dotBuffered)), 214, calc(180 + var(--dotBuffered) / 2));
                  transition: all .3s ease-in-out;
                }
              }
              .progress-item-dot-transition {
                transition: all .1s linear;
              }
            }
            .progress-item-transition {
              &::after {
                transition: all .1s linear;
              }
            }
          }
          .time {
            display: flex;
            align-items: center;
            height: 100%;
            padding-left: 8px;
            span {
              font-size: 11px;
              color: #999;
              user-select: none;
            }
            .volume, .play-type, .reset, .play-lists {
              width: 15px;
              height: 15px;
              line-height: 15px;
              text-align: center;
              margin: 0 2px;
              i {
                font-size: 15px;
                color: #666;
                &:hover {
                  color: #000;
                }
              }
            }
            .volume {
              margin-left: 8px;
            }
          }
        }
        .right-top-icon {
          position: absolute;
          top: 10px;
          right: 8px;
          width: 22px;
          height: 22px;
          line-height: 22px;
          text-align: center;
          i {
            font-size: 22px;
            color: rgb(calc(115 - var(--dotBuffered)), 214, calc(180 + var(--dotBuffered) / 2));
          }
        }
        .right-top-icon-rotate {
          animation: iconRotate 2s linear infinite;
        }
      }
    }
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
