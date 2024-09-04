import Vue from "vue";
import App from "./App.vue";
import store from "./store/store.js";
import "./style.css";

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
