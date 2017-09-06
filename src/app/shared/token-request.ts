import { Headers } from '@angular/http';
import { User } from '../data-models/user';

export class TokenRequest {

    constructor(username:string, password:string){
	var user = new User();
	user.ClientId = "1STOP";
	user.Username = username;
	user.Password = password;
	this.reqBody = user;

	console.log("TokenRequest.refreshToken on new tokenrequest");
	console.log(TokenRequest.refreshToken);
    }
    //public reqURL = 'https://api-40.1-stop.biz/AuthProxy/v1/Token';
    
    public options:Headers = this.reqHeaders();

    public static authToken;
    public static refreshToken = "no token";
    public static expiration;
    public static sessionIsExpired:boolean = false;
    public static apiBaseUrl;
    public static authUrl;
    public reqURL = TokenRequest.authUrl+'AuthProxy/v1/Token';

    public reqBody;

    public reqHeaders(): Headers {
	var headers:Headers = new Headers();
	headers.append('Content-Type', 'application/json');
	return headers;	
    }

    public static startTimer(){
	console.log("start timer");
	setTimeout(
	    ()=>{
		console.log("session expired");
		this.sessionIsExpired = true;
	    }, ((this.expiration-30)*1000))
    }
}


