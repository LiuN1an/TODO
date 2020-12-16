import { createApp } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import App from "./App.vue";
import "./index.css";
// TODO 初始化
const routes = [];
const history = createMemoryHistory();
const router = createRouter({ history, routes });
createApp(App).mount("#app");
