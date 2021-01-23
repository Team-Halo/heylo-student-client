<template>
  <div>
    <ul>
      <li>⏪</li>
      <li>⏩</li>
      <li>💤</li>
      <li>❓</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "EmojiBar",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
li {
  font-size: 30px;
  padding: 0;
  list-style-type: none;
  margin: 10px;
}
</style>
