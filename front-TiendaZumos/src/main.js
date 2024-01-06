import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from './plugins/font-awesome';
import { createPinia } from 'pinia';
import vuetify from './plugins/vuetify';

createApp(App)
  .use(router)
  .use(createPinia())
  .use(vuetify)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
