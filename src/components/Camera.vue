<template>
  <div>
    <img alt="camera" width="80" height="80" src="../assets/camera.png" />
    <span>ON</span>
  </div>
</template>

<script>
export default {
  name: "Camera",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  display: flex;
  flex-direction: row;
  align-items: center;
}

div span {
  font-size: 40px;
  font-weight: bold;
}
</style>
