import "./styles/main.scss"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import useStore from "./stores/main"

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount("#app")

const store = useStore();

const currentLang = localStorage.getItem("lang");

if(store.supportedLanguages.includes(currentLang)){
    store.language = currentLang;
}
else{
    store.language = "en";
}
