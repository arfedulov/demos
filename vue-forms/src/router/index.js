import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../views/MainPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainPage,
    },
    {
      path: "/registration-form",
      name: "registration",
      component: () => import("../views/RegistrationForm.vue"),
    },
    {
      path: "/search-form",
      name: "search",
      component: () => import("../views/SearchForm.vue"),
    },
  ],
});

export default router;
