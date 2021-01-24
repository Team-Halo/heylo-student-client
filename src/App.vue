<template>
  <div id="app" @mouseover="mouseover" @mouseleave="mouseleave">
    <div id="grid">
      <camera id="camera" />
      <question
        id="question"
        v-if="questionText"
        :questionText="questionText"
      />
      <emoji-bar id="emoji" @click="emojiClick" />
    </div>
  </div>
</template>

<script>
import Camera from "./components/Camera.vue";
import EmojiBar from "./components/EmojiBar.vue";
import Question from "./components/Question.vue";
import db from "./firebase.js";
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
      sessionId: null,
      inClient: false,
    };
  },
  created() {
    /* eslint-disable */
    if (typeof CefSharp != "undefined") {
      (async function () {
        this.inClient = true;
        await CefSharp.BindObjectAsync("heyloClient", "bound");
        heyloClient.decreaseWidth();
        heyloClient.decreaseHeight();
      })();
    }

    var newSessionId = db.ref().child("sessions").push().key;
    this.sessionId = newSessionId;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates["/sessions/" + newSessionId] = {
      reactions: [],
    };

    db.ref().update(updates);
    this.sendReaction("connect");
  },
  methods: {
    mouseover() {
      if (this.inClient) heyloClient.increaseWidth();
    },
    mouseleave() {
      if (this.inClient) heyloClient.decreaseWidth();
    },
    sendReaction(reaction) {
      var newReactionKey = db.ref(`sessions/${this.sessionId}/reactions`).push()
        .key;

      var updates = {};
      updates[newReactionKey] = {
        reaction: reaction,
        timestamp: +new Date(),
      };

      db.ref(`sessions/${this.sessionId}/reactions/`).update(updates);
    },
    emojiClick(text) {
      this.sendReaction(text);
    },
  },
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
