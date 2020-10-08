import Reservations from '@/Api/Reservations/ReservationApi';
let api = (new Reservations());
export default {
  //namespaced: true,
  state: {
		messages:[],
		reservations:null
  },
  mutations: {
    setReservations(state, payload){
			//state.messages = payload.messages;
			state.reservations = payload.reservations;
		},
		setMessages(state, payload){
			state.messages = payload.messages;
		}
  },
  actions: {
    getReservations({commit}, payload){
			console.log('commit2', commit)
			return new Promise(function(resolve, reject){
				console.log('traer en reservas');
				api.getReservationForDate((res)=>{
					console.log('traer en reservas unable');
					resolve(res);
				}, payload, (error)=>{
					reject(error);
				});
			})
		},
		goReservationsForDate({commit}, payload){
			commit('setReservations', {messages:payload.messages, reservations:payload.reservations});
		},
  },
  getters: {

  }
}
