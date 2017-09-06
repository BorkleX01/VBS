import { Component, OnInit } from '@angular/core';
import { SimpleBookingsService } from '../../simple-bookings/simple-bookings.service'
import {SelectItem} from 'primeng/primeng';
import { Applog } from '../../applog';

@Component({
  selector: 'app-pick-up-time',
  templateUrl: './pick-up-time.component.html',
  styleUrls: ['./pick-up-time.component.css']
})
export class PickUpTimeComponent implements OnInit {

		private selectedZone = "";
		private zones:SelectItem[];

		private date:string = "";
		private truckRego:string = "";
		private truckDriver:string = "";
		private trailerRego:string = "";
		private licenseNumber:string = "";
		
		private relevantTimeZoneAvailable: boolean = false;
		private preTimeslotRequestMSG = "Choose date to reveal timeslot availability";
		constructor(private simpleBookingsService:SimpleBookingsService, private applog: Applog) {
				this.zones = [];
				this.zones.push({label: '1', value:'1'});
				this.zones.push({label: '2', value:'2'});
				this.zones.push({label: '3', value:'3'});
				this.zones.push({label: '4', value:'4'});
				this.zones.push({label: '5', value:'5'});
				this.zones.push({label: '6', value:'6'});
				this.zones.push({label: '7', value:'7'});
		}
		
		captureZone(e){
				console.log("captureZone");
				this.simpleBookingsService.allowConfirmation = true;
				this.simpleBookingsService.editBooking("BookingZone", this.selectedZone);
		}
		
		captureDate(e){
				console.log(e);
				this.simpleBookingsService.editBooking("BookingDate", this.date);
				this.applog.headerTitle = "Loading...";
				this.applog.showProgress("Loading available timeslots for selected date...");
				this.simpleBookingsService.returnAvailableSlots(this.date+"T00:00:00", this.simpleBookingsService.getBooking().SlotType).then(res => {
						this.applog.closeNotification();
						if (this.simpleBookingsService.interpretResponse(res)["Status"] == false){
								console.log("service failure");
								this.relevantTimeZoneAvailable = false;
								this.preTimeslotRequestMSG = this.simpleBookingsService.interpretResponse(res).Description;
						}
						else
						{
								console.log("service success");
								
								var zoneData = this.simpleBookingsService.interpretResponse(res).Data;
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
						this.applog.stdLog = "Error: " + this.simpleBookingsService.interpretResponse(errObj).Description + ".\nPlease try again";
						if (this.simpleBookingsService.interpretResponse(errObj).Description == "Unauthorized")
						{
								this.simpleBookingsService.refreshCredentials();
								//this.simpleBookingsService.logout()
						}
						this.applog.allowDismissal = true;
						this.relevantTimeZoneAvailable = false;
						console.log(this.simpleBookingsService.interpretResponse(errObj).Description);
				})
		}

		captureRego(){
				this.simpleBookingsService.editBooking("TruckRego", this.truckRego);
				this.simpleBookingsService.validate()
		}

		captureDriverName(){
				this.simpleBookingsService.editBooking("TruckDriver", this.truckDriver);
				this.simpleBookingsService.validate()
		}

		captureTrailerRego(){
				this.simpleBookingsService.editBooking("TrailerRego", this.trailerRego);
				this.simpleBookingsService.validate()
		}
		captureLicenseNumber(){
				this.simpleBookingsService.editBooking("LicenseNumber", this.licenseNumber);
				this.simpleBookingsService.validate()
		}

		ngOnInit() {

		}

}
