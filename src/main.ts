import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'

const app = createApp(App)
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faHeart as fasHeart,
  faChevronLeft,
  faChevronRight,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons'

import {
  faHeart as farHeart,
  faComment,
  faPaperPlane,
  faBookmark,
} from '@fortawesome/free-regular-svg-icons'

library.add(
  fasHeart,
  farHeart,
  faChevronLeft,
  faChevronRight,
  faComment,
  faPaperPlane,
  faBookmark,
  faEllipsisH,
)

app.use(createPinia())

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
