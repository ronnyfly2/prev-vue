<template lang="pug">
	.load_page
		.error(v-if="!activeSession")
			p {{ errorToken && errorToken.message ? errorToken.message : errorToken }}
			p {{ 'Debe de inicial sesion nuevamente' }}
		.error(v-else)
			p probando
</template>
<script>
import { mapState } from 'vuex';
export default {
	name:'page',
	computed:{
		...mapState(['activeSession', 'errorToken'])
	},
	mounted(){
		if(this.$store.state.errorToken && (this.$store.state.errorToken.message === 'Unauthenticated.')){
			localStorage.clear();
		}
	}
}
</script>
