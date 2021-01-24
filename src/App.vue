<template>
  <div id="app">
    <div id="grid">
      <camera id="camera" />
      <question
        id="question"
        v-if="questionText"
        :questionText="questionText"
      />
      {{ test }}
      <emoji-bar id="emoji" />
    </div>
  </div>
</template>

<script>
import { db } from "./utils/firebase";
import Camera from "./components/Camera.vue";
import EmojiBar from "./components/EmojiBar.vue";
import Question from "./components/Question.vue";
// import consts from "./consts";

export default {
  name: "App",
  components: {
    EmojiBar,
    Camera,
    Question,
  },
  data() {
    return {
      test: "",
      questionText: "😇:A very long example question to test text wrapping",
    };
  },
  firebase: {
    test: db.ref("test"),
  },
  methods: {},
};
</script>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: "Lato", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
#grid {
  display: grid;
  grid-template-columns: min-content minmax(0px, 1fr);
  grid-template-rows: minmax(0px, 1fr) min-content;
  grid-template-areas:
    "empty question"
    "camera emoji";
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
#camera {
  grid-area: camera;
  height: 100%;
  z-index: 3;
}
#emoji {
  grid-area: emoji;
}
#question {
  grid-area: question;
}
</style>
