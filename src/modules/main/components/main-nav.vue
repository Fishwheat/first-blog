<template>
  <div class="main-nav" :style="props.isHome ? 'height: 0px;':'height: 58px;'">
    <nav :class="[props.isHome ? 'header-nav' : 'header-nav header-nav-fixed', {'header-nav-fixed': props.isHome && isScroll}]" ref="nav">
    <!--{'header-nav-fixed': isHome && isScroll}-->
      <div class="personal-information" @click="routerPageClick(RoutesEnum.PERSONAL)">
        <div class="nav-inner-logo">
          <img src="@/assets/img/home/header-logo.png" alt="">
        </div>
        <div class="nav-inner-title">Fishwheat</div>
      </div>
      <div class="menu">
        <!-- <div class="menu-list"> -->
          <div class="menu-item" @click="routerPageClick(RoutesEnum.HOME)">
            <i class="iconfont icon-shouye"></i>
            <div class="menu-list-home">首页</div>
          </div>
          <div class="menu-item" @click="routerPageClick(RoutesEnum.HOBBY)">
            <i class="iconfont icon-zan"></i>
            <div class="menu-list-about-blog">爱好</div>
          </div>
          <div class="menu-item" @click="routerPageClick(RoutesEnum.GAMES)">
            <i class="iconfont icon-youxi"></i>
            <div class="menu-list-game">小游戏</div>
          </div>
          <div class="menu-item" @click="routerPageClick(RoutesEnum.BLOGABOUT)">
            <i class="iconfont icon-weibiaoti-"></i>
            <div class="menu-list-hobby">关于博客</div>
          </div>
          <div class="menu-item" @click="routerPageClick(RoutesEnum.FRIENDLYLINK)">
            <i class="iconfont icon-pengyouquan"></i>
            <div class="menu-list-friendly">友链</div>
          </div>
          <!-- <a href="/friendly-link"></a> -->
        <!-- </div> -->
      </div>
      <div class="language" @click="languageClick">
        <div class="language-icon">
          <i class="iconfont icon-yuyan"></i>
        </div>
        <div class="language-text">{{ isZhCn ? 'English' : '中文简体' }}</div>
      </div>
    </nav>
  </div>
</template>

<script lang='ts' setup>
import '@/assets/svg/home-svg/fonticon/iconfont.css';
import {reactive, ref, computed, onBeforeMount, onMounted, onUnmounted, watch, onUpdated} from 'vue';
import RoutesEnum from '@/enums/routes.enums';
import { useRoute, useRouter } from 'vue-router';
import { storage } from '@/helpers/storage';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();

const props = defineProps({
  isHome: {
    type: Boolean,
    default: false,
  }
})
// 初始化ref上的nav
const nav = ref();
// 定义浏览器滑动的高度（距离）
const windowScrollHeight = ref();
// 定义nav的高度
const navHeight = ref();

// 获取浏览器滑动的高度（距离）
const headerScroll = () => {
  windowScrollHeight.value = window.pageYOffset;
}
// 根据滚动的距离决定是否添加“header-nav-fixed”这个类
const isScroll = computed(() => {
  return  windowScrollHeight.value >= navHeight.value
})
// 拿到router
const router = useRouter()
// 拿到route
// const route = useRoute()
// 根据点击的选项跳到指定页面
const routerPageClick = (name: any) => {
  router.push({
    name,
  })
}
// 定义存放当前的页面路径上的meta page 的变量
// const routePage = ref();
// 监听route路径是否发生变化，并更新routePage
// watch(route, () => {
//   routePage.value = route.meta.page
// })
// 判断当前页面是否在主页Home
// const isHome = computed(() => {
//   return routePage.value === RoutesEnum.HOME;
// })
const languageClick = () => {
  // window.location.reload();
  // window.location.href = window.location.href
  if (isZhCn.value) {
    storage.value.languageType = 'en-us'
  } else {
    storage.value.languageType = 'zh-cn'
  }
  i18n.locale.value = storage.value.languageType
}
const isZhCn = computed(() => {
  return storage.value.languageType === 'zh-cn'
})
onMounted(() => {
  // routePage.value = route.meta.page
  navHeight.value = nav.value.offsetHeight
  window.addEventListener('scroll', headerScroll)
});

defineExpose({
});
</script>

<script lang='ts'>
export default { name: 'MainNav' };

</script>

<style lang='scss'>
@keyframes iconJump {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}
.main-nav {
  position: relative;
  width: 100%;
  // overflow: hidden;
  .header-nav {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 58px;
    // background: rgba($color: #fff, $alpha: 0.3);
    background: linear-gradient(to top, transparent,rgba(0, 0, 0, .3), rgba(0, 0, 0, .3));
    z-index: 99;
    // transition: all .3s ease-in; // 如果写在此处，那么页面之间跳转时nav也会出现颜色转换，因此写在了下面.header-nav-fixed里
    .personal-information {
      height: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;
      .nav-inner-logo {
        position: relative;
        width: 45px;
        height: 44px;
        border-radius: 22px;
        overflow: hidden;
        margin: 0 10px;
        border: 1px solid #fff;
        img {
          padding: 3px;
          width: 100%;
          height: 100%;
          // background: linear-gradient(#7FFFAA,#FFCCFF);
        }
        &::after {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          content: '';
          background: linear-gradient(#7FFFAA,#FFCCFF);
          z-index: -1;
          filter: blur(10px);
        }
      }
      .nav-inner-title {
        font-weight: bolder;
        font-size: 21px;
        font-family: Cambria,Cochin,Georgia,Times,Times New Roman,serif;
        color: #fff;
      }
    }
    .menu {
      height: 100%;
      display: flex;
      align-items: center;
      margin-right: 136px;
      .menu-item {
        width: 72px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #fff;
        // margin: 0 16px;
        cursor: pointer;
        i {
          font-size: 22px;
        }
      }
      .menu-item:hover i{
        animation: iconJump .5s ease-in;
      }
    }
    .language {
      position: absolute;
      right: 20px;
      display: flex;
      // justify-content: center;
      align-items: center;
      width: 100px;
      height: 34px;
      color: #fff;
      background: rgba($color: #06c6bc, $alpha: .6);
      border-radius: 8px;
      user-select: none;
      cursor: pointer;
      &:active {
        background: rgba($color: #06c6bc, $alpha: .8);
      }
      .language-icon {
        height: 14px;
        // width: 14px;
        line-height: 14px;
        text-align: center;
        padding: 0 8px;
        border-right: 1px solid #ffffff;
        i {
         font-size: 14px;
        }
      }
      .language-text {
        font-size: 13px;
        margin-left: 8px;
        // font-weight: 600;
      }
    }
  }
  .header-nav-fixed {
    position: fixed;
    top: 0;
    background: #fff;
    box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
    transition: all .3s ease-in; // 写在此处是避免页面跳转时nav也出现动态颜色转换
    .personal-information {
      .nav-inner-logo {
        border: 1px solid #bbb;
      }
      .nav-inner-title {
        color: #333;
      }
    }
    .menu {
      .menu-item {
        color: #61666D;
        i {
          color: #333;
          font-weight: bold;
        }
      }
    }
    .language {
      background: rgba($color: #06c6bc, $alpha: 1);
    }
  }
}
</style>
