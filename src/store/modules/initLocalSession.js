import Init from '@/Api/Init/Init';
let api = (new Init());
export default {
  //namespaced: true,
  state: {
    allDataLocals:null,
		localId:null,
		localIndex:null,
		locals:[],
		dateForApiInit:null,
		timeZone:null
  },
  mutations: {
    setLocals(state, payload){
			state.localId = payload.localId;
			state.localIndex = payload.localIndex;
			state.locals = payload.locals;
			console.log('localsss', payload)
		},
		setDatesAndTimes(state, payload){
			state.dateForApiInit = payload.dateForApiInit;
			state.timeZone = payload.timeZone;
		}
  },
  actions: {
    initLocals(){
			return new Promise((resolve, reject)=>{
				console.log('esperando locals')
				api.getLocals((res)=>{
					resolve(res);
				}, null, (error)=>{
					reject(error);
				});
			})
		},
		goLocals({commit}, payload){
			commit('setLocals', {localId:payload.localId, localIndex:payload.localIndex, locals:payload.locals});
		},
		getDates({commit}, payload){
			commit('setDatesAndTimes', {dateForApiInit:payload.dateForApiInit, timeZone:payload.timeZone});
		}
  },
  getters: {

  }
}
