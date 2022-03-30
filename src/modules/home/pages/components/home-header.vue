<template>
  <div class="home-header" ref="homeHeader"
    @mousemove="headerMousemove"
    @mouseenter="headerMouseenter"
    @mouseleave="handerMouseleave"
  >
    <div id="Header">
      <header class="" :style="`--percentage:${opacity}; --full-width: ${homeHeaderWidth}`">
        <div :class="`view ${isMoving ? 'is-moving' : ''}`">
          <img src="@/assets/img/home/bilibili-winter-view-1.f67d9ca8.jpg" alt="" class="morning">
          <img src="@/assets/img/home/bilibili-winter-view-2.ba9c6589.jpg" alt="" class="afternoon">
          <video autoplay loop muted class="evening">
            <source src="@/assets/video/home/bilibili-winter-view-3.79f65a9c.webm" type="video/webm">
          </video>
          <img src="@/assets/img/home/bilibili-winter-view-3-snow.c5bca8d6.png" alt="" class="window-cover">
        </div>
        <div :class="`tree ${isMoving ? 'is-moving' : ''}`">
          <img src="@/assets/img/home/bilibili-winter-tree-1.bff9a60f.png" alt="" class="morning">
          <img src="@/assets/img/home/bilibili-winter-tree-2.5f90f1cb.png" alt="" class="afternoon">
          <img src="@/assets/img/home/bilibili-winter-tree-3.77be716a.png" alt="" class="evening">
        </div>
      </header>
      <!-- <nav class="header-nav" :class="{'header-nav-fixed': isScroll}" ref="nav">
        <div class="personal-information">
          <div class="nav-inner-logo">
            <img src="@/assets/img/home/header-logo.png" alt="">
          </div>
          <div class="nav-inner-title">Fishwheat</div>
        </div>
        <div class="menu">
          <div class="menu-item">
            <i class="iconfont icon-shouye"></i>
            <div class="menu-list-home">首页</div>
          </div>
          <div class="menu-item" @click="$router.push({name: 'Hobby'})">
            <i class="iconfont icon-zan"></i>
            <div class="menu-list-about-blog">爱好</div>
          </div>
          <div class="menu-item">
            <i class="iconfont icon-youxi"></i>
            <div class="menu-list-game">小游戏</div>
          </div>
          <div class="menu-item">
            <i class="iconfont icon-weibiaoti-"></i>
            <div class="menu-list-hobby">关于博客</div>
          </div>
          <div class="menu-item">
            <i class="iconfont icon-pengyouquan"></i>
            <div class="menu-list-friendly">友链</div>
          </div>
        </div>
      </nav> -->
    </div>
  </div>
    <!-- <div style="height: 1500px;"></div> -->
</template>

<script lang='ts' setup>
// import '@/assets/svg/home-svg/fonticon/iconfont.css';
import {reactive, ref, onBeforeMount, onMounted, onUnmounted, computed} from 'vue';
// import { throttle } from '@/helpers/helpers';

// 是否在滑动（是否开启is-moving这个类）
const isMoving = ref(false);
// 默认0.5，显示中间那张图
const opacity = ref(0.5);
// 拿到ref上的这个dom
const homeHeader = ref();
// 拿到头部的宽度 === 浏览器宽度
const homeHeaderWidth = ref(window.innerWidth);
// 定义鼠标第一次进入头部图片的位置
let startX = 0;

// const windowScrollHeight = ref();
// const navHeight = ref();

// 鼠标在图片上滑动
const headerMousemove = (e: MouseEvent) => {
  // console.log(homeHeaderWidth.value);
  opacity.value = (e.clientX - startX) / homeHeaderWidth.value + 0.5;
  isMoving.value = true;
};
// 拿到鼠标进入图片时的位置
const headerMouseenter = (e: MouseEvent) => {
  startX = e.clientX;
}
// 离开图片时回到默认值
const handerMouseleave = (e: MouseEvent) => {
  isMoving.value = false;
  opacity.value = 0.5;
}
// 拿到当前屏幕的宽度
const handleResize = () => {
  homeHeaderWidth.value = homeHeader.value.offsetWidth;
}
// const headerScroll = () => {
//   windowScrollHeight.value = window.pageYOffset;
// }
// const isScroll = computed(() => {
//   return  windowScrollHeight.value >=navHeight.value
// })
onMounted(() => {
  // navHeight.value = nav.value.offsetHeight
  handleResize()
  // 在浏览器页面大小发生改变时触发
  window.addEventListener('resize', handleResize)
  // window.addEventListener('scroll', headerScroll)
});

