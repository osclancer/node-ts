import Service from '../services/service';

class Controller<T = Service> {
	Service: T;

	constructor(service: T) {
		this.Service = service;
	}
}

export default Controller;
