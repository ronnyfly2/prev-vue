<template lang="pug">
	header
		.box_center
			img.logo(src="@/assets/mesa247la-logo.png")
			router-link(to="/") Home |
			router-link(to="/about") About
			i.icon-favorito

</template>
<script>
export default {
	props:['headerAdmin'],
	data () {
		return {
			loading: false,
		}
	},
	mounted(){
		window.setInterval(function () {
      this.setCompareIds()
		}.bind(this), 6000);
	},
	methods: {
		setCompareIds(){
			console.log('Checando id')
			let textIdDiv = document.getElementsByClassName('id_local_rest');
			if(localStorage.localId){
				if(textIdDiv[0].innerText !== localStorage.localId){
					window.location.reload();
				}
			}
		}
	}
}
</script>
