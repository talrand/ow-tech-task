import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { RouteNames } from './RouteNames';

/** Define app routes. Use lazy loading to only load view components when needed */
const routes :RouteRecordRaw[] = [
    {
        path: '/',
        name: RouteNames.TitlesList,
        component: () => import('../views/TitlesListView.vue'),
    },
    {
        path: '/details/:titleId',
        props: true,
        name: RouteNames.TitleDetails,
        component: () => import('../views/TitleDetailsView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    /* Scrolls the user to the top of the screen when navigating to a new page/route
     * If a saved position is found (when the user uses browser nav) take them back to that position */
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    },
});

export default router;