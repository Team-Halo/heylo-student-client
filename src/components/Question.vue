<template>
  <div>
    <b>{{ questionText }}</b>
  </div>
</template>

<script>
export default {
  name: "Question",
  props: {
    questionText: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  overflow-wrap: break-word;
  font-size: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
