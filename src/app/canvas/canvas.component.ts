import { Component, OnInit, OnDestroy,  ElementRef, Input, OnChanges, SimpleChange  } from '@angular/core';
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
export class CanvasComponent implements OnInit,OnChanges {

  elementRef;
  file: Datafile;
  sub: any;
  @Input("data") public data: any;
  options;
  private divs: any;
  host;
  svg;
  constructor( private dfs: DatafilesService, private route: ActivatedRoute, elementRef: ElementRef) {
     // let el: any    = elementRef.nativeElement;  // reference to <bar-graph> element from the main template
     // this.host = d3.select('#thechart');
     this.elementRef = elementRef;
    
  }
  type(d) {
      d.value = +d.value; // coerce to number
      return d;
  }
  ngOnInit() {
    
    this.draw();

     
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log(changes)
    for (let propName in changes) {
      let changedProp = changes[propName];
      if (propName == 'data') {
        this.data = changedProp.currentValue;
        this.draw();
      }
     }
   }

  draw(){
    var chart = d3.select('#thechart').html("");
    var svg = d3.select('#thechart').append('svg');
    var w = document.getElementById('canvasWrapper').offsetWidth - 32;
    var h = 500 // document.getElementById('canvasWrapper').offsetHeight;
    console.log(w)
    svg.attr('width', w).attr('height', h);

    var  barHeight = 30;
    var x = d3.scaleLinear().range([0, w]);

    if(this.data){       
      x.domain([0, d3.max(this.data, function(d) { return d.value; })]);

      svg.attr("height", barHeight * this.data.length);

      var bar = svg.selectAll("g")
          .data(this.data)
          .enter().append("g")
          .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

      bar.append("rect")
          .attr("width", function(d) { return x(d.value); })
          .attr("height", barHeight - 4);

      bar.append("text")
          .attr("x", function(d) { return x(d.value) - 3; })
          .attr("y", barHeight / 2)
          .attr("dy", ".35em")
          .text(function(d) { return d.value; });
     }
  }
  drawScale(){

  }
  ngOnDestroy() {}

  
}
