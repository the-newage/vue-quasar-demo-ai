import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('@/pages/IndexPage.vue') },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/pages/ProfilePage.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/LoginPage.vue'),
  },

  {
    path: '/posts',
    component: () => import('@/layouts/PostsLayout.vue'),
    children: [
      {
        path: '',
        name: 'posts',
        component: () => import('@/pages/posts/PostsPage.vue'),
      },
      {
        path: 'create',
        name: 'createPost',
        component: () => import('@/pages/posts/CreatePostPage.vue'),
      },
      {
        path: ':id',
        name: 'postDetails',
        component: () => import('@/pages/posts/PostDetailsPage.vue'),
      },
      {
        path: ':id/edit',
        name: 'editPost',
        component: () => import('@/pages/posts/EditPostPage.vue'),
      },
      {
        path: ':id/comments',
        name: 'postComments',
        component: () => import('@/pages/posts/PostCommentsPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
];

export default routes;
