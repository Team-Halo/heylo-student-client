<template>
  <div id="app" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <video hidden ref="videoInput" width="640" height="480"></video>
    <canvas id="canvasOutput"></canvas>
    <div id="grid">
      <camera id="camera" @camera="camera"/>
      <question
          id="question"
          v-if="question.id !== null"
          :questionText="question.text"
      />
      <emoji-bar id="emoji" @click="emojiClick" v-if="!sessionInit"/>
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
import {sleep} from "./utils.js";
import cvUtils from "@opencv.js/utils";

let src;
let dst;
let gray;
let cap;
let faces;
let classifier;
const FPS = 30;

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
      cameraOn: true,
    };
  },
  created() {
    window.sleepy = this.sleepy;

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
  mounted() {
    this.$loadScript("https://docs.opencv.org/master/opencv.js")
        .then(() => {
          cv.onRuntimeInitialized = () => {
            let video = this.$refs.videoInput;
            navigator.mediaDevices.getUserMedia({video: true, audio: false})
                .then((stream) => {
                  video.srcObject = stream;
                  video.play();
                })
                .catch(e => console.log("Get user media failed ", err));
            this.initializeVideo(video);

            setTimeout(this.processVideo, 0);
          };

        })
        .catch(e => {
          console.log('OpenCV Script load failed', e);
        });
  },
  methods: {
    initializeVideo(video) {
      src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
      dst = new cv.Mat(video.height, video.width, cv.CV_8UC4);
      gray = new cv.Mat();
      cap = new cv.VideoCapture(video);
      faces = new cv.RectVector();
      classifier = new cv.CascadeClassifier();
      classifier.load(require('./assets/haarcascade_frontalface_default.xml'));
    },
    processVideo() {
      try {
        if (!this.cameraOn) {
          // clean and stop.
          src.delete();
          dst.delete();
          gray.delete();
          faces.delete();
          classifier.delete();
          return;
        }
        let begin = Date.now();
        // start processing.
        cap.read(src);
        src.copyTo(dst);
        cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0);
        // detect faces.
        classifier.detectMultiScale(gray, faces, 1.1, 3, 0);
        // draw faces.
        for (let i = 0; i < faces.size(); ++i) {
          let face = faces.get(i);
          let point1 = new cv.Point(face.x, face.y);
          let point2 = new cv.Point(face.x + face.width, face.y + face.height);
          cv.rectangle(dst, point1, point2, [255, 0, 0, 255]);
        }
        cv.imshow('canvasOutput', dst);
        // schedule the next one.
        let delay = 1000 / FPS - (Date.now() - begin);
        setTimeout(this.processVideo, delay);
      } catch (err) {
        cvUtils.printError(err);
      }
    }
    ,
    camera(on) {
      this.cameraOn = on;
      this.initializeVideo(this.$refs.video);
      setTimeout(this.processVideo, 0);
    }
    ,
    sleepy() {
      this.prompt("You look sleepy today!");
    }
    ,
    frowning() {
      this.prompt("Finding it hard to catch up? Tell the teacher!");
    }
    ,
    happy() {
      this.prompt("Enjoying the lesson? Give some feedback!");
    }
    ,
    async prompt(text) {
      if (this.sessionInit) return;
      if (this.question.id !== null) return;
      this.question.id = 0;
      this.question.text = text;
      if (this.inClient) {
        heyloClient.increaseWidth();
        await sleep(1000);
        heyloClient.increaseHeight();
      }
      setTimeout(
          async (id) => {
            if (this.question.id === id) {
              sendReaction("sleepy");
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
          0
      );
    }
    ,
    connect(sessionId) {
      this.sessionId = sessionId;
      this.sessionInit = false;
      this.sendReaction("connect");
      var questionRef = db.ref("sessions/" + this.sessionId + "/questions");
      questionRef.on("value", (snapshot) => {
        const data = snapshot.val();
        this.onQuestionUpdate(data);
      });
    }
    ,
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
    }
    ,
    mouseenter() {
      this.mousein = true;
      if (this.inClient && !this.sessionInit && this.question.id === null)
        heyloClient.increaseWidth();
    }
    ,
    mouseleave() {
      this.mousein = false;
      if (this.inClient && !this.sessionInit && this.question.id === null)
        heyloClient.decreaseWidth();
    }
    ,
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
    }
    ,
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
    }
    ,
  },
}
;
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
