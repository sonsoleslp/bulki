import { Component, OnInit, OnDestroy,  ElementRef, SimpleChange } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Datafile } from './../datafile';
import { DatafilesService } from './../datafiles.service';

var d3 = require('d3')

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
  providers: [DatafilesService]
})
export class CanvasComponent implements OnInit {


  file: Datafile;
  sub: any;
  data;
  options;
  private divs: any;
  host;
  svg;
  constructor( private dfs: DatafilesService, private route: ActivatedRoute, elementRef: ElementRef) {
     // let el: any    = elementRef.nativeElement;  // reference to <bar-graph> element from the main template
     // this.host = d3.select('#thechart');
    
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.dfs.getFile(id)
        .then(file => this.file = file);
        console.log(this.file)
        console.log(d3)
        this.svg = d3.select('#thechart').append('svg');
        this.svg.attr('width',600).attr('height',300);
        var y = d3.scaleLinear().domain([15,90]).range([250,0]);
        var x = d3.scaleLog().domain([250,100000]).range([0,600]);
        var r = d3.scaleSqrt().domain([52070,1380000000]).range([10,40]);
        this.svg.append('circle').attr('r', r(1380000000)).attr('fill','red').attr('cx', x(13330)).attr('cy', y(77))

      
    });
  }
 
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  
}
