import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
 
import { Datafile } from './../datafile';
import { DatafilesService } from './../datafiles.service';
import { DatachoiceService } from './../datachoice.service';

var d3 = require('d3');

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
  providers: [DatafilesService, DatachoiceService]
})
export class ConfigComponent implements OnInit, OnChanges {

  @Input('data') public data: any;
  file: Datafile;
  sub: any;
  cols;
  min = 0;
  max = 0;
  mean = 0;
  median = 0;
  selected = 1;
 
  value_radio1 = 0;
  value_radio2 = 0;
  value_radio3 = 0;

  whattodraw = 0;
  corrx;
  corry;
  hist;

   

  constructor(
    private dfs: DatafilesService,
    private dcs: DatachoiceService,
    private route: ActivatedRoute) {
    dcs.wtd$.subscribe(what => {
      console.log('configcomponentsub')
      this.whattodraw = what;
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.dfs.getFile(id)
        .then(file => this.file = file);
     });
    if (this.data){
       console.log("")      
    }

    this.summarize();
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (let propName in changes) {
      let changedProp = changes[propName];
       if (propName == 'data' ) {
        this.data = changedProp.currentValue;
         if (this.data) {  
          if (this.data.columns) {
            this.cols = this.data.columns;
          }
          this.summarize();
        }
      }
     }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    // this.dcs.wtd$.unsubscribe();
  }

  summarize(){
    if(this.data){
      var selected = this.selected;

      this.max = d3.max(this.data, function(d) { 
        var key = Object.keys(d)[selected]
        return d[key]; 
      });

      this.min = d3.min(this.data, function(d) { 
        var key = Object.keys(d)[selected]
        return d[key]; 
      });

      this.mean = d3.mean(this.data, function(d) { 
        var key = Object.keys(d)[selected]
        return d[key]; 
      });     

      this.median = d3.median(this.data, function(d) { 
        var key = Object.keys(d)[selected]
        return d[key]; 
      });         
    } 
  }

  drawHist() {
    this.whattodraw = 1;
    this.dcs.setWhatToDraw(1);
    this.dcs.emitWTD(1);
    console.log(this.dcs.getWTD())
    console.log('Histogram');
  }

  drawCorr() {
    this.whattodraw = 2;
    this.dcs.setWhatToDraw(2);
    this.dcs.emitWTD(2);
    console.log('Correlation');
  }

  setHistVar(col){
    this.value_radio1 = col;
    this.dcs.setHistogram(col)
    console.log('setHisTvAR',col)
  }  

  setCorrXvar(col){
    this.value_radio2 = col;
    this.dcs.setCorrX(col)
  }

  setCorrYvar(col){
    this.value_radio3 = col;
    this.dcs.setCorrY(col);
  }

  saveImage(){
    console.log("SAVE IMAGE");
    var svg  = document.getElementById('svgchart'),
    xml  = new XMLSerializer().serializeToString(svg),
    data = "data:image/svg+xml;base64," + btoa(xml),
    img  = new Image()
    img.setAttribute('src', data)
    window.open(data)
  }
}
