import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html'
})
export class NabvarComponent implements OnInit {
  environment: any;
	logo: string;
	color: string;
  constructor() { }

  ngOnInit() {
    this.environment = environment.production;
		this.logo = environment.logo;
		this.color = environment.color;
  }

}
