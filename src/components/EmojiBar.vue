<template>
  <div>
    <ul>
      <li><emoji-button text="⏪"></emoji-button></li>
      <li><emoji-button text="⏩"></emoji-button></li>
      <li><emoji-button text="💤"></emoji-button></li>
      <li><emoji-button text="❓"></emoji-button></li>
      <li><emoji-button text="👍"></emoji-button></li>
      <li><emoji-button text="❌"></emoji-button></li>
      <li><emoji-button text="✔"></emoji-button></li>
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
  height: 70px;
  min-height: 70px;
}
li {
  padding: 0;
  list-style-type: none;
}
</style>
