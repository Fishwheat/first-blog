<template>
  <div class="blog-lists">
    <div class="lists">
      <div class="lists-item" v-for="item in lists" :key="item.id">
        <div class="background-shadow"></div>
        <div class="lists-item-left">
          <div class="water-wave"></div>
          <div class="water-wave"></div>
          <div class="water-wave"></div>
          <img src="@/assets/img/test/home-list-test.png" alt="">
        </div>
        <div class="lists-item-center">
          <h2 class="title" style="color: #333;">{{ item.title }}</h2>
          <div class="content">{{ item.text }}</div>
          <div class="label">
            <i class="iconfont icon-24gf-tags4"></i>
            <div class="label-item" v-for="(i, index) in item.label" :key="index">{{ i[index] }}</div>
          </div>
        </div>
        <div class="lists-item-right">
          <div class="time">
            <i class="iconfont icon-shijian"></i>
            {{ item.time }}
          </div>
          <div class="complete">阅读全文>></div>
        </div>
      </div>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20]"
      :page-size="pageSize"
      :pager-count="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="props.toTalLists.length"
      background>
    </el-pagination>
  </div>
</template>

<script lang='ts' setup>
import '@/assets/svg/home-svg/fonticon/iconfont.css';
import {reactive, ref, onBeforeMount, onMounted, computed, defineProps} from 'vue';
import { ElPagination } from 'element-plus'

const props = defineProps({
  toTalLists: {
    type: Array,
    default: [],
  }
})
let lists = ref()
const pageSize = ref(5)
const currentPage = ref(1)
const handleSizeChange = (val: any) => {
  pageSize.value = val
}
const handleCurrentChange = (val: any) => {
  currentPage.value = val
  lists.value = getList(props.toTalLists, currentPage.value, pageSize.value)
  
}

const getList = (data: any, num: any, size: any) => {
  let list, total, start: any, end, isFirst, isLast
  total = data.length
  isFirst = total < size
  isLast = Math.ceil(total / size) === num
  start = (num - 1) * size
  end = isFirst && isLast ? start + (total % size) : start + size
  list = data.slice(start, end)
  // list.forEach((item: any, index: any) => {
  //   item.seq = index + start
  // })
  return list
}
onMounted(() => {
  lists.value = getList(props.toTalLists, currentPage.value, pageSize.value)
});
defineExpose({
});
</script>

<script lang='ts'>
export default { name: '' };

</script>

<style lang='scss'>
@keyframes waterWave {
  0% {
    width: 0px;
    height: 0px;
    border: 2px solid rgba($color: #fff, $alpha: 1);
  }
  10% {
    border: 5px solid rgba($color: #fff, $alpha: 1);
  }
  100% {
    width: 100px;
    height: 100px;
    border: 1px solid rgba($color: #fff, $alpha: 0);
  }
}
.blog-lists {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .lists {
    width: 100%;
    .lists-item {
      position: relative;
      height: 240px;
      display: flex;
      align-items: center;
      background-color: #fff;
      // border: 1px solid #ddd;
      border-radius: 6px;
      // box-shadow: 0 0 0 1px rgba($color: #ddd, $alpha: .5);
      // transition: all .5s;
      margin-bottom: 20px;

      // &:hover {
        // border: 1px solid #409eff;
        // box-shadow: 0 1px 0 2px rgba($color: #ddd, $alpha: .5);
      // }
      &:hover .background-shadow {
        width: calc(100% + 4px);
        // top: 54%;
        transform: translate(-50%, 8px);
        background: rgba($color: #555, $alpha: .2 );
      }
      &:hover .lists-item-left::after{
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        width: 100%;
        height: 100%;
        background: rgba($color: #000000, $alpha: .3);
        z-index: 1;
      }
      &:hover .water-wave {
        visibility: visible !important;
        // display: block !important;
      }
      .background-shadow {
        position: absolute;
        // top: 52%;
        top: 0;
        left: 50%;
        transform: translate(-50%, 4px);
        content: '';
        width: 100%;
        height: 100%;
        border-radius: 8px;
        background: rgba($color: #333, $alpha: .1);
        filter: blur(3px);
        transition: all .2s linear;
        z-index: -1;
      }
      .lists-item-left {
        position: relative;
        height: 240px;
        border-radius: 6px 0 0 6px;
        overflow: hidden;
        .water-wave {
          // display: none;
          visibility: hidden;
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          transform: translate(-50%,-50%);
          animation: waterWave 3.6s ease-out infinite;
          z-index: 2;
        }
        .water-wave:nth-child(2) {
          animation-delay: 1.2s;
        }
        .water-wave:nth-child(3) {
          animation-delay: 2.4s;
        }
        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .lists-item-center {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        flex: 7;
        padding-left: 10px;
        .content {
          color: #333;
          line-height: 24px;
          display: -webkit-box;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          overflow: hidden;
        }
        .label {
          display: flex;
          align-items: center;
          margin: 18px 0;
          i {
            font-size: 20px;
            color:#8b8282;
          }
          .label-item {
            line-height: 22px;
            color: #fff;
            // background: #666;
            // background:#F08080;
            background:rgb(250, 147, 163);
            border-radius: 3px;
            padding: 0 6px;
            margin-left: 20px;
            user-select: none;
          }
        }
      }
      .lists-item-right {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 20px;
        .time {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          color: #666;
          i {
            font-size: 20px;
          }
        }
        .complete {
          font-size: 16px;
          color: #fff;
          line-height: 26px;
          text-align: center;
          // background: #555;
          background: #409eff;
          // background: #66aaff;
          border-radius: 3px;
          cursor: pointer;
          user-select: none;
          &:active {
            background: #66aaff;
          }
        }
      }
    }
  }
}
</style>
