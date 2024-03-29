import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ServiceisorgService } from './../../shared/sharedservices/serviceisorg.service';
import { UserService } from './../../shared/sharedservices/user.service';
import { environment } from './../../../environments/environment';


@Component({
  selector: 'app-editcourses',
  templateUrl: './editcourses.component.html',
  providers:[UserService, ServiceisorgService]
})
export class EditcoursesComponent implements OnInit {
  loading: boolean;
  identity: any;
  public cursoslist: any[] = [];
	color:string;

  constructor(public serviceorg:ServiceisorgService, private _router:Router, private _activeRouter:ActivatedRoute, private user:UserService) {
    this.identity = this.user.getidentity();
  }

  ngOnInit() {
		this.color = environment.color;
    this.getCourses();
  }

  /*
  funcion para obtener los cursos y los vea el autor
  */
  public getCourses(){
    this.loading = true;
    this.serviceorg.getCoursesAuth().subscribe(data=>{
      this.cursoslist = [...data];
      this.loading = false;
			// console.log(this.cursoslist);
    },error=>{
      console.log(error);
    });
  }

  /*
  metodo para mostrar el temario del curso que seleccione el autor
  */
  public getCourse(courseid){
		// console.log(courseid)
    this._router.navigate(['/editor/courselessons',courseid]);
  }

  /*
  Metodo para regresar al administrador de edicion de cursos
  */
  public getEditManager(){
    this._router.navigate(['/editor/editmanager']);
  }

}
