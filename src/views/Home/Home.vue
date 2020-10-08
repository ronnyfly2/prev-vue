<template lang="pug">
	.home
		ReservationList(:list="reservationList" :loadingReservations="loadingReservations")
		div
			h3 {{ dateTurn }}
			h4 {{ hourTurn }}
</template>

<script>
import Init from '@/Api/Init/Init';
import ReservationList from '@/components/Aside/ReservationList'
import { setTimeout } from 'timers';
import { mapState } from 'vuex';
export default {
  name: 'Home',
  components: {
		ReservationList
	},
	data(){
		return{
			timeZone : this.$store.state.initLocalSession.dateForApiInit,
			api : (new Init()),
			reservationList:null,
			loadingReservations:true
		}
	},
	computed:{
		...mapState(['initLocalSession']),
		dateTurn(){
			let self = this;
			let dateTurn = self.$store.state.initLocalSession.dateForApiInit ? self.$store.state.initLocalSession.dateForApiInit.split(' ')[0]:0;
			return dateTurn
		},
		hourTurn(){
			let self = this;
			let hourTurn = self.$store.state.initLocalSession.dateForApiInit ? self.$store.state.initLocalSession.dateForApiInit.split(' ')[1]:1;
			return hourTurn
		}
	},
	beforeMount(){
		console.log('camffff')
	},
	mounted(){
		let self = this;
		console.log('item se mames2');
		//console.log('laura', self.$store.state.initLocalSession.dateForApiInit.split(' ')[0]);
		setTimeout(
			function(){
				if(localStorage && localStorage.localId)
					self.getReservations();
			}, 200
		)
	},
	methods:{
		getReservations(){
			let self = this;
			self.loadingReservations = true;
			self.api.getAxiosHeader(localStorage.getItem('tkn'));
			self.$store.dispatch('getReservations', {date:self.dateTurn}).then((ele)=>{
				console.log('dddd', ele.data.data.reservations)
				self.loadingReservations = false;
				self.reservationList=ele.data.data.reservations;
				console.log('sanches', self.$store.state)
			})
		}
	}
}
</script>
