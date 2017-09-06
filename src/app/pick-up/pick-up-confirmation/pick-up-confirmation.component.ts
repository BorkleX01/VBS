import { Component, OnInit } from '@angular/core';
import { SimpleBookingsService } from '../../simple-bookings/simple-bookings.service'
@Component({
  selector: 'app-pick-up-confirmation',
  templateUrl: './pick-up-confirmation.component.html',
  styleUrls: ['./pick-up-confirmation.component.css']
})
export class PickUpConfirmationComponent implements OnInit {
		private pickUpBookingSystemSuccess = true;

		constructor(private simpleBookingsService:SimpleBookingsService) {
				
		}

		ngOnInit() {
				
		}

}
/*Reference:  19I200912<br/>
	Booking Successfully Confirmed!<br/>
	Empty Release Number: ERN1234<br/>
	Date and Zone:   28 / 09 / 2016<br/>
	Zone: 19<br/>
	Location:  MCS Cooks River<br/>*/
/*
{{simpleBookingsService.responseObj.json().Status}}<br/>
	{{simpleBookingsService.responseObj.json().Description}}<br/>
	{{simpleBookingsService.responseObj.json().Data.BookingDate}}<br/>
	{{simpleBookingsService.responseObj.json().Data.BookingType}}<br/>
	{{simpleBookingsService.responseObj.json().Data.BookingZone}}<br/>
	{{simpleBookingsService.responseObj.json().Data.Driver}}<br/>
	{{simpleBookingsService.responseObj.json().Data.TruckRego}}<br/>
*/
