import { Injectable } from '@angular/core';
import { Router }    from '@angular/router';

import { Headers, RequestOptions, Http, Response, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { TokenRequest } from '../shared/token-request';
import { RequestHeader } from '../shared/request-header';
import { ApiSettings } from '../shared/api-settings';
import { Booking } from '../data-models/booking';

import { TokenRefresher } from '../shared/token-refresher';

@Injectable()
export class SimpleBookingsService {
    //someVar:any = TokenRequest.apiBaseUrl + ApiSettings.VBS_ACTIVE_FACILITIES_URL;
    someVar:any = TokenRequest.apiBaseUrl + ApiSettings.VBS_CREATE_BOOKING;
    public bookingEndPoint:string = TokenRequest.apiBaseUrl + ApiSettings.VBS_CREATE_BOOKING;
    public timeZoneEndPoint:string = TokenRequest.apiBaseUrl + ApiSettings.VBS_TIMESLOT_ENQUIRY;
    public facilityFinderEndpoint:string = TokenRequest.apiBaseUrl + ApiSettings.VBS_FACILITY_ENQUIRY;
    public returnLocationFinderEndpoint:string = TokenRequest.apiBaseUrl + ApiSettings.VBS_CONTAINER_RETURN_LOCATION;
    
    public responseObj: any;
    public requestHeader: RequestHeader;
    public allowConfirmation: boolean = false;
    public dropOffBookingSuccess: boolean = false;
    public pickUpBookingSuccess: boolean = false;
    
    constructor(private http: Http, private tokenRefresher: TokenRefresher, private router: Router) {
				console.log("sbs service cons");
				this.requestHeader = new RequestHeader(TokenRequest.authToken, tokenRefresher, router);
    }

    private bookingObj: Booking;
    
    createNewBooking(movementType){
				this.bookingObj = new Booking();
				this.bookingObj.BookingType = movementType;
				//console.log(this.bookingObj);
    }

    editBooking(key, value){
				this.bookingObj[key] = value;
				//console.log(this.bookingObj);
    }
    
    getBooking(){
				return this.bookingObj;
    }

    transmitRequest(url, body, headers){
				return Promise.resolve(this.http.post(url, body, headers).toPromise());
    }

    returnAvailableSlots(date, slotType){
				console.log(date);
				console.log(slotType);
				var slotEnqBody = {"BookingDate":date,"SlotType":slotType};

				return Promise.resolve(this.http.post(this.timeZoneEndPoint, slotEnqBody, this.requestHeader.options).toPromise());
				
    }

    interpretResponse(res: Response): any {
				let body = res.json();
				//console.log(">"+body.Status);
				//console.log(">"+body.Description);
				//console.log(">"+body.Data);
				return {Status:body.Status, Description:body.Description, Data:body.Data}
				
    }

    refreshCredentials() {
				console.log("refresh credentials");
				console.log(TokenRequest.refreshToken);
				this.requestHeader.updateAuthToken();
    }

    validate(){
				if ((this.bookingObj.BookingDate != "")&&
						(this.bookingObj.BookingZone != "")&&
						(this.bookingObj.FacilityId != "")&&
						(this.bookingObj.FacilityId != "")&&
						(this.bookingObj.LicenseNumber != "")&&
						(this.bookingObj.TrailerRego != ""))
				{
						if ((this.bookingObj.SlotType == "EXPORT") && (this.bookingObj.CargoId != ""))
						{
								this.allowConfirmation = true;
						}
						if ((this.bookingObj.SlotType == "IMPORT") && (this.bookingObj.FacilityRef != null))
						{
								this.allowConfirmation = true;
						}
				}
				else
				{
						this.allowConfirmation = false;
				}
				
    }

    retrieveFacilities(){
				console.log("retrieveFacilities");
				console.log(this.requestHeader.options.headers);
				return Promise.resolve(this.http.get(this.facilityFinderEndpoint, { headers: this.requestHeader.options.headers }).toPromise());
    }

    retrieveReturnFacilities(containerNo){
				console.log("retrieveReturnFacilities");
				console.log(this.returnLocationFinderEndpoint+'/'+containerNo+'/ReturnFacility');
				return Promise.resolve(this.http.get(this.returnLocationFinderEndpoint+'/'+containerNo+'/ReturnFacility', {headers: this.requestHeader.options.headers}).toPromise());
				
    }

    logout(){
				this.router.navigate(['/login']);
    }

    retrieveERNLocation(ern){
				console.log("get ERN location");
    }
    
}
