import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from './../../environments/environment';

@Injectable()
export class FoliosService {
	public url: string;
	public token: any;

	constructor(
		private http: HttpClient
	) {
		this.url = environment.url;
		this.getToken();
	}

	getToken() {
		const token = localStorage.getItem('token');
		if (token !== 'undefined') {
			this.token = token;
		} else {
			this.token = null;
		}
		return this.token;
	}

	regFolios(folios: string[]):Observable<any>{
		let params = JSON.stringify(folios);
		let headers = new HttpHeaders(
			{
				'Content-Type':'application/json',
				'Authorization': 'Bearer ' + this.token
			}
		);
		return this.http.patch(this.url+'api/v1/requester/folio', params, {headers});
	}
}
