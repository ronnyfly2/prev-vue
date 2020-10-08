<template lang="pug">
#app.container()
	router-view(v-if="activeSession" name="defaultHeader")
	router-view(name="containerBlock")
	router-view(name="footer")
</template>
<script>
import { mapState } from 'vuex';
export default {
	computed:{
		...mapState(['activeSession', 'errorToken'])
	},
	data() {
		return {

		}
	},
	beforeMount(){
		//let self = this;
		//console.log('cam1', self.$store.state.activeSession)
		//if(self.$store.state.activeSession){
			//self.init = true;
		//}
	},
	mounted(){
		//let self = this;
	},
	methods:{

	}
}
</script>
<style lang="stylus">
#app
	font-family 'Avenir', Helvetica, Arial, sans-serif
	-webkit-font-smoothing antialiased
	-moz-osx-font-smoothing grayscale
	text-align center
	color #2c3e50

#nav
	padding 30px
	a
		font-weight bold
		color #2c3e50
		&.router-link-exact-active
			color #42b983
</style>
