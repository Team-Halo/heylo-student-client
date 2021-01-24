export default {
  questions: ["Click something!", "Give me some response!"],
  randomQuestion() {
    return this.questions[Math.floor(Math.random() * this.questions.length)];
  },
};
