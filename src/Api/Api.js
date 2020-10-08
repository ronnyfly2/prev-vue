import axios from "axios";
//import axiosRetry from './node_modules/axios-retry';
import Config from '@/Config/Config';
//axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay },()=>{
//	console.log('object')
//});

/*
 * Clase para manejar las peticiciones HTTP AJAX
 * get post put patch delete
 */
console.log('items')
export default class Api {
  constructor() {
		let config = (new Config());
		axios.defaults.baseURL = config.global.API_URL;
		//-axios.defaults.withCredentials = false;
		//this.getAxiosHeader(JSON.parse(localStorage.getItem('tkn')));
		//axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('tkn'));
		//console.log('se construye 22', JSON.parse(localStorage.getItem('tkn')))
	}
	getAxiosHeader(token) {
		// Agrega el token en la cabecera
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }
	waitForResetApis(){
		let timeSet;
		if(navigator.onLine) {
			console.log('// el navegador está conectado a la red')
		} else {
			console.log('// el navegador NO está conectado a la red')
		}
		window.onload = resetTimer;
		document.onmousemove = resetTimer;
		document.onkeypress = resetTimer;
		navigator.onLine = resetTimer;
		function resetTimer() {
			clearTimeout(timeSet);
			//timeSet = setTimeout(self.reloadPAgeApis, 1000)
			// 1000 milisec = 1 sec
		}
	}
  get(service, callback, params, onError){
    axios.get(service, {params}).then(res =>{
      callback(res);
    }).catch( (error) => {
			onError(error);
    });
  }
  delete(service, callback, params, onError){
    axios.delete(service, {params}).then(res =>{
      callback(res);
    }).catch( (error) => {
      onError(error);
    });
  }
  post(service, callback, params,onError){
    axios.post(service, params).then(res =>{
      callback(res);
    }).catch( (error) => {
			onError(error);
    });
  }
  put(service, callback, params,onError){
    axios.put(service, params).then(res =>{
      callback(res);
    }).catch( (error) => {
			onError(error);
    });
	}
	patch(service, callback, params,onError){
    axios.patch(service, params).then(res =>{
      callback(res);
    }).catch( (error) => {
			onError(error);
    });
  }
}
