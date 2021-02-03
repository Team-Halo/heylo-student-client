import Vue from "vue";
import App from "./App.vue";
import VueMaterial from 'vue-material'
import WebCam from "vue-web-cam"
import LoadScript from 'vue-plugin-load-script'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'


Vue.use(VueMaterial)
Vue.use(WebCam);
Vue.use(LoadScript);

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
}).$mount("#app");
