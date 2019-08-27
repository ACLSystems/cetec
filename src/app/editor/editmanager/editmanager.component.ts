import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../shared/sharedservices/user.service';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-editmanager',
  templateUrl: './editmanager.component.html',
  providers:[UserService]
})
export class EditmanagerComponent implements OnInit {
  identity;
	color:string;
  constructor(private user:UserService, private _router:Router) {
    this.identity = this.user.getidentity();
  }

  ngOnInit() {
		this.color = environment.color;
  }

  /*
  metodo para redireccionar a la vista de edicion de cursos
  */
  getEditCourses(){
    this._router.navigate(['/editor/editcourses']);
  }

  /*
  metodo para redireccionar a la vista de edicion de cursos
  */
  getnewCourses(){
    this._router.navigate(['/editor/newcourse']);
  }

  /*
  metodo para redireccionar a la vista de edicion de cursos
  */
  getnewBlocks(){
    this._router.navigate(['/editor/newblock']);
  }

}
