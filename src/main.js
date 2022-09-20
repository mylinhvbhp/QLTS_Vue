import { createApp } from 'vue'
import App from './App.vue'
import MSCombobox from './components/base/BaseCombobox.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AssetPage from './components/page/asset/AssetPage.vue';
import UUID from 'vue-uuid'

// Khai báo
const routes = [
    {path:"/", component: AssetPage},
    {path:"/assets", component: AssetPage}
]

//Khởi tạo
const vueRouter = createRouter({
    history: createWebHistory(),
    routes: routes
})

//Sử dụng
const app = createApp(App);

app.component("msCombobox", MSCombobox)
app.use(vueRouter).mount('#app')
app.use(UUID)