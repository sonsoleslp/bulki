import { Component, OnInit, OnDestroy,  ElementRef, Input, OnChanges, SimpleChange  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription }   from 'rxjs/Subscription';

import { Datafile } from './../datafile';
import { DatafilesService } from './../datafiles.service';
import { DatachoiceService } from './../datachoice.service';



var d3 = require('d3')

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
  providers: [DatafilesService, DatachoiceService]
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

  wtd_subscription: Subscription;

  whattodraw = 1;
  corrx = 'key';
  corry = 'key';
  hist = 'names';

 

  constructor( private dfs: DatafilesService, private dcs: DatachoiceService, private route: ActivatedRoute, elementRef: ElementRef) {
    this.elementRef = elementRef; 
  }

  type(d) {
    d.value = +d.value; // coerce to number
    return d;
  }

  ngOnInit() {
    this.wtd_subscription = this.dcs.wtd$.subscribe(
      what => {
        console.log("Ground control to mayor Tom");
        this.whattodraw = what;
        this.draw();
      });
    this.draw();     
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (let propName in changes) {
      console.log(changes)
      let changedProp = changes[propName];
      if (propName == 'data') {
        this.data = changedProp.currentValue;
        this.draw();
      }
    }
  }

  draw() {
    this.corrx = this.dcs.getCorrX();
    this.corry = this.dcs.getCorrY();
    this.hist = this.dcs.getHistogram();

    console.log("We are in draw function......");
    this.drawHistCat();
    console.log(this.hist, 'thishist')
    console.log('whatToDraw',this.dcs.getWhatToDraw());
   // this.drawHistNum();
  }

  drawHistCat(){
    var chart = d3.select('#thechart').html("");
    var svg = d3.select('#thechart').append('svg').attr('id','svgchart');
    var w = document.getElementById('canvasWrapper').offsetWidth;// - 32;
    var h = 300 // document.getElementById('canvasWrapper').offsetHeight;
    svg.attr('width', w).attr('height', h);

    var barHeight = 30;
    var selected = this.dcs.getHistogram();
    console.log(selected,'selected');

    if(this.data){  
      var margin = {top: 10, right: 25, bottom: 20, left: 25},
          width = w - margin.left - margin.right,
          height = h - margin.top - margin.bottom,
          g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
          key = selected,
          vars = this.data.map(function(obj) {  
            return obj[key];
          });  
      console.log(vars)

      var x = d3.scaleBand()
                 .domain(vars)
                 .range([0,width]);
  
      console.log('domainx',x.domain());
      // group the data for the bars
      /* var bins = d3.histogram()
          .domain(x.domain())
          (this.data.map(function(d) { 
            var keys_list = Object.keys(d);
             return d[keys_list[selected]] })
          );
      */
      var bins = d3.histogram().domain(x.domain())(vars.map(x));

      console.log('bins', bins)


      var y = d3.scaleLinear()
                .domain([0, d3.max(bins, function(d) { 
                  return d.length; })])
                .range([height, selected]);



      // append the bar rectangles to the svg element
      var bar = g.selectAll("rect")
          .data(bins)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", 1)
          .attr("transform", function(d) {
            return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
          .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
          .attr("height", function(d) { 
            return height - y(d.length); });

      bar.append("text")
          .attr("dy", ".75em")
          .attr("class", "tag")
          .attr("y",6)
          .attr("fill","white")
          .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
          .attr("text-anchor", "middle")
          .text(function(d) { 
            return ("hola"/*d.length == 0 ? "" : d.length*/);
          });

      // add the x Axis
      g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      // add the y Axis
      g.append("g")
          .attr("class", "axis axis--y")
          .call(d3.axisLeft(y));
     }
  }

  drawHistNum(){
    var chart = d3.select('#thechart').html("");
    var svg = d3.select('#thechart').append('svg').attr('id','svgchart');
    var w = document.getElementById('canvasWrapper').offsetWidth;// - 32;
    var h = 300 // document.getElementById('canvasWrapper').offsetHeight;
    svg.attr('width', w).attr('height', h);

    var barHeight = 30;
    
    var selected = this.dcs.getHistogram();
    console.log(selected,'selected');

    if(this.data){  
      var margin = {top: 10, right: 25, bottom: 20, left: 25},
          width = w - margin.left - margin.right,
          height = h - margin.top - margin.bottom,
          g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
      var x = d3.scaleLinear().range([0, width]);
      x.domain([0, d3.max(this.data, function(d) { 
         return d[selected]; })]);

      // group the data for the bars
      var bins = d3.histogram()
          .domain(x.domain())
          .thresholds(x.ticks(20))
          (this.data.map(function(d) { 
             return d[selected] })
          );

      var y = d3.scaleLinear()
          .domain([0, d3.max(bins, function(d) { 
             return d.length; })])
          .range([height, 0]);



      // append the bar rectangles to the svg element
     var bar = g.selectAll("rect")
          .data(bins)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", 1)
          .attr("transform", function(d) {
            return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
          .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
          .attr("height", function(d) { 
            return height - y(d.length); });

      bar.append("text")
          .attr("dy", ".75em")
          .attr("class", "tag")
          .attr("y",6)
          .attr("fill","white")
          .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
          .attr("text-anchor", "middle")
          .text(function(d) { 
            return ("hola"/*d.length == 0 ? "" : d.length*/);
          });

      // add the x Axis
      g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      // add the y Axis
      g.append("g")
          .attr("class", "axis axis--y")
          .call(d3.axisLeft(y));
     }
  }

  drawCorrelation(){
  }

  ngOnDestroy() {
    this.wtd_subscription.unsubscribe();

  }

  
}
