<template>
  <div class="player">
    <div class="player-body">
      <!-- <audio ref="audio" :src="audioList[focusIndex].audioSrc"></audio> -->
      <div class="player-left" @click="playerLeftClick">
        <!-- 当图片是白色时看不到icon，在此多加了一个遮罩层 -->
        <div class="player-left-modal"></div>
        <img :src="audioList[focusIndex].imgSrc" alt="">
        <div class="player-left-icon" :class="{'player-left-icon-is_play':isPlay}">
          <i class="iconfont" :class="isPlay ? 'icon-zanting2':'icon-bofang'"></i>
        </div>
      </div>
      <div class="player-right">
        <div class="title">{{ audioList[focusIndex].title }}<span> - {{ audioList[focusIndex].author }}</span></div>
        <div class="lrc" ref="lrc">
          <div class="lrc-contents" :style="`transform:translateY(-${lrcPosition}px)`" v-if="audioList[focusIndex].lrc.length">
            <p v-for="(item, index) in audioList[focusIndex].lrc" :key="index" :class="{'lrc-current':pIndex === index}">
              {{ item.text }}
            </p>
          </div>
          <div style="font-size:12px;color: #666;line-height: 16px;" v-else>暂无歌词</div>
        </div>
        <div class="controller">
          <div class="progress" @mousedown="progressMousedown" ref="progress">
            <div class="progress-item" :class="{'progress-item-transition':isProgressItemTransition}" :style="`--progressBuffered:${progressBuffered}%`">
              <div class="progress-item-dot" :class="{'progress-item-dot-transition':isProgressItemTransition}">
                <span :style="`--dotBuffered:${progressBuffered}`"></span>
              </div>
            </div>
          </div>
          <div class="time">
            <span>{{ audioCurrentTime }} {{ '/' }} {{ audioDuration }}</span>
            <div class="volume">
              <i class="iconfont" @click="volumeIconClick" :class="isVolume ? 'icon-24gf-volumeDisable' : 'icon-24gf-volumeMiddle'"></i>
              <div class="volume-wrap" :class="{'volume-wrap-height': isVolumeWrapHeightClass}">
                <div class="volume-wrap-bar" @mousedown="volumeMousedown" ref="volume">
                  <div class="volume-wrap-bar-inner" :style="`height: ${volumeBarHeight}%;`"></div>
                </div>
              </div>
            </div>
            <div class="play-type" @click="playTypeClick">
              <i class="iconfont" :class="playTypeIcon[playType]"></i>
            </div>
            <div class="reset" @click="resetClick">
              <i class="iconfont icon-zhongzhi2"></i>
            </div>
            <div class="play-lists" @click="isShowPlayerList = !isShowPlayerList">
              <i class="iconfont icon-gedan"></i>
            </div>
          </div>
        </div>
        <div class="right-top-icon" :class="{'right-top-icon-rotate': isPlay}" :style="`--dotBuffered:${progressBuffered}`">
          <i class="iconfont icon-yinlegedanyinfu"></i>
        </div>
      </div>
    </div>
    <div class="player-list" :class="{'player-list-show': isShowPlayerList}">
      <ol>
        <li v-for="(item, index) in audioList" :key="index" @click="liClick(index)" :class="{'li-focus': focusIndex === index}">
          <span class="list-cur"></span>
          <span class="list-index">{{ index + 1 }}</span>
          <span class="list-title">{{ item.title }}</span>
          <span class="list-author">{{ item.author }}</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang='ts' setup>
import '@/assets/svg/home-svg/fonticon/iconfont.css';
import { reactive, ref, onMounted, onUnmounted, computed, onUpdated, watch, defineProps, PropType } from 'vue';
import { storage } from '@/helpers/storage';
import { useRoute } from 'vue-router';
// 普通方式定义
// const props = defineProps({
//   audioList: {
//     type: Array as PropType<any[]>,
//   }
// })

// ts独有方式定义（含默认值）
interface lrcType {
  time: string,
  text: string,
}
interface AudioType {
  audioSrc: any;
  title: string;
  author: string;
  imgSrc: any;
  lrc: lrcType[];
}
// 上面的方式定义规则性强； 下面的定义方式规则性弱，类型是any。
// type AudioType = Record<string, any>
interface Props {
  audioList: AudioType[],
}
const props = withDefaults(defineProps<Props>(), {
  audioList: () => { return [] as AudioType[] },
})

// ts独有方式定义（不含默认值）
// const props = defineProps<{
//   audioList: any[]
// }>()

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
// const audio = ref<HTMLAudioElement>()
const audio = ref<HTMLAudioElement>(new Audio())