onUnmounted(()=>{
  window.removeEventListener('resize', handleResize)
})

defineExpose({
});
</script>

<script lang='ts'>
export default { name: 'HomeHeader' };

</script>

<style lang='scss'>
// @keyframes iconJump {
//   0% {
//     transform: translateY(0);
//   }
//   50% {
//     transform: translateY(-5px);
//   }
//   100% {
//     transform: translateY(0);
//   }
// }
.home-header {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  header {
    .view {
      transform: translatex(calc(var(--percentage) * calc(var(--full-width) / 1500) * 100px));
    }
    .tree {
      transform: translatex(calc(var(--percentage) * calc(var(--full-width) / 1500) * 50px));
      filter: blur(3px);
    }
    .view,.tree {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .afternoon,.morning,.tree,.view {
      transition: all .2s ease-in;
      &.is-moving {
        transition: none;
      }
    }
    
    .morning {
      z-index: 20;
      opacity: calc(2 - var(--percentage)/.25);
    }
    .afternoon {
      z-index: 10;
      opacity: calc(2 - var(--percentage)/.5);
    }
    img,video {
      position: absolute;
      display: block;
      width: 120%;
      height: 100%;
      object-fit: cover;
    }
    .window-cover {
      opacity: calc(var(--percentage)/.1 - 9);
    }
  }
  // .header-nav {
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 58px;
  //   // background: rgba($color: #fff, $alpha: 0.3);
  //   background: linear-gradient(to top, transparent,rgba(0, 0, 0, .3), rgba(0, 0, 0, .3));
  //   z-index: 99;
  //   transition: all .3s ease-in;
  //   .personal-information {
  //     height: 100%;
  //     display: flex;
  //     align-items: center;
  //     cursor: pointer;
  //     .nav-inner-logo {
  //       position: relative;
  //       width: 45px;
  //       height: 44px;
  //       border-radius: 22px;
  //       overflow: hidden;
  //       margin: 0 10px;
  //       border: 1px solid #fff;
  //       img {
  //         padding: 3px;
  //         width: 100%;
  //         height: 100%;
  //         // background: linear-gradient(#7FFFAA,#FFCCFF);
  //       }
  //       &::after {
  //         position: absolute;
  //         top: 0;
  //         left: 0;
  //         width: 100%;
  //         height: 100%;
  //         content: '';
  //         background: linear-gradient(#7FFFAA,#FFCCFF);
  //         z-index: -1;
  //         filter: blur(10px);
  //       }
  //     }
  //     .nav-inner-title {
  //       font-weight: bolder;
  //       font-size: 21px;
  //       font-family: Cambria,Cochin,Georgia,Times,Times New Roman,serif;
  //       color: #fff;
  //     }
  //   }
  //   .menu {
  //     height: 100%;
  //     display: flex;
  //     align-items: center;
  //     margin-right: 40px;
  //     .menu-item {
  //       display: flex;
  //       flex-direction: column;
  //       justify-content: center;
  //       align-items: center;
  //       font-size: 14px;
  //       color: #fff;
  //       margin: 0 16px;
  //       cursor: pointer;
  //       i {
  //         font-size: 22px;
  //       }
  //     }
  //     .menu-item:hover i{
  //       animation: iconJump .5s ease-in;
  //     }
  //   }
  // }
  // .header-nav-fixed {
  //   position: fixed;
  //   top: 0;
  //   background: #fff;
  //   box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  //   .personal-information {
  //     .nav-inner-logo {
  //       border: 1px solid #bbb;
  //     }
  //     .nav-inner-title {
  //       color: #333;
  //     }
  //   }
  //   .menu {
  //     .menu-item {
  //       color: #61666D;
  //       i {
  //         color: #333;
  //         font-weight: bold;
  //       }
  //     }
  //   }
  // }
}
</style>
