import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoliosComponent } from './folios/folios.component';

const foliosRoutingModule : Routes = [
	{
		path: '',
		component: FoliosComponent
	}
]

@NgModule({
	imports: [
		RouterModule.forChild(foliosRoutingModule)
	],
	exports: [
		RouterModule
	]
})

export class FoliosRoutingModule {}
