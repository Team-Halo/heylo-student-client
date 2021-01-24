<template>
  <div id="app" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <div id="grid">
      <camera id="camera" />
      <question
        id="question"
        v-if="question.id"
        :questionText="question.text"
      />
      <emoji-bar id="emoji" @click="emojiClick" v-if="!sessionInit" />
      <session-input
        id="input"
        v-if="sessionInit"
        @session="connect"
      ></session-input>
    </div>
  </div>
</template>

<script>
import Camera from "./components/Camera.vue";
import EmojiBar from "./components/EmojiBar.vue";
import Question from "./components/Question.vue";
import SessionInput from "./components/SessionInput.vue";
import db from "./firebase.js";
import consts from "./consts.js";
import { sleep } from "./utils.js";

export default {
  name: "App",
  components: {
    EmojiBar,
    Camera,
    Question,
    SessionInput,
  },
  data() {
    return {
      question: {
        id: null,
        text: null,
      },
      reactedQuestions: [],
      sessionId: null,
      sessionInit: true,
      inClient: false,
      mousein: false,
    };
  },
  created() {
    /* eslint-disable */
    if (typeof CefSharp != "undefined") {
      let ref = this;
      (async function () {
        ref.inClient = true;
        await CefSharp.BindObjectAsync("heyloClient", "bound");
        heyloClient.increaseWidth();
        heyloClient.decreaseHeight();
      })();
    }

    // TODO: remove
    var newSessionId = db.ref().child("sessions").push().key;
    this.sessionId = newSessionId;

    var updates = {};
    updates["/sessions/" + newSessionId] = {
      reactions: [],
    };

    db.ref().update(updates);
  },
  methods: {
    connect(sessionId) {
      this.sessionId = sessionId;
      this.sessionInit = false;
      this.sendReaction("connect");
      var questionRef = db.ref("sessions/" + this.sessionId + "/questions");
      questionRef.on("value", (snapshot) => {
        const data = snapshot.val();
        this.onQuestionUpdate(data);
      });
    },
    async onQuestionUpdate(data) {
      let now = +new Date();
      if (this.question.id) {
        let exists = false;
        for (let questionId in data) {
          if (this.question.id === questionId) exists = true;
        }
        if (!exists) {
          this.quesiton.id = null;
          this.question.text = null;
          if (this.inClient) {
            heyloClient.decreaseHeight();
            if (!this.mousein) {
              await sleep(1000);
              heyloClient.decreaseWidth();
            }
          }
        }
      } else {
        for (let questionId in data) {
          if (!this.reactedQuestions.includes(questionId)) {
            if (now - data[questionId].timestamp < 1000 * 60) {
              this.question.id = questionId;
              this.question.text = consts.randomQuestion();
              if (this.inClient) {
                heyloClient.increaseWidth();
                await sleep(1000);
                heyloClient.increaseHeight();
              }
              setTimeout(
                async (id) => {
                  if (this.question.id === id) {
                    this.sendReaction("idle");
                    this.question.id = null;
                    this.question.text = null;
                    if (this.inClient) {
                      heyloClient.decreaseHeight();
                      if (!this.mousein) {
                        await sleep(1000);
                        heyloClient.decreaseWidth();
                      }
                    }
                  }
                },
                1000 * 60 * 2,
                questionId
              );
            }
          }
        }
      }
    },
    mouseenter() {
      this.mousein = true;
      if (this.inClient && !this.sessionInit && !this.question.id)
        heyloClient.increaseWidth();
    },
    mouseleave() {
      this.mousein = false;
      if (this.inClient && !this.sessionInit && !this.question.id)
        heyloClient.decreaseWidth();
    },
    sendReaction(reaction) {
      var newReactionKey = db.ref(`sessions/${this.sessionId}/reactions`).push()
        .key;

      var updates = {};
      updates[newReactionKey] = {
        reaction: reaction,
        question: this.question.id,
        timestamp: +new Date(),
      };

      db.ref(`sessions/${this.sessionId}/reactions/`).update(updates);
    },
    async emojiClick(text) {
      this.sendReaction(text);
      if (this.question.id) {
        this.reactedQuestions.push(this.question.id);
        this.question.id = null;
        this.question.text = null;
        if (this.inClient) {
          heyloClient.decreaseHeight();
          if (!this.mousein) {
            await sleep(1000);
            heyloClient.decreaseWidth();
          }
        }
      }
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
#input {
  grid-area: emoji;
}
</style>
