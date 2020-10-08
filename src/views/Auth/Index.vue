<template lang="pug">
	.load
		span parametro: {{ $route.params.id }}
		p session: {{ $store.state.errorToken }} ---- {{ errorGetToken }}
		p token: {{ $store.state.tkn }}
		a(@click="initDemo") Aqui click
</template>
<script>
//import { mapState } from 'vuex';
export default {
	name: 'auth',
	data(){
		let params= (this.$route.params && this.$route.params.id)? this.$route.params.id : 0;
		return {
			params: params,
			otherParam:null,
			errorGetToken:null,
			tkn: null
		}
	},
	created(){
		this.getInitPage();
		console.log('item no mames');
	},
	mounted(){
		//console.log('compro',this.$store.state.errorToken);
	},
	methods:{
		getInitPage(){
			let self = this;
			if(localStorage.getItem('tkn')){
				if(self.params === localStorage.getItem('paramInit')){
					console.log('noseas')
					self.$store.dispatch('saveToken', {initTkn:localStorage.getItem('paramInit'), tkn:self.$store.state.tkn, activeSession:true});
				}
			}
		},
		initDemo(){
			let self = this;
			self.$store.dispatch('initPage', {initTkn:self.params});
		}
	}
}
</script>

