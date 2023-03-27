import { createApp } from 'vue';
import './index.css';
import App from './App.vue';
import { ApiClientPlugin } from './services/ApiClient';
import { createPinia } from 'pinia'
import router from './router';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(ApiClientPlugin);

app.mount('#app');