import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import ColorPicker from '@radial-color-picker/vue-color-picker';
import '@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';

const app = createApp(App);

app.use(ColorPicker);
app.mount('#app');