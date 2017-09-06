import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/primeng';

import { SimpleBookingsService } from '../../simple-bookings/simple-bookings.service';
import { Applog } from '../../applog';

@Component({
  selector: 'app-drop-off-container',
  templateUrl: './drop-off-container.component.html',
  styleUrls: ['./drop-off-container.component.css']
})
export class DropOffContainerComponent implements OnInit {

		private chosenDefaultSite: boolean = true;
		private defaultSite: string = "MCS";
		private selectedSite = "";
		private sites:SelectItem[];
		private containerNumber: string = "";
		private returnFacilitiesRetrievalSuccess: boolean = false;

		private defaultSiteRetrievalSuccess = false;
		private defaultSiteRetrievalError = 'Please enter a container number to reveal the default return facility';	
		private returnFacilitiesRetrievalError: string = "";
		private returnFacilities: string = '';
		
		
		
		constructor(private simpleBookingsService:SimpleBookingsService, private applog: Applog) {
				this.sites = [];
				this.sites.push({label: 'site1', value:'site1'});
				this.sites.push({label: 'site2', value:'site3'});
				this.sites.push({label: 'site3', value:'site3'});
		}
		
		captureContainerNumber(){
				this.simpleBookingsService.editBooking("CargoId", this.containerNumber);
				this.simpleBookingsService.validate();
				console.log("captureContainerNumber");
				this.simpleBookingsService.retrieveReturnFacilities(this.containerNumber).then((res)=>{
						console.log(res);
						if (this.simpleBookingsService.interpretResponse(res)["Status"] == false){
								console.log("service failure");
								this.defaultSiteRetrievalSuccess = false;
								this.defaultSiteRetrievalError = this.simpleBookingsService.interpretResponse(res).Description;
								if (this.defaultSiteRetrievalError == "Unauthorized"){
										this.simpleBookingsService.refreshCredentials();
										this.defaultSiteRetrievalError = this.simpleBookingsService.interpretResponse(res).Description + ". \nplease try again.";
								}
								console.log(this.returnFacilitiesRetrievalError);
						}else{
								console.log("service success");
								this.defaultSiteRetrievalSuccess = true;
								this.defaultSite = this.simpleBookingsService.interpretResponse(res).Data["ReturnFacility"];
								console.log(this.defaultSite["ReturnFacility"]);
						}
				}).catch((errObj: any)=>{
						console.log("rxjs failure");
						this.applog.stdLog = "Error: " + this.simpleBookingsService.interpretResponse(errObj).Description + ".\nPlease try again";
						this.defaultSiteRetrievalSuccess = false;
						this.defaultSiteRetrievalError = this.simpleBookingsService.interpretResponse(errObj).Description;
						if (this.defaultSiteRetrievalError == "Unauthorized"){
								this.simpleBookingsService.refreshCredentials();
						}
						
				})
		}

		captureFacility(){
				this.simpleBookingsService.editBooking("FacilityId", this.defaultSite);
				this.simpleBookingsService.validate()
		}
		ngOnInit() {
				
		}
		
}
