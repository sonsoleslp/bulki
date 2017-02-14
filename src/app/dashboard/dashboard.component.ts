import { Component, OnInit, NgZone, Output, OnChanges, SimpleChange } from '@angular/core';
import {ResizeEvent} from 'angular2-resizable';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Datafile } from './../datafile';
import { DatafilesService } from './../datafiles.service';
import { DatachoiceService } from './../datachoice.service';

var d3 = require('d3')

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatafilesService, DatachoiceService]
})
export class DashboardComponent implements OnInit, OnChanges {
	title = 'Bulki';
	height;
	width;
	openLeft;
	openRight;
	bottomHeight;
 	styleBottom; 
	styleTop;

  sub;
  @Output() data;
  file;
  constructor(ngZone:NgZone, private dfs: DatafilesService, private dcs: DatachoiceService, private route: ActivatedRoute) {
  	 this.width = window.innerWidth;
     this.height = window.innerHeight;

     this.openLeft =  this.width >= 992 ? 20 : 10;
     this.openRight =  this.width >= 992 ? 30 : 10;
     this.styleBottom = {height: (this.height - 50 ) / 2 + 'px'};
   	 this.styleTop  = {height: (this.height - 50 ) / 2 +'px'};

  	  window.onresize = (e) => {
  	 
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

  type(d) {
     d.value = +d.value; // coerce to number
     return d;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.dfs.getFile(id)
        .then(file =>{
         this.file = file
          var regexp =/.*\.(.*)$/g;
          var extension = null;
          if (this.file && this.file.name){
            extension = regexp.exec(this.file.name);
            extension = extension && extension.length > 1 ? extension[1] : null
            if (extension != null) {
               switch(extension){
                case 'tsv':
                  d3.tsv(this.file.route, this.type, function(error, data) {
                    this.data = data;
                   }.bind(this));
                  break; 
                case 'csv':
                  d3.csv(this.file.route, this.type, function(error, data) {
                    this.data = data;
                   }.bind(this)); 
                  break; 
                case 'json':
                  d3.json(this.file.route, this.type, function(error, data) {
                    this.data = data;
                   }.bind(this)); 
                  break; 
                case 'xml':
                  d3.xml(this.file.route, this.type, function(error, data) {
                    this.data = data;
                   }.bind(this)); 
                  break; 
                default:
                  alert("File is corrupt or format not accepted")
              }
              
            }       
          }


        });
        
    });
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
     for (let propName in changes) {
      let changedProp = changes[propName];
       if (propName == 'data') {
        this.data = changedProp.currentValue;
      }
     }
   }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

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






