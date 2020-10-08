import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/es'
import 'element-ui/lib/theme-chalk/index.css'
import '../public/stylus/main.styl';
import router from './router'
import store from './store'
import './registerServiceWorker'

import Init from '@/Api/Init/Init';

let api = (new Init());
console.log('corrientes')
Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });

let arrayUrl = window.location.pathname.split('/');
let lastUrl = arrayUrl.pop();
var nameUrl;
let getInitPage = ()=>{
	store.dispatch('initPage', {initTkn:lastUrl})
	.then(
		(response)=>{
			localStorage.setItem('paramInit', lastUrl);
			store.dispatch('saveToken', {initTkn:localStorage.getItem('paramInit'), tkn:response.data.data.acces_token, activeSession:response.data.success});
			getLocalsRouter()
			.then(
				(res)=>{
					console.log('promesa de promesa donde inicia todo', res);
					//window.history.replaceState({}, document.title, "/");
				},(error)=>{
					console.log('promesa de promesa error donde inicia todo', error);
					store.dispatch('goError', {errorToken:error.response.data, activeSession:error.response.data.success});
					router.push('/404').catch(err => {
						console.log(err)
					});
			});
		}, (error)=>{
			console.log(error.response);
			console.log('main', error.response.data.success)
			store.dispatch('goError', {errorToken:error.response.data, activeSession:error.response.data.success, tkn:false});
			localStorage.clear();
			router.push('/404').catch(err => {
				console.log(err)
			});
		}
	);
}
let getLocalsRouter = ()=>{
	console.log('main3434')
	api.getAxiosHeader(localStorage.getItem('tkn'));
	return new Promise((resolve, reject)=>{
		store.dispatch('initLocals')
		.then((response)=>{
				let data = response.data.data;
				let dateForApiInit = response.data.time;
				let timeZone = response.data.timezone;
				if(data.book_logged_in_local !== ""){
					data.locals.map((elem, idx)=>{
						if(elem.Id === parseInt(data.book_logged_in_local, 10)){
							localStorage.localId = data.book_logged_in_local;
							localStorage.localIndex = idx;
						}
					})
				}
				let localIdReal = localStorage.localId === undefined ? data.locals[0].Id : localStorage.localId;
				let textIdDiv = document.getElementsByClassName('id_local_rest');
				let localIdxReal = localStorage.localIndex === undefined ? 0 : localStorage.localIndex;
				store.dispatch('goLocals', {localId:localIdReal, localIndex:localIdxReal, locals:data.locals});
				store.dispatch('getDates', {dateForApiInit:dateForApiInit, timeZone:timeZone});
				console.log('urls',window.location.pathname);
				if(window.location.pathname !== '/'){
					if(arrayUrl.length === 3){
						router.push('/').catch(err => {
							console.log(err)
						});
					}
				}
				resolve(response.data);
				textIdDiv[0].innerText = localStorage.localId;
			}, (error)=>{
				console.log('errorrrrr', error)
				reject(error);
			}
		);
	});
}


if(arrayUrl.length == 3){
	nameUrl = arrayUrl[1] + '/' + arrayUrl[2] + '/';
	if(nameUrl == 'v1/auth/'){
		if(lastUrl === localStorage.getItem('paramInit')){
			getLocalsRouter()
			.then(
				(res)=>{
					console.log('promesa de promesa token iguales',res);
					//window.history.replaceState({}, document.title, "/");
				},(error)=>{
					console.log('promesa de promesa error token iguales',error);
					store.dispatch('goError', {errorToken:error.response.data, activeSession:error.response.data.success});
					router.push('/404')
				}
			);
		}else{
			getInitPage();
		}
	}else{
		getLocalsRouter();
	}
}else{
	getLocalsRouter()
		.then(
			(res)=>{
			console.log('1',res);
			//window.history.replaceState({}, document.title, "/");
		},(error)=>{
			console.log('pagina diferente de auth error', error, error.response);
			store.dispatch('goError', {errorToken:error.response.data, activeSession:error.response.data.success});
			router.push('/404')
		}
	);
}
console.log('gardons', localStorage.getItem('tkn'), store)
if(localStorage.getItem('tkn')!='false'){
	store.dispatch('saveToken', {initTkn:localStorage.getItem('paramInit'), tkn:localStorage.getItem('tkn'), activeSession:true});
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
