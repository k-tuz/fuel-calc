import 'normalize.css'
//import 'vue-final-modal/style.css'
//import '@/assets/main.css'

import { createApp } from 'vue'
//import { createVfm } from 'vue-final-modal'
//import { createPinia } from 'pinia'
import App from '@/App.vue'

const app = createApp(App)
//const vfm = createVfm()

//app.use(createPinia())
//app.use(vfm)

app.mount('#app')
