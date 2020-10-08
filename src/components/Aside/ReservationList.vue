<template lang="pug">
	aside
		ul(v-if="list && list.length>0")
			li(v-for="(item,key) in list" :key="key")
				span {{item.Titulo}}
				ul(v-if="item")
					li(v-for="(itemHour, idx) in item.Reservas" :key="idx")
						b {{itemHour.Titulo}}
						ul(v-if="itemHour && itemHour.Reservas")
							li(v-for="(reserves, inxd) in itemHour.Reservas" :key="inxd")
								span {{reserves.NombreUsuarioReserva}}
		div(v-else-if="loadingReservations") Buscando reservas
		div(v-else) No tenemos reservas
</template>
<script>
export default {
	name:'ReservationList',
	props:{
		list:null,
		loadingReservations:null
	},
	data(){
		return{
			loading:false,
			listaReservas:this.list,
		}
	},
	mounted(){
		console.log('log', this.listaReservas)
	}
}
</script>
