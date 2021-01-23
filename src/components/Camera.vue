<template>
  <div>
    <!-- <web-cam /> -->
    <div>
      <button class="icon-button" v-on:click="isCameraOn = !isCameraOn">
        <img alt="camera" width="80" height="80" src="../assets/camera.png" />
        <span>{{ isCameraOn ? "On" : "Off" }}</span>
      </button>
    </div>
  </div>
</template>

<script>
// import { WebCam } from "vue-web-cam";

export default {
  name: "Camera",
  components: {
    // WebCam,
  },
  data() {
    return {
      isCameraOn: false,
    };
  },
  methods: {},
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
  border-radius: 5px;
}

.icon-button:hover {
  background-color: lightgray;
}

div span {
  font-size: 40px;
  font-weight: bold;
}
</style>
