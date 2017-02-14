import { Component, OnInit } from '@angular/core';
import { Datafile  } from './../datafile';
import { DatafilesService } from './../datafiles.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [DatafilesService]
})
export class ListComponent implements OnInit {
  // data = ["file1.csv", "file2.tsv", "file2.json"];
  data: Datafile[] = [];
  constructor(private dfs: DatafilesService) {
  }

  ngOnInit() {
    this.dfs.getFiles()
      .then(data => this.data = data);
    
  }

}

