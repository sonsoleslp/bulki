import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class DatachoiceService {

  	private whattodraw : any = 0;
	private WTDSource = new Subject<any>();
	wtd$ = this.WTDSource.asObservable();

  	private histselected : any;
   	private correlation_x : any;
   	private correlation_y : any;
 
  	constructor() { }
  	
 	setWhatToDraw(what){ this.whattodraw = what; console.log('setwtd',what);  }
	setHistogram(what){ this.histselected = what; console.log('sethist',what); }
	setCorrX(what){ this.correlation_x = what; console.log('setcorrx',what);  }
	setCorrY(what){ this.correlation_y = what; console.log('setcorry',what); }
 	getWhatToDraw(){ return this.whattodraw; }
	getHistogram(){ return this.histselected; }
	getCorrX(){ return this.correlation_x; }
	getCorrY(){ return this.correlation_y; }
  
	// Service message commands
	emitWTD(what: any) {
	  console.log('emitwtd_called',what); 
	  this.WTDSource.next(what);
	  this.whattodraw = what;
	}
	getWTD(){
		return this.whattodraw;
	}
 
}
