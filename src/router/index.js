import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Ready from "../views/Ready.vue";
import Exam from "../views/Exam.vue";
import Result from "../views/Result.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/ready", name: "ready", component: Ready },
    { path: "/exam", name: "exam", component: Exam },
    { path: "/result", name: "result", component: Result },
  ],
});

export default router;