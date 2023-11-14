
const routes = [
  {
    path: '/',
    // component: () => import('layouts/MainLayout.vue'),
    component: () => import('layouts/MasterLayout.vue'),
    children: [
      // { path: '', component: () => import('pages/IndexPage.vue') }
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: '/:id', component: () => import('pages/HomePage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
