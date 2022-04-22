<template>
  <div class="home-content-aside-recommend">
    <div class="recommend-header">
      <div class="img"></div>
    </div>
    <div class="recommend-text">
      <p>{{ $t('home_content_aside_recommend.recommend_text1') }}</p>
      <p>{{ $t('home_content_aside_recommend.recommend_text2') }}</p>
      <!-- <p>{{ '你好，我叫鱼小麦，一位热衷于编程的网站开发人员。你可以通过以下方式与我取得联系。' }}</p>
      <p>
        {{ 'Hi, my name is Fishwheat, a website developer keen on programming.You can get in touch with me by using the following means.' }}
      </p> -->
    </div>
    <div class="recommend-link">
      <div class="link-email">
        <el-popover
          placement="top"
          title=""
          trigger="hover"
          content="邮箱"
          popper-class="popover-recommend-link"
          width="Min width 150px"
        >
          <template #reference>
            <a href="https://space.bilibili.com/24731556/?spm_id_from=333.999.0.0">
              <i class="iconfont icon-youxiang_"></i>
            </a>
          </template>
        </el-popover>
      </div>
      <div class="link-github">
        <el-popover
          placement="top"
          title=""
          trigger="hover"
          content="github"
          popper-class="popover-recommend-link"
          width="Min width 150px"
        >
          <template #reference>
            <a href="https://space.bilibili.com/24731556/?spm_id_from=333.999.0.0">
              <i class="iconfont icon-githubb"></i>
            </a>
          </template>
        </el-popover>
      </div>
      <div class="link-gitee">
        <el-popover
          placement="top"
          title=""
          trigger="hover"
          content="gitee"
          popper-class="popover-recommend-link"
          width="Min width 150px"
        >
          <template #reference>
            <a href="https://space.bilibili.com/24731556/?spm_id_from=333.999.0.0">
              <i class="iconfont icon-gitee"></i>
            </a>
          </template>
        </el-popover>
      </div>
      <div class="link-bilibili">
        <el-popover
          placement="top"
          title=""
          trigger="hover"
          content="bilibili"
          popper-class="popover-recommend-link"
          width="Min width 150px"
        >
          <template #reference>
            <a href="https://space.bilibili.com/24731556/?spm_id_from=333.999.0.0">
              <i class="iconfont icon-icon_bilibili-circle"></i>
            </a>
          </template>
        </el-popover>
      </div>
      <div class="link-qq">
        <el-popover
          placement="top"
          title=""
          trigger="hover"
          content="QQ"
          popper-class="popover-recommend-link"
          width="Min width 150px"
        >
          <template #reference>
            <a href="https://space.bilibili.com/24731556/?spm_id_from=333.999.0.0">
              <i class="iconfont icon-QQ-circle-fill"></i>
            </a>
          </template>
        </el-popover>
      </div>
      <!-- <div class="link-juejin">
        <el-popover
          placement="top"
          title=""
          trigger="hover"
          content="掘金"
          popper-class="popover-recommend-link"
          width="Min width 150px"
        >
          <template #reference>
            <a href="javascript:;https://space.bilibili.com/24731556/?spm_id_from=333.999.0.0">
              <img src="@/assets/svg/home-svg/juejin-logo_icon.svg" alt="">
            </a>
          </template>
        </el-popover>
      </div> -->
    </div>
  </div>
</template>

<script lang='ts' setup>
import '@/assets/svg/home-svg/fonticon/iconfont.css';
import {reactive, ref, onBeforeMount, onMounted} from 'vue';


onMounted(() => {
  // console.log('3.-组件挂载到页面之后执行-------onMounted');
});
defineExpose({
});
</script>

<script lang='ts'>
export default { name: 'HomeContentAsideRecommend' };

</script>

<style lang='scss'>
.popover-recommend-link {
  min-width: 0px !important;
}
.home-content-aside-recommend {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 300px;
  .recommend-header {
    position: relative;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    &::after {
      position: absolute;
      top: -20px;
      left: -20px;
      content: '';
      width: calc(100% + 40px);
      height: calc(100% + 40px);
      background: url('../../../../assets/img/home/home-content-aside-recommend-background.png') no-repeat;
      background-size: 100%;
      border-radius: 6px 6px 0 0;
    }
    .img {
      position: relative;
      width: 80px;
      height: 80px;
      background: rgba($color: #668592, $alpha: 1.0);
      border-radius: 50%;
      border: 1px solid #fff;
      z-index: 2;
    }
  }
  .recommend-text {
    p {
      text-indent: 2em;
    }
  }
  .recommend-link {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    a {
      display: block;
      text-decoration: none;
    }
    .link-email, .link-github, .link-gitee, .link-bilibili, .link-qq, .link-juejin {
      width: 45px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      margin: 0 8px;
      a {
        height: 100%;
      }
    }
    .link-email {
      a {
        i {
          font-size: 40px;
          color: #3B98BA;
        }
      }
    }
    .link-github {
       a {
        i {
          font-size: 34px;
          color: #000;
        }
      }
    }
    .link-gitee {
      a {
        i {
          font-size: 34px;
          color: #C71D23;
        }
      }
    }
    .link-bilibili {
      a {
        i {
          font-size: 45px;
          color: #FB7299;
        }
      }
    }
    .link-qq {
      a {
        i {
          font-size: 40px;
          color: #00ABFF;
        }
      }
    }
    // .link-juejin {
    //   width: 35px;
    //   height: 35px;
    //   line-height: 35px;
    //   text-align: center;
    //   border: 1px solid #1E80FF;
    //   border-radius: 50%;
    //   a {
    //     width: 100%;
    //     height: 100%;
    //     img {
    //       width: 100%;
    //       height: 100%;
    //     }
    //   }
    // }
  }
}
</style>
