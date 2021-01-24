<template>
  <div>
    <ul>
      <li><emoji-button @click="click" imgSrc="arrows_left.svg" text="slower"></emoji-button></li>
      <li><emoji-button @click="click" imgSrc="arrows_right.svg" text="faster"></emoji-button></li>
      <li><emoji-button @click="click" imgSrc="interested.svg" text="interested"></emoji-button></li>
      <li><emoji-button @click="click" imgSrc="sleepy.svg" text="sleepy"></emoji-button></li>
      <li><emoji-button @click="click" imgSrc="confused.svg" text="confused"></emoji-button></li>
    </ul>
  </div>
</template>

<script>
import EmojiButton from "./EmojiButton.vue";
export default {
  name: "EmojiBar",
  components: {
    EmojiButton,
  },
  methods: {
    click(text) {
      this.$emit("click", text);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 40px;
  min-height: 40px;
}
li {
  padding: 0;
  list-style-type: none;
  margin: 5px;
}
</style>
