<template>
  <div class="outer">
    <div class="inner">
      <b>{{ questionText }}</b>
    </div>
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
.outer {
  overflow-wrap: break-word;
  font-size: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  position: relative;
  height: 100%;
}
.inner {
  margin: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>
