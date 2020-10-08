import Api from '@/Api/Api';

/*
 * Clase para peticiciones HTTP AJAX
 * Peticiones que trae y guarda reservas.
 */
export default class Reservations extends Api {
	// Trae reservas por fecha (dia).
	getReservationForDate(callback, params, onError){
		let service = '/locals/'+ localStorage.localId + '/reservations';
		this.get(service,callback, params,onError);
	}
}
