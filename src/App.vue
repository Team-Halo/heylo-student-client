<template>
  <div id="app">
    <div id="camera-status">
      <camera v-if="true"/>
      <emoji-bar />
    </div>
  </div>
</template>

<script>
import Camera from "./components/Camera.vue";
import EmojiBar from "./components/EmojiBar.vue";

export default {
  name: "App",
  components: {
    EmojiBar,
    Camera,
  },
};
</script>

<style scoped>
#app {
  font-family: "Lato", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#camera-status {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
}
</style>
