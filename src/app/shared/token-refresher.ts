import { Headers , RequestOptions, Http, Response} from '@angular/http';
import { RequestHeader } from '../shared/request-header';
import { TokenRequest } from './token-request';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenRefresher {
    public url:string =  'https://api-40.1-stop.biz/AuthProxy/v1/Token/Refresh';
    public body = {};
    public options:RequestOptions = new RequestOptions();
    public headers:Headers = new Headers();
    
    constructor(private http: Http){
	this.headers.append('Content-Type','application/json');
	this.options.headers = this.headers;
    }

    public transmitRequest(): Promise<any> {
	console.log("get fresh token: ");
	console.log(this.url);
	console.log(this.body);
	console.log(this.options);
	return Promise.resolve(this.http.post(this.url, this.body, this.options).toPromise());
	
    }
}
