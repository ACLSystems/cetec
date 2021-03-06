import * as $ from 'jquery';
import { CalendarComponent } from 'ng-fullcalendar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from './../../shared/sharedservices/course.service';
import { DatePipe } from '@angular/common';
import { EventService } from './../event.service';
import { Options } from 'fullcalendar';
import { Router } from '@angular/router';
import { UserService } from './../../shared/sharedservices/user.service';
import { environment } from './../../../environments/environment';



@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  providers: [UserService,CourseService, DatePipe, EventService]
})
export class ScheduleComponent implements OnInit {
	identity: any;
	token: any;
  loading: boolean;
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  data: any[] = [];
  colorevents: any[] = environment.colorEvents;

  constructor(private userService: UserService, private datePipe: DatePipe, private eventService: EventService, private router: Router) {
		this.token = this.userService.getToken();
    this.identity = this.userService.getidentity();
  }

  ngOnInit() {
		if(this.token === null && this.identity === null) {
			this.router.navigate(['/home']);
		} else {
    	this.loadEvents();
		}
  }

  loadEvents(){

    this.loading = true;
    this.eventService.getEventSchedule().subscribe(res => {
      for (const id of res.message.groups){
        this.data.push({
          title: 'curso: ' + id.name,
          start: this.datePipe.transform(id.beginDate, 'yyyy-MM-dd'),
          end: this.datePipe.transform(id.endDate, 'yyyy-MM-dd'),
          //color: this.colorevents[Math.floor(Math.random() * this.colorevents.length)],
					color: environment.eventColor,
					textColor: environment.textColor
        });
      }
      this.calendarOptions = {
        locale: 'es',
        height: 700,
        editable: true,
        eventLimit: false,
				header: {
          //left: 'month,week,day,list',
					left: 'month,list',
          center: 'title',
          right: 'prev,today,next'
        },
				buttonText: {
					today: 'Hoy',
					month: 'Mes',
					week: 'Semana',
					day: 'Día',
					list: 'Lista'
				},
				noEventsMessage: 'No hay eventos para esta fecha',
				allDayText: 'todo el día',
        selectable: true,
        events: this.data
      };
      this.loading = false;
    });
  }

}
