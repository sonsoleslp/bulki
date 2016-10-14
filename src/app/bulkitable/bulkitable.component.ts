import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Datafile } from './../datafile';
import { DatafilesService } from './../datafiles.service';

@Component({
  selector: 'app-bulkitable',
  templateUrl: './bulkitable.component.html',
  styleUrls: ['./bulkitable.component.css'],
  providers: [DatafilesService]

})
export class BulkitableComponent implements OnInit {
  
  file: Datafile;
  sub: any;

  constructor(
    private dfs: DatafilesService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.dfs.getFile(id)
        .then(file => this.file = file);
        console.log(this.file)
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  
}

