<template>
  <div>
    <button class="icon-button" v-on:click="click">
      <img alt="camera" width="60" height="60" src="../assets/camera.png"/>
      <span>{{ isCameraOn ? "On" : "Off" }}</span>
    </button>
  </div>
</template>

<script>

export default {
  name: "Camera",
  components: {},
  data() {
    return {
      isCameraOn: true,
    };
  },
  methods: {
    click() {
      this.isCameraOn = !this.isCameraOn;
      this.$emit('camera', this.isCameraOn);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 0px solid transparent;
  outline: none;
  background-color: white;
  transition: background-color 0.5s;
  height: 100%;
  width: 120px;
}

.icon-button:hover {
  background-color: lightgray;
}

div span {
  font-size: 30px;
  font-weight: bold;
}
</style>
