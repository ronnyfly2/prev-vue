import Vue from 'vue'
import Vuex from 'vuex'

import Init from '@/Api/Init/Init';
import initLocalSession from '@/store/modules/initLocalSession';
import getReservationsForDate from '@/store/modules/getReservationsForDate';

Vue.use(Vuex)
let api = (new Init());

export default new Vuex.Store({
  state: {
		initTkn: null,
		tkn: null,
		activeSession: false,
		errorToken: null,
  },
  mutations: {
		setToken(state, payload){
			console.log('tierra',payload)
			console.log('tierra2',state)
			state.tkn = payload.tkn;
			state.initTkn = payload.initTkn;
			localStorage.setItem('tkn', payload.tkn);
			state.activeSession = payload.activeSession;
			localStorage.setItem('activeSession', payload.activeSession);
		},
		setErrorToken(state, payload){
			console.log('tierra3',payload)
			console.log('tierra4',state)
			state.errorToken = payload.errorToken;
			state.activeSession = payload.activeSession;
			localStorage.setItem('tkn', payload.tkn);
			localStorage.setItem('activeSession', payload.activeSession);
		},
		setLocals(state, payload){
			state.localId = payload.localId;
			state.locals = payload.locals;
		}
  },
  actions: {
		initPage({commit}, payload){
			console.log('commit', commit)
			return new Promise((resolve, reject)=>{
				api.getLoginInit((res)=>{
					resolve(res);
				},payload.initTkn, (error)=>{
					reject(error);
				});
			})
		},
		goError({commit}, payload){
			console.log('pay', payload)
			commit('setErrorToken', {errorToken:payload.errorToken, activeSession:payload.activeSession, tkn:false});
		},
		saveToken({commit}, payload){
			console.log('acentos', payload.activeSession)
			commit('setToken', { initTkn:payload.initTkn, tkn: payload.tkn, activeSession: payload.activeSession });
		}
	},
	getters:{

	},
	modules: {
		initLocalSession,
		getReservationsForDate
  }
})
