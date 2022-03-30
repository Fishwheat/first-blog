<template>
  <div class="type-writer">
    <div class="type-writer-item">
      Welcome to Uni Auth!
      <div class="type-writer-cursor"></div>
    </div>
    <div class="type-writer-item2">
      Let's begin the adventure
      <div class="type-writer-cursor"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { ref } from 'vue';

</script>

<style lang="scss">
@keyframes typeWriter{
  0% {
    width: 0px;
  }
  100% {
    width: 247px;
  }
}
@keyframes typeWriter2{
  0% {
    width: 0px;
  }
  100% {
    width: 182px;
  }
}
@keyframes typeWriterCursor{
  0% {
    background: pink;
    // left: 0;
  }
  100% {
    background: #000;
    // left: 200px;
  }
}
.type-writer {
  position: relative;
  padding: 16px;
  width: 280px;
  background: pink;
  font-size: 14px;
  &::before, &::after {
    position: absolute;
    top: 0;
    right: 0;
    content: '';
    width: 116px;
    height: 50%;
    background: pink;
    z-index: 2;
  }
  &::after {
    top: 50%;
    width: 90px;
    background: pink;
  }
  .type-writer-item, .type-writer-item2 {
    // display: flex;
    // align-items: center;
    position: relative;
    height: 19px;
    white-space: nowrap;
    overflow: hidden;
    // word-wrap: break-word;
    word-break: break-all;
  }
  .type-writer-item {
    width: 1px;
    animation: typeWriter 2s steps(30) forwards;
    animation-delay: 2s;
  }
  .type-writer-item2 {
    width: 0px;
    animation: typeWriter2 2s steps(30) forwards;
    animation-delay: 3.2s;
  }
  .type-writer-cursor {
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 16px;
    background: #000;
    animation: typeWriterCursor 1s linear infinite;
  }
}
</style>
