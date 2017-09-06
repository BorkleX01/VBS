import { Component, OnInit } from '@angular/core';
import { SimpleBookingsService } from '../../simple-bookings/simple-bookings.service'
import {SelectItem} from 'primeng/primeng';
import { Applog } from '../../applog';

@Component({
  selector: 'app-drop-off-time',
  templateUrl: './drop-off-time.component.html',
  styleUrls: ['./drop-off-time.component.css']
})
export class DropOffTimeComponent implements OnInit {

		private selectedZone = ""
		private zones:SelectItem[];

		private date:string = "";
		private truckRego:string = "";
		private truckDriver:string = "";
		private trailerRego:string = "";
		private licenseNumber:string = "";

		private relevantTimeZoneAvailable: boolean = false;
		private preTimeslotRequestMSG: string = "Choose date to reveal timeslot availability";
		constructor(private simpleBookingsService:SimpleBookingsService, private applog: Applog) {
				this.zones = [];
				this.zones.push({label: '1', value:"1"});
		}

		captureZone(e){
				console.log("captureZone");
				
				this.simpleBookingsService.editBooking("BookingZone", this.selectedZone);
				this.simpleBookingsService.validate()
		}

		keyAct(e){
				console.log(e);
		}
		
		captureDate(e){
				console.log(e);
				this.simpleBookingsService.editBooking("BookingDate", this.date);
				this.applog.showProgress("Loading available timeslots for selected date...");
				this.simpleBookingsService.returnAvailableSlots(this.date+"T00:00:00", this.simpleBookingsService.getBooking().SlotType).then(res => {
						this.applog.closeNotification();
						
						//console.log(res);
						//console.log("res Status: " + this.simpleBookingsService.interpretResponse(res).Status);
						
						if (this.simpleBookingsService.interpretResponse(res)["Status"] == false){
								//console.log("service failure");
								//console.log(this.simpleBookingsService.interpretResponse(res).Description);
								this.relevantTimeZoneAvailable = false;
								this.preTimeslotRequestMSG = this.simpleBookingsService.interpretResponse(res).Description;
								
						}else{
								console.log("service success");
								
								var zoneData = this.simpleBookingsService.interpretResponse(res).Data;
								//console.log(zoneData);
								this.zones = [];
								for (var i=0; i<zoneData.length; i++){
										console.log(zoneData[i].AvailableSlots + " " + zoneData[i].ZoneClosed);
										if ((Number(zoneData[i].AvailableSlots) > 0) && (zoneData[i].ZoneClosed == false))
										this.zones.push({label: zoneData[i].Zone, value:zoneData[i].Zone});
								}
								if (this.zones.length > 0){
										this.relevantTimeZoneAvailable = true;
										
								}else
								{
										this.relevantTimeZoneAvailable = false;
										this.preTimeslotRequestMSG = "No slots available";
										
								}
								
						}
						
						
				}).catch((errObj: any)=>{
						console.log("rxjs failure");
						console.log(errObj);
						//this.applog.headerTitle = "Error";
						//this.preTimeslotRequestMSG = "Could not retrieve available timeslots";
						//this.preTimeslotRequestMSG = this.simpleBookingsService.interpretResponse(res)["Description"];
						
						//console.log(this.simpleBookingsService.interpretResponse(res).Description);
						
						this.relevantTimeZoneAvailable = false;
						console.log(this.simpleBookingsService.interpretResponse(errObj).Description);
						this.applog.headerTitle = "Time Slot Error";
						this.applog.stdLog = "Error: " + this.simpleBookingsService.interpretResponse(errObj).Description + ".\nPlease try again";
						if (this.simpleBookingsService.interpretResponse(errObj).Description == "Unauthorized")
						{
								this.simpleBookingsService.refreshCredentials();

						}
						this.applog.allowDismissal = true;
						this.simpleBookingsService.refreshCredentials();
				})
		}

		captureRego(){
				this.simpleBookingsService.editBooking("TruckRego", this.truckRego);
				this.simpleBookingsService.validate();
		}

		captureDriverName(){
				this.simpleBookingsService.editBooking("TruckDriver", this.truckDriver);
				this.simpleBookingsService.validate();
		}

		captureTrailerRego(){
				this.simpleBookingsService.editBooking("TrailerRego", this.trailerRego);
				this.simpleBookingsService.validate();
		}

		captureLicenseNumber(){
				this.simpleBookingsService.editBooking("LicenseNumber", this.licenseNumber);
				this.simpleBookingsService.validate();
		}

		ngOnInit() {
		}

}
