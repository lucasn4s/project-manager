import { createApp } from 'vue'
import './style.css'
import './variables.css'
import App from './App.vue'
import router from './router';
import { configure, defineRule } from 'vee-validate';
import { required } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import minWords from './utils/validators/minWords';
import beforeDate from './utils/validators/beforeDate';
import afterDate from './utils/validators/afterDate';
import VueTheMask from 'vue-the-mask';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

defineRule('minWords', minWords);
defineRule('required', required);
defineRule('after_date', afterDate);
defineRule('before_date', beforeDate);

configure({
    generateMessage: localize('pt_BR', {
        messages: {
            required: 'Este campo é obrigatório',
        },
    }),
})

app.use(pinia);
app.use(router);
app.use(VueTheMask);
app.mount('#app');
