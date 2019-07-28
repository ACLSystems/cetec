import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';



@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html'
})
export class PrivacyComponent implements OnInit {

	url: string;

  constructor() { }

  ngOnInit() {
		this.url = environment.urlLibreta;
  }

}
