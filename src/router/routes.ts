import type { RouteRecordRaw } from 'vue-router';

// Add type safety for route meta
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
    title?: string;
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/pages/IndexPage.vue'),
        meta: { title: 'Home' },
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/pages/ProfilePage.vue'),
        meta: { requiresAuth: true, title: 'Profile' },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('@/pages/LoginPage.vue'),
        meta: { title: 'Login' },
      },
    ],
  },

  {
    path: '/posts',
    component: () => import('@/layouts/PostsLayout.vue'),
    meta: { title: 'Posts' }, // Parent route meta
    children: [
      {
        path: '',
        name: 'posts',
        component: () => import('@/pages/posts/PostsPage.vue'),
        meta: { title: 'All Posts' },
      },
      {
        path: 'create',
        name: 'createPost',
        component: () => import('@/pages/posts/CreatePostPage.vue'),
        meta: { requiresAuth: true, title: 'Create Post' },
      },
      {
        path: ':id',
        name: 'postDetails',
        component: () => import('@/pages/posts/PostDetailsPage.vue'),
        // Title can be set dynamically in the component
        meta: { title: 'Post Details' },
      },
      {
        path: ':id/edit',
        name: 'editPost',
        component: () => import('@/pages/posts/EditPostPage.vue'),
        meta: { requiresAuth: true, title: 'Edit Post' },
      },
      {
        path: ':id/comments',
        name: 'postComments',
        component: () => import('@/pages/posts/PostCommentsPage.vue'),
        meta: { title: 'Post Comments' },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue'),
    meta: { title: 'Page Not Found' },
  },
];

export default routes;
