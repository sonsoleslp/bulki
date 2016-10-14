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

  constructor(
    private dfs: DatafilesService,
    private route: ActivatedRoute,
    elementRef: ElementRef
    ) {
     let el: any    = elementRef.nativeElement;  // reference to <bar-graph> element from the main template
     let graph: any = d3.select(el);             // D3 chart container
     this.divs = graph
         .append('div')
         .attr({
           'class': 'chart'
         })
         .style({
           'width': 500 + 'px',
           'height': 500 + 'px',
         })
         .selectAll('div');
    
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.dfs.getFile(id)
        .then(file => this.file = file);
        console.log(this.file)
        console.log(d3)
        this.options = {
          chart: {
            type: 'discreteBarChart',
            height: 450,
            margin : {
              top: 20,
              right: 20,
              bottom: 50,
              left: 55
            },
            x: function(d){return d.label;},
            y: function(d){return d.value;},
            showValues: true,
            valueFormat: function(d){
              return d3.format(',.4f')(d);
            },
            duration: 500,
            xAxis: {
              axisLabel: 'X Axis'
            },
            yAxis: {
              axisLabel: 'Y Axis',
              axisLabelDistance: -10
            }
          }
        }
        this.data = [
          {
            key: "Cumulative Return",
            values: [
              {
                "label" : "A" ,
                "value" : -29.765957771107
              } ,
              {
                "label" : "B" ,
                "value" : 0
              } ,
              {
                "label" : "C" ,
                "value" : 32.807804682612
              } ,
              {
                "label" : "D" ,
                "value" : 196.45946739256
              } ,
              {
                "label" : "E" ,
                "value" : 0.19434030906893
              } ,
              {
                "label" : "F" ,
                "value" : -98.079782601442
              } ,
              {
                "label" : "G" ,
                "value" : -13.925743130903
              } ,
              {
                "label" : "H" ,
                "value" : -5.1387322875705
              }
            ]
          }
        ];
    });
  }
  private __render(newValue: any): void {
     if( !newValue ) 
       return;
   
     // join the data and chain styles and bar text ... all the usual suspects
     this.divs.data(newValue).enter().append('div')
         .transition().ease('elastic')
         .style('width', (d:any) => d + '%')
         .text( (d:any) => d + '%');
   }

   // update render on change
   private ngOnChanges( changes: { [propertyName: string]: SimpleChange } ): void 
   {
     this.__render( [10, 20, 30, 40, 60]);
   }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  
}
