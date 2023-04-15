
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Password from 'primevue/password'
import InputText from 'primevue/inputtext'
import InputSwitch from 'primevue/inputswitch'
import SelectButton from 'primevue/selectbutton'
import Checkbox from 'primevue/checkbox'
import Dropdown from 'primevue/dropdown'
import Textarea from 'primevue/textarea'
import Editor from 'primevue/editor';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Calendar from 'primevue/calendar';
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import ScrollPanel from 'primevue/scrollpanel';
import ToggleButton from 'primevue/togglebutton';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import MultiSelect from 'primevue/multiselect';
import Dialog from 'primevue/dialog';
import 'primeicons/primeicons.css'

import { Splide, SplideSlide } from '@splidejs/vue-splide';

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(PrimeVue, {
        ripple: true,
        locale:{
            firstDayOfWeek: 1,
            dateFormat: 'dd/mm/yy',
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['ВС','ПН','ВТ','СР','ЧТ','ПТ','СБ'],
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        }
    })
    nuxtApp.vueApp.use(ToastService)
    nuxtApp.vueApp.component('Button', Button)
    nuxtApp.vueApp.component('Password', Password)
    nuxtApp.vueApp.component('InputText', InputText)
    nuxtApp.vueApp.component('Checkbox', Checkbox)
    nuxtApp.vueApp.component('Toast', Toast)
    nuxtApp.vueApp.component('InputSwitch', InputSwitch)
    nuxtApp.vueApp.component('SelectButton', SelectButton)
    nuxtApp.vueApp.component('Dropdown', Dropdown)
    nuxtApp.vueApp.component('Textarea', Textarea)
    nuxtApp.vueApp.component('Editor', Editor)
    nuxtApp.vueApp.component('Accordion', Accordion)
    nuxtApp.vueApp.component('AccordionTab', AccordionTab)
    nuxtApp.vueApp.component('Calendar', Calendar)
    nuxtApp.vueApp.component('ScrollPanel', ScrollPanel)
    nuxtApp.vueApp.component('Splide', Splide)
    nuxtApp.vueApp.component('SplideSlide', SplideSlide)
    nuxtApp.vueApp.component('ToggleButton', ToggleButton)
    nuxtApp.vueApp.component('Card', Card)
    nuxtApp.vueApp.component('Column', Column)
    nuxtApp.vueApp.component('DataTable', DataTable)
    nuxtApp.vueApp.component('Tag', Tag)
    nuxtApp.vueApp.component('MultiSelect', MultiSelect)
    nuxtApp.vueApp.component('Dialog', Dialog)




    return {
        provide: {
            toast: nuxtApp.vueApp.config.globalProperties.$toast
        }
    }
})