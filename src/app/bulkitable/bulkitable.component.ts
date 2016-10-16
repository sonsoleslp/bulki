import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Datafile } from './../datafile';
import { DatafilesService } from './../datafiles.service';

 

@Component({
  selector: 'app-bulkitable',
  templateUrl: './bulkitable.component.html',
  styleUrls: ['./bulkitable.component.css'],
  providers: [DatafilesService]

})
export class BulkitableComponent implements OnInit, OnChanges {
  @Input("data") public data: any;
  file: Datafile;
  sub: any;
  // data;
  keys;
  constructor(
    private dfs: DatafilesService,
    private route: ActivatedRoute) {
  }

  type(d) {
     d.value = +d.value; // coerce to number
     return d;
  }
  valueForKey(key){
    return this.data[key];
  }
  ngOnInit() {/*
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.dfs.getFile(id)
        .then(file => this.file = file);
        console.log(this.file)
        if(this.file){       
          d3.tsv(this.file.route, this.type, function(error, data) {
            this.data = data;
            this.keys = Object.keys(data);
          }.bind(this));
        }
    });

 */ 
   console.log(22222,this.data)
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log(changes)
    for (let propName in changes) {
      let changedProp = changes[propName];
      if (propName == 'data') {
        this.data = changedProp.currentValue;
        console.log(this.data)
      }
     }
   }

  ngOnDestroy() {
   
  }

  
}

