import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Loader from './components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
import currencyFilter from './filters/currency.filter'
import dateFilter from './filters/date.filter'
import tooltipDirective from './directives/tooltip.directive'
import MessagePlugin from './message-plugin'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(MessagePlugin)
Vue.use(Vuelidate)

Vue.component('paginate', Paginate)
Vue.component('loader', Loader)
Vue.filter('currency', currencyFilter)
Vue.filter('date', dateFilter)
Vue.directive('tooltip', tooltipDirective)

firebase.initializeApp({
  apiKey: "AIzaSyDEWIR1s3jztwZ3qBh83IjmNWOFRZT-qRA",
  authDomain: "vue-practice-prep.firebaseapp.com",
  databaseURL: "https://vue-practice-prep.firebaseio.com",
  projectId: "vue-practice-prep",
  storageBucket: "vue-practice-prep.appspot.com",
  messagingSenderId: "1035475313725"
})

firebase.auth().onAuthStateChanged(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
