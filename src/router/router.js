import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes: [
        {
            path: '/',
            component: () => import('../pages/CreateProduct.vue'),
        },
        {
            path: '/products',
            component: () => import('../pages/Products.vue'),
        },
    ],
})
