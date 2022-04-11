<template>
  <!-- <div id="nav"> -->
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
    <router-view/>
  <!-- </div> -->
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}
body {
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}
::-webkit-scrollbar {
    width: 7px;
    height: 7px;
}
::-webkit-scrollbar-corner {
    background-color: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: #49b1f5;
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.4) 25%,
   transparent 25%, transparent 50%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.4) 75%, transparent 75%, transparent);
  border-radius: 7px;
}
::-webkit-scrollbar-track {
  background-color: #fff;
  border-radius: 7px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #49b1f5;
  background-image: none;
}
::-webkit-scrollbar-thumb:active {
  background-color: #49b1f5;
  background-image: none;
}

.player {
  .player-list {
    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background-color: #eee;
    }
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background-image: none;
      background-color: #ccc;
    }
    &::-webkit-scrollbar-thumb:active {
      background-image: none;
      background-color: #ccc;
    }
  }
}
</style>
