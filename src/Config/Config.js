/**
* Initialize Singleton
*/
let instance = null;
export default class Config{
	constructor() {
		if (!instance) {
			let urlTkn = window.location;
			let apiUrl = null;
			if((urlTkn.hostname === 'localhost') || (urlTkn.hostname === 'desarrollo3_libro3.mesa247.pe')){
				apiUrl = 'https://restaurantes.mesa247.la/v1';
			}
			if(urlTkn.hostname === 'backuplibro.mesa247.pe'){
				apiUrl = 'https://backup.mesa247.pe/v1';
			}
			if(urlTkn.hostname === 'libro.mesa247.pe'){
				apiUrl = 'https://restaurantes.mesa247.pe/v1'
			}
			if(urlTkn.hostname === 'libro.mesa247.la'){
				apiUrl = 'https://restaurantes.mesa247.la/v1'
			}
			if(urlTkn.hostname === 'libro.mesa247.cl'){
				apiUrl = 'https://restaurantes.mesa247.cl/v1'
			}
			if(urlTkn.hostname === 'libro.mesa247.co'){
				apiUrl = 'https://restaurantes.mesa247.co/v1'
			}
			this.global = {
				API_URL : apiUrl,
				TOKEN: localStorage.getItem('tkn') ? localStorage.getItem('tkn') : 'diferencia de token',
				EXPIRES_IN: 120000,
				/**
				* Development local
				* @type {Number}
				*/
			}
			instance = this;
    }
    return instance;
  }
}
