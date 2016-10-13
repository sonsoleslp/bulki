import { Injectable } from '@angular/core';
import { Datafile } from './datafile';
import 'rxjs/add/operator/toPromise';
import {Http} from '@angular/http';


@Injectable()
export class DatafilesService {
	private filesUrl = 'app/files';  // URL to web api
  	constructor(private http: Http) { }

	getFiles() {
	  return this.http.get(this.filesUrl)
	             .toPromise()
	             .then(response => response.json().data as Datafile[])
	             .catch(this.handleError);
	}


	getFile(id: number) {
	  return this.getFiles()
	             .then(files => files.find(file => file.id === id));
	}

 

	private handleError(error: any) {
	  console.error('An error occurred', error);
	  return Promise.reject(error.message || error);
	}
}


	

