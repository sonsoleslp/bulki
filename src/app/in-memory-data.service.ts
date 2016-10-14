import { InMemoryDbService } from 'angular2-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    let files = [
      {id: 1, name: 'file1.csv', route: '/files/file1.csv'},
      {id: 2, name: 'file2.tsv', route: '/files/file2.tsv'},
      {id: 3, name: 'thisisafilewithalongname.json', route: '/files/file3.json'},
      {id: 4, name: 'file4.xml', route: '/files/file4.xml'} 
    ];
    return {files};
  }
}
