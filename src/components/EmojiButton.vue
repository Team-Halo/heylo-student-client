<template>
  <div>
    <button :class="bounce ? 'bounce' : null" @click="click">
      <img :src="imgSrc" :alt="text" />
    </button>
  </div>
</template>

<script>
export default {
  name: "EmojiButton",
  props: {
    imgSrc: String,
    text: String,
  },
  data() {
    return {
      bounce: false,
    };
  },
  methods: {
    click() {
      this.bounce = true;
      setTimeout(() => (this.bounce = false), 1100);

      this.$emit("click", this.text);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  100% {
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: scale(1.2) translate3d(0, 0, 0);
  }
  40%,
  43% {
    transition-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: scale(1.2) translate3d(0, -30px, 0);
  }
  70% {
    transition-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: scale(1.2) translate3d(0, -15px, 0);
  }
  90% {
    transform: scale(1.2) translate3d(0, -4px, 0);
  }
}
button {
  font-size: 20px;
  background: white;
  transition: transform 0.5s;
  border: 0px solid transparent;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  vertical-align: center;
  outline: none;
}

.bounce {
  animation-name: bounce;
  transform-origin: center center;
  animation-duration: 1s;
  animation-fill-mode: both;
}

button:hover {
  transform: scale(1.2);
}
</style>
