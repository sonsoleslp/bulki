import { InMemoryDbService } from 'angular2-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    let files = [
      {id: 1, name: 'file1.tsv', route: 'assets/files/file1.tsv'},
      {id: 2, name: 'file2.csv', route: 'assets/files/file2.csv'},
      {id: 3, name: 'thisisafilewithalongname.tsv', route: 'assets/files/file3.tsv'},
      {id: 4, name: 'file4.xml', route: 'assets/files/file4.xml'} 
    ];
    return {files};
  }
}