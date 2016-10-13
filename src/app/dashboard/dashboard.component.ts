import { Component, OnInit, NgZone } from '@angular/core';
import {ResizeEvent} from 'angular2-resizable';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  	title = 'Bulki';
  	height;
  	width;
  	openLeft;
  	openRight;
  	bottomHeight;
 	styleBottom; 
	styleTop;
  constructor(ngZone:NgZone) {
  	 this.width = window.innerWidth;
     this.height = window.innerHeight;

     this.openLeft =  this.width >= 992 ? 20 : 10;
     this.openRight =  this.width >= 992 ? 30 : 10;
     this.styleBottom = {height: (this.height - 50 ) / 2 + 'px'};
   	 this.styleTop  = {height: (this.height - 50 ) / 2 +'px'};

	  window.onresize = (e) =>
	  {
	      ngZone.run(() => {
	          this.width = window.innerWidth;
	          this.height = window.innerHeight;
	          this.openLeft =  this.width >= 992 ? 20 : 10;
	          this.openRight =  this.width >= 992 ? 30 : 10;
	          this.styleTop = {height: '50%' }; 
	          this.styleBottom = {height: '50%' };     
	      });
	  };
  }
  ngOnInit(){}
  toggleLeft(){
  	this.openLeft = this.openLeft == 10 ? 20 : 10;
  }
  toggleRight(){
  	this.openRight = this.openRight == 10 ? 30 : 10;
  }
  onResizeEnd(event: ResizeEvent): void {
 
    this.styleBottom =  {height: `${event.rectangle.height+'px'}`};
    var newtopheight = this.height - 50 - event.rectangle.height +'px';
    this.styleTop = {height: `${newtopheight}`};    
  }

}






