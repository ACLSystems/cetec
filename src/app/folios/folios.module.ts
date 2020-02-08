import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FoliosRoutingModule } from './folios.routes';

import { FoliosComponent } from './folios/folios.component';
import { CreditCardPipe } from './creditcard.pipe';

@NgModule({
  declarations: [
		FoliosComponent,
		CreditCardPipe
	],
  imports: [
    CommonModule,
		FoliosRoutingModule,
		ReactiveFormsModule
  ]
})
export class FoliosModule { }
