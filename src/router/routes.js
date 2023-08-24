const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        name: "FeedbackPage",
        path: "contact",
        component: () => import("pages/FeedbackPage.vue"),
      },
      {
        name: "SessionCreate",
        path: "session-create",
        component: () => import("pages/SessionCreate.vue"),
      },
      {
        name: "SessionActionPage",
        path: "session-action/:sessionUrl",
        component: () => import("pages/SessionActionPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