// 定义歌曲的时长
const audioDuration = ref()

// 播放歌曲fn()
const play = () => {
  // 当进度条被拉至最末尾时执行
  if (audioCurrentTime.value === audioDuration.value) {
    endedFn()
  } else {
    // 正常情况下执行
    audio.value?.play()
  }
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

// 注册dom上的lrc
const lrc = ref<HTMLDivElement>()
// 定义lrcPosition作为lrc-contents的位移距离
const lrcPosition = ref(0)
// 记录当前歌词的p标签
const pIndex = ref(0)


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
  // 获取当前播放时间
  audioCurrentTime.value = formatMusicTime(audio.value?.currentTime!)
  // 获取歌词所有的p标签
  const lrcPAll = lrc.value?.querySelectorAll('p')
  // 获取当前p标签的下标
  pIndex.value = props.audioList[focusIndex2].lrc.filter((item) => item.time <= audioCurrentTime.value).length - 1
  // 根据p标签的下标获取该p标签距离父级顶部的距离，这段距离就是要位移的距离
  lrcPosition.value = lrcPAll![pIndex.value]?.offsetTop
  
  // 当在列表中切换歌曲时，切换的瞬间拿不到歌曲的时长，会变成NaN，当拿不到时给0（避免计算出的值为NaN）
  if (audio.value?.duration) {
    progressBuffered.value = audio.value?.currentTime! / audio.value?.duration * 100
  } else {
    progressBuffered.value = 0
  }
}

// 定义当音乐结束时触发的事件
const endedFn = () => {
  // 顺序播放
  if (playType.value === 0) {
    if (focusIndex2 === props.audioList.length - 1) {
      focusIndex2 = -1
    }
    // 重置audio的src
    audio.value!.src = props.audioList[++focusIndex2]?.audioSrc
    // 重置音乐播放器歌曲信息
    focusIndex.value = focusIndex2
  // 随机播放
  } else if (playType.value === 1) {
    const max = props.audioList.length - 1
    const index = Math.floor(Math.random() * (max - 0 + 1)) + 0;
    // 重置audio的src
    audio.value!.src = props.audioList[index]?.audioSrc
    // 重置音乐播放器歌曲信息
    focusIndex2 = index
    focusIndex.value = index
  // 单曲循环
  } else {
    load()
  }
  audio.value?.play()
  isPlay.value = true
}

