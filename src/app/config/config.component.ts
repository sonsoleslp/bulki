import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Datafile } from './../datafile';
import { DatafilesService } from './../datafiles.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
  providers: [DatafilesService]
})
export class ConfigComponent implements OnInit, OnChanges {

  @Input('data') public data: any;
  file: Datafile;
  sub: any;
  cols;
  constructor(
    private dfs: DatafilesService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.dfs.getFile(id)
        .then(file => this.file = file);
     });
    if (this.data){
      console.log('got data')
      
    }
  }
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log('oooo',changes)
    for (let propName in changes) {
      let changedProp = changes[propName];

      if (propName == 'data' ) {
        this.data = changedProp.currentValue;
        console.log("thisdata", this.data)
        if (this.data) {
           
            if (this.data.columns) {
              this.cols = this.data.columns;
              console.log(this.cols) 
            }
          
        }
      }
     }
   }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  
}
