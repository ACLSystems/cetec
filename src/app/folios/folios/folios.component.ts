import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FoliosService } from '../folios.service';

@Component({
  selector: 'app-folios',
  templateUrl: './folios.component.html',
  styleUrls: ['./folios.component.css'],
	providers: [
		FoliosService
	]
})
export class FoliosComponent implements OnInit {

	loading: boolean;
	folios = new FormControl('');
	foliosArray: string[] = [];
	foliosOK: string[] = [];
	foliosNotOK: string[] = [];
	foliosReviewed: boolean = false;
	foliosNotEntered: boolean = false;
	showingConfirm: boolean = false;
	processing: boolean = false;
	finishProcessing: boolean = false;
	error: boolean = false;
	errorMessage: string = '';
	results: any[];

  constructor(
		private foliosService: FoliosService
	) {
		this.loading = false;
	}

  ngOnInit() {
  }

	validate() {
		this.changeButtonLabel('validate','Validar');
		this.foliosReviewed = false;
		this.foliosNotEntered = false;
		this.foliosNotEntered = false;
		this.foliosOK = [];
		this.foliosNotOK = [];
		this.foliosArray = [];
		this.error = false;
		this.errorMessage = '';
		let folios = this.folios.value;
		const regx = /[\n]/g;
		const space = /[\s]/g;
		folios = folios.replace(regx,',');
		if(folios !== '') {
			folios = folios.split(',').map(e => e.replace(space,''));
			let newFolios = [];
			for(var i=0; i< folios.length; i++) {
				newFolios.push({
					num: i,
					folio: folios[i]
				});
			}
			if(folios.length > 0) {
				this.foliosOK = newFolios.filter(e => e.folio.length === 16);
				this.foliosNotOK = newFolios.filter(e => e.folio.length !== 16);
			}
			this.foliosArray = [...folios];
			if(this.foliosNotOK.length > 0) {
				this.changeButtonLabel('validate','Corregir')
			}
		} else {
			this.foliosNotEntered = true;
		}
		this.foliosReviewed = true;
		console.group('foliosArray');
		console.log(this.foliosArray);
		console.groupEnd();
	}
	preProcessFolios() {
		if(this.foliosNotOK.length > 0) {
			this.showingConfirm = true;
		} else {
			this.processFolios();
		}
	}

	cancelProcess() {
		this.showingConfirm = false;
		this.processing = false;
	}

	processFolios() {
		this.processing = true;
		console.group('Aquí andamos');
		console.groupEnd();
		this.foliosService.regFolios(this.foliosArray).subscribe(data => {
			console.group('data');
			console.log(data);
			console.groupEnd();
			if(data.results && Array.isArray(data.results) && data.results.length > 0) {
				this.results = [...data.results];
			}
			this.processing = false;
			this.finishProcessing = true;
		}, error => {
			console.group('folios');
			console.log(this.foliosOK);
			console.groupEnd();
			this.error = true;
			this.errorMessage = `${error.message} ${error.error.message}`;
		})
	}

	reset() {
		this.folios.setValue('');
		this.foliosArray			= [];
		this.foliosOK 				= [];
		this.foliosNotOK 			= [];
		this.foliosReviewed 	= false;
		this.foliosNotEntered = false;
		this.showingConfirm		= false;
		this.processing 			= false;
		this.finishProcessing = false;
		this.error 						= false;
		this.errorMessage			= '';
	}

	changeButtonLabel(id: string, label:string) {
		document.getElementById(id).innerHTML = label;
	}
}
