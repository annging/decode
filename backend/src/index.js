import { createApp } from 'vue'
import router from './router/index'
import App from './app.vue'
import './permission' // permission control

const element = document.createElement('div');
element.id = 'app';

import '@/style.css' // global css

document.body.appendChild(element);

const app = createApp(App);
app.use(router);
app.mount('#app');
