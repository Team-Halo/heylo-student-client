<template>
  <div id="app">
    <div id="grid">
      <camera id="camera" />
      <question
        id="question"
        v-if="questionText"
        :questionText="questionText"
      />
      <emoji-bar id="emoji" />
    </div>
  </div>
</template>

<script>
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
      questionText: "😇:<question text>",
    };
  },
  methods: {},
};
</script>

<style scoped>
#app {
  font-family: "Lato", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
#grid {
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: min-content min-content;
  grid-template-areas:
    "empty question"
    "camera emoji";
  width: 100%;
}
#camera {
  grid-area: camera;
}
#emoji {
  grid-area: emoji;
}
#question {
  grid-area: question;
}
</style>