// 鼠标点击后滑动触发的事件
const mousemoveFn = (e: MouseEvent) => {
  // 在滑动过程中取消这个事件，避免当当前音乐在播放，而拖到最末尾时立即播放下一首歌
  audio.value?.removeEventListener('ended', endedFn)
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

// 窗口的mouseup事件
const mouseUpFn = (e: MouseEvent) => {
  // 在鼠标弹起后继续监听该事件
  audio.value?.addEventListener('ended', endedFn)
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


// 定义记录当前的喇叭icon状态
const isVolume = ref(false)
// 定义并获取volume dom
const volume = ref<HTMLDivElement>()
// 定义volume与窗口顶部的距离
const volumeTop = ref()
// 定义volume的自身高度
const volumeHeight = ref()
// 定义volume-bar(颜色柱子)的高度
const volumeBarHeight = ref()
// 定义audio的volume
// const audioVolume = ref()
// 定义布尔值决定音量柱子是否隐藏
const isVolumeWrapHeightClass = ref(false)
// 记录点击未弹起时的位置
let getIntoPositionVolume: number;

// 点击volume未弹起位移时触发该事件
const volumeMousemove = (e: MouseEvent) => {
  // 彩色柱子高度百分比：1 - （鼠标距离 - dom到浏览器窗口顶部距离）/ 柱子总长
  let percent = 1 - (e.clientY - volumeTop.value) / volumeHeight.value
  if (percent < 0) {
    percent = 0
  } else if (percent > 1) {
    percent = 1
  }
  // 重置彩色柱子高度
  volumeBarHeight.value = percent * 100
  // 重置音量
  // audio.value!.volume = +percent.toFixed(2)
  if (audio.value) {
    audio.value.volume = +percent.toFixed(2)
  }
}
// 在点击volume后弹起时触发该事件
const volumeMouseup = (e: MouseEvent) => {
  // 弹起时立即移除move事件
  window.removeEventListener('mousemove', volumeMousemove)
  // 当鼠标不在dom上时，隐藏这个类，柱子隐藏
  isVolumeWrapHeightClass.value = false
  // 根据记录点击未弹起时的位置判断是否触发move事件，如果没有触发，说明是点击事件，在这里重置柱子高度和音量大小
  if (getIntoPositionVolume === e.offsetY) {
    // 根据鼠标在dom的位置 / 总长度来得到百分比
    let percent = 1 - (e.offsetY / volumeHeight.value)
    volumeBarHeight.value = percent * 100
    // audio.value!.volume = +percent.toFixed(2)
    if (audio.value) {
      audio.value.volume = +percent.toFixed(2)
    }
  }
  // 移除自身的这个mouseup事件
  window.removeEventListener('mouseup', volumeMouseup)
}
// 点击volume未弹起时触发事件
const volumeMousedown = (e: MouseEvent) => {
  // 一旦点击dom则开启这个类，当鼠标移出dom后，dom依然不会隐藏
  isVolumeWrapHeightClass.value = true
  // dom的高度
  volumeHeight.value = volume.value?.getBoundingClientRect().height
  // dom的上边框距离浏览器窗口的顶部距离
  volumeTop.value = volume.value?.getBoundingClientRect().top
  // 拿到点击时的位置
  getIntoPositionVolume = e.offsetY
  // 注册事件监听器
  window.addEventListener('mousemove', volumeMousemove)
  window.addEventListener('mouseup', volumeMouseup)
}
// volumeIcon的点击事件
const volumeIconClick = () => {
  // 点击切换icon
  isVolume.value = !isVolume.value
  // true是关闭音量
  if (isVolume.value) {
    // 在关闭音量前让 oldVoiceVolume 保留原有音量
    storage.value.oldVoiceVolume = storage.value.voiceVolume
    volumeBarHeight.value = 0
    audio.value!.volume = 0
  } else {
    // false是开启音量
    // 开启音量时让当前音量去拿关闭前保留的音量 oldVoiceVolume
    storage.value.voiceVolume = storage.value.oldVoiceVolume
    volumeBarHeight.value = storage.value.voiceVolume * 100
    audio.value!.volume = storage.value.voiceVolume
  }
}
// 根据音量颜色条来判断使用哪个icon
watch(volumeBarHeight, (newVal, oldVal) => {
  if (newVal === 0) {
    isVolume.value = true
  } else {
    isVolume.value = false
  }
})


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

// 定义是否显示歌曲列表
const isShowPlayerList = ref(false);
// 保留下当前点击的li标签的下标
const focusIndex = ref(0)
let focusIndex2:number = 0;
// li标签点击事件
const liClick = (index: number) => {
  // 重置audio的src
  audio.value!.src = props.audioList[index].audioSrc
  // 重置focusIndex
  focusIndex.value = index
  focusIndex2 = index
  play()
  if (isPlay.value === false) {
    isPlay.value = true
  }
}
// 拿到route
const route = useRoute()
// 当页面跳转停止播放歌曲
watch(route, () => {
  stop()
})

// audio.value?.buffered // 返回已缓冲的length
// audio.value?.currentTime //属性会以秒为单位返回当前媒体元素的播放时间。设置这个属性会改变媒体元素当前播放位置。
// audio.value?.loop // 属性是 HTML 标签 loop 属性的映射，它决定了媒体元素播放结束时是否重新开始。
// 属性(只读).paused 告诉视频是否正在暂停
// .volume 属性可设置媒体播放时的音量。
// load() 方法重置媒体成初始化状态，选择一个播放源， 为载入媒体重新播放做准备。

onMounted(() => {
  // 初始化音乐链接
  audio.value!.src = props.audioList[0].audioSrc
  // 当音乐播放时，每隔250ms回调一次该事件
  audio.value?.addEventListener('timeupdate', timeupdateFn)
  // 当音乐准备好可以播放时触发该事件
  audio.value?.addEventListener('canplay', () => {
    // 音乐总时长
    audioDuration.value = formatMusicTime(audio.value?.duration!)
    // 音乐音量初始化
    // audio.value!.volume = storage.value.voiceVolume
    if (audio.value) {
      audio.value.volume = storage.value.voiceVolume
    }
    // audioVolume.value = audio.value?.volume
    // 音量柱子初始化
    volumeBarHeight.value = audio.value!.volume * 100
  })
  // 当改变音量大小时触发
  audio.value?.addEventListener('volumechange', (e: Event) => {
    const audio = e.target as HTMLAudioElement;
    storage.value.voiceVolume = audio.volume;
  })

  // 当音乐播放结束时触发
  audio.value?.addEventListener('ended', endedFn)
  // 当音乐播放结束时触发（该函数已提到上面的endedFn中）
  // audio.value?.addEventListener('ended', () => {
  //   // 顺序播放
  //   if (playType.value === 0) {
  //     if (focusIndex2 === props.audioList.length - 1) {
  //       focusIndex2 = -1
  //     }
  //     // 重置audio的src
  //     audio.value!.src = props.audioList[++focusIndex2]?.audioSrc
  //     // 重置音乐播放器歌曲信息
  //     focusIndex.value = focusIndex2
  //   // 随机播放
  //   } else if (playType.value === 1) {
  //     const max = props.audioList.length - 1
  //     const index = Math.floor(Math.random() * (max - 0 + 1)) + 0;
  //     // 重置audio的src
  //     audio.value!.src = props.audioList[index]?.audioSrc
  //     // 重置音乐播放器歌曲信息
  //     focusIndex.value = index
  //   // 单曲循环
  //   } else {
  //     resetClick()
  //   }
  //   play()
  //   isPlay.value = true
  // })

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
.player {
  min-height: 100px;
  width: 100%;
  // background-color: #ffffff;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 7%), 0 1px 5px 0 rgb(0 0 0 / 10%);
  user-select: none;
  .player-body {
    display: flex;
    height: 100px;
    width: 100%;
    background-color: #ffffff;
    border-bottom: 1px solid #e9e9e9;
    .player-left {
      position: relative;
      width: 100px;
      height: 100px;
      cursor: pointer;

      &:hover .player-left-icon i {
        opacity: 1;
      }
      &:hover .player-left-modal {
        opacity: 1;
      }
      .player-left-modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        content: '';
        width: 100%;
        height: 100%;
        background: rgba($color: #000000, $alpha: .1);
        transition: all .3s ease;
        opacity: 0;
        z-index: 1;
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
        z-index: 2;
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
      // display: flex;
      // flex-direction: column;
      // justify-content: space-between;
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
        position: relative;
        height: 30px;
        text-align: center;
        overflow: hidden;
        margin: 10px 0;
        &::after {
          position: absolute;
          bottom: 0;
          content: " ";
          display: block;
          width: 100%;
          height: 33%;
          background: linear-gradient(180deg,hsla(0,0%,100%,0),hsla(0,0%,100%,.8));
          overflow: hidden;
          z-index: 1;
        }
        .lrc-contents {
          width: 100%;
          user-select: text;
          cursor: default;
          transition: all .5s ease-out;
          p {
            font-size: 12px;
            color: #666;
            // line-height: 16px!important;
            // height: 16px!important;
            height: auto!important;
            min-height: 16px;
            padding: 0!important;
            margin: 0!important;
            transition: all .5s ease-out;
            opacity: .4;
            // overflow: hidden;
          }
          .lrc-current {
            opacity: 1;
            // overflow: visible;
            // height: auto!important;
            // min-height: 16px;
          }
        }
      }
      .controller {
        display: flex;
        align-items: center;
        height: 18px;
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
            position: relative;
            margin-left: 8px;
            &:hover .volume-wrap {
              height: 45px;
            }
            .volume-wrap {
              position: absolute;
              bottom: 15px;
              right: -3px;
              width: 25px;
              height: 0;
              z-index: 99;
              overflow: hidden;
              transition: all .2s ease-in-out;
              .volume-wrap-bar {
                position: absolute;
                bottom: 0;
                right: 10px;
                width: 5px;
                height: 40px;
                background: #cdcdcd;
                border-radius: 2.5px;
                overflow: hidden;
                .volume-wrap-bar-inner {
                  position: absolute;
                  bottom: 0;
                  right: 0;
                  width: 5px;
                  background: rgb(127, 218, 180);
                  pointer-events: none;
                  transition: all .1s ease;
                }
              }
            }
            .volume-wrap-height {
              height: 45px;
            }
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
  .player-list {
    width: 100%;
    max-height: 0;
    overflow-y: auto;
    transition: all .5s ease;
    ol {
      list-style: none;
      padding: 0;
      margin: 0;
      width: 100%;
      background-color: #ffffff;
      li {
        position: relative;
        width: 100%;
        line-height: 32px;
        font-size: 12px;
        border-top: 1px solid #e9e9e9;
        padding: 0 15px;
        cursor: pointer;
        transition: all .2s ease;
        &:hover {
          background-color: #efefef;
        }
        &:first-child {
          border-top: none;
        }

        .list-cur {
          position: absolute;
          left: 0;
          top: 5px;
          display: block;
          width: 3px;
          height: 22px;
          background-color: transparent;
        }
        .list-index {
          color: #666;
          margin-right: 12px;
        }
        .list-title {
          color: #333;
        }
        .list-author {
          float: right;
          color: #666;
        }
      }
      .li-focus {
        background-color: #e9e9e9;
        .list-cur {
          background-color: rgb(127, 218, 180);
        }
      }
    }
  }
  .player-list-show {
    max-height: 220px;
  }
}
</style>
