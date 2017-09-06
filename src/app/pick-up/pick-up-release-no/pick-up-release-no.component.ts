import { Component, OnInit } from '@angular/core';
import { SimpleBookingsService } from '../../simple-bookings/simple-bookings.service'
@Component({
  selector: 'app-pick-up-release-no',
  templateUrl: './pick-up-release-no.component.html',
  styleUrls: ['./pick-up-release-no.component.css']
})
export class PickUpReleaseNoComponent implements OnInit {

		private ERN: string = "";
		private location: string = "";
		
		constructor(private simpleBookingsService:SimpleBookingsService) {
		}

		captureERN() {
				this.simpleBookingsService.editBooking("FacilityRef",this.ERN);
				this.simpleBookingsService.validate()
				
		}

		captureLocation(){
				this.simpleBookingsService.editBooking("FacilityId",this.location);
				console.log("Is this FacilityId?")
		}
		ngOnInit() {
		}

}
