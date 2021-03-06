import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ServiceisorgService } from './../../shared/sharedservices/serviceisorg.service';
import { UserService } from './../../shared/sharedservices/user.service';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-courselessons',
  templateUrl: './courselessons.component.html',
  providers:[ServiceisorgService, UserService]
})
export class CourselessonsComponent implements OnInit {

loading:boolean;
loading2:boolean;
courseid;
identity;
listblock:any []=[];
course;
color:string;

constructor(private router:Router, private activatedRoute:ActivatedRoute, private user:UserService, private serviceorg:ServiceisorgService) {
  this.activatedRoute.params.subscribe(params=>{
    this.courseid = params['id'];
  });
}

ngOnInit() {
  this.identity = this.user.getidentity();
	this.color = environment.color;
  this.getListBlock();
	this.getCourse();
}

getCourse() {
	this.loading = true
  this.serviceorg.getCourse(this.courseid).subscribe(data=>{
    this.loading = false
    this.course= data.message;
  },error=>{
    console.log(error);
  });
}

/*
Meotodo para obtener el listado de los cursos
*/
public getListBlock(){
  this.loading2 = true
  this.serviceorg.getlistBlock(this.courseid).subscribe(data=>{
    this.loading2 = false
    this.listblock = data.message.blocks;
  },error=>{
    console.log(error);
  });
}

/*
Metodo para mostrar el contenido de la lección que selecciona el autor
*/
public getBlock(id){
  this.router.navigate(['/editor/courseedit',this.courseid,id]);
}

/*
Metodo para regresar a la vista de cursos al autor
*/
public returnCourses(){
  this.router.navigate(['/editor/editcourses']);
}

}
