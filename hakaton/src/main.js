import "./styles/main.scss"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import useStore from "./stores/main"
import FlagIcon from 'vue-flag-icon'
import Toast, { POSITION } from "vue-toastification";


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(FlagIcon);
app.use(Toast, {
    timeout: 5000,
    position: POSITION.BOTTOM_RIGHT,
    hideProgressBar: true,
    maxToasts: 5,
    transition: "Vue-Toastification__fade",
    closeButtonClassName: "toast-close-icon"
})

app.mount("#app")

const store = useStore();

const currentLang = localStorage.getItem("lang");

if(store.supportedLanguages.includes(currentLang)){
    store.language = currentLang;
}
else{
    store.language = "sr";
}

const currentProgress = localStorage.getItem("progress")

if(currentProgress){
    store.progress = JSON.parse(currentProgress);
}
else{
    store.language = "sr";
}
