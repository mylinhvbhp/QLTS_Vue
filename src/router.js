import { createRouter, createWebHistory } from 'vue-router'

import AssetPage from '@/components/page/asset/AssetPage.vue'

const routes = [
    {
        path: '/',
        component: AssetPage
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router