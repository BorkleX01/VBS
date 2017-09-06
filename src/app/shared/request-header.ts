import { Headers , RequestOptions, Http, Response} from '@angular/http';
import { Router } from '@angular/router';
import { TokenRequest } from './token-request';
import { TokenRefresher } from './token-refresher';

export class RequestHeader {
    authToken:string = 'no token';
    
    constructor (public authTokenP:string, private tokenRefresher:TokenRefresher  ){
	this.authToken = authTokenP;
	//this.authToken = TokenRequest.authToken;
	this.options = new RequestOptions();
	this.options.headers = this.reqHeaders();
    }

    private _options: RequestOptions;
    
    public get options(): RequestOptions{
	console.log("expired token?: " + TokenRequest.sessionIsExpired);
	
	if (TokenRequest.sessionIsExpired){
	    this.router.navigateByUrl("/login");
	    //this.updateAuthToken()
	}
	return this._options
    }

    public set options(val){
	console.log("set RequestOptions")
	this._options = val;
    }

    public updateAuthToken() {
	
	console.log("updateAuthToken()");
	console.log("refresh token: ");
	console.log(sessionStorage.getItem('refreshToken'));
	//this.tokenRefresher.body = {'ClientId':'1STOP','Token':TokenRequest.refreshToken};
	this.tokenRefresher.body = {'ClientId':'1STOP','Token':sessionStorage.getItem('refreshToken')};
	this.tokenRefresher.transmitRequest().then((res)=>{
	    console.log(res);
	    let body = res.json();
	    

	    TokenRequest.authToken = 'Bearer '+JSON.parse(body.raw)["access_token"]; //is this needed?
	    this.authToken = TokenRequest.authToken; //is TokenRequest.authToken neded?
	    //this.authToken = "corrupt token"; //is TokenRequest.authToken neded?
	    console.log("new access token: " + this.authToken);
	    sessionStorage.setItem('authToken', this.authToken);
	    this._options.headers = this.reqHeaders();
	    console.log("new refresh token: ");
	    console.log(body.refreshToken);
	    sessionStorage.setItem('refreshToken', body.refreshToken);
	    TokenRequest.refreshToken = body.refreshToken;
	    
	    //sessionStorage.setItem('token', TokenRequest.authToken);
	    console.log("set new expiration: ");
	    console.log(body.expiresIn);
	    TokenRequest.sessionIsExpired = false;
	    TokenRequest.startTimer();
	    
	});
    }
    public reqHeaders(): Headers {
	console.log("get headers");
	var headers:Headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Facilityid', 'MCS');
	headers.append('user', sessionStorage.getItem('username'));
	headers.append('Username', sessionStorage.getItem('username'));
	//headers.append('Authorization', this.authToken);
	headers.append('Authorization', sessionStorage.getItem('authToken'));
	headers.append('Space-Id', 'MCS');
	headers.append('Content-Encoding', 'gzip');
	return headers
    }    
}

