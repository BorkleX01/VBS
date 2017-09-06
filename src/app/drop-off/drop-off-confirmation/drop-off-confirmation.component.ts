import { Component, OnInit } from '@angular/core';
import { SimpleBookingsService } from '../../simple-bookings/simple-bookings.service'

@Component({
  selector: 'app-drop-off-confirmation',
  templateUrl: './drop-off-confirmation.component.html',
  styleUrls: ['./drop-off-confirmation.component.css']
})


export class DropOffConfirmationComponent implements OnInit {
		
		constructor(private simpleBookingsService:SimpleBookingsService) {
		}
		
		ngOnInit() {
		}

}
/*
Reference:  19E200912<br/>
	Booking Successfully Confirmed!<br/>
	Container Number: Container1234<br/>
	Date and Zone:   28 / 09 / 2016<br/>
	Zone: 19<br/>
	Location:  MCS Cooks River<br/>
*/

/*
{"Status":true,"Description":null,"Data":{"FacilityId":"MCS","CarrierCode":"TEST","BookingType":null,"BookingStatus":"Pending Confirmation at Facility","BookingReference":"25044011","BookingDate":"2016-11-25T00:00:00","BookingZone":"4","SlotAttribute":null,"CompanyName":"WHIPLASH TRANSPORT","CargoId":"AABB2464322","CargoLength":"","EIDOPin":"","PoolName":"","VesselName":"","Lloyds":"","Voyage":"","Commodity":"","FullEmpty":"","ISOCode":"","DeclaredWeight":null,"LiftWeight":null,"HoldStatus":null,"DischargeStatus":null,"StorageDate":null,"FacilityReference":"","TruckRego":"ASDF","TrailerRego":"a","YardLocation":null,"TruckDriver":"adf","LicenseNumber":"sadf","CarrierId":"2866"}}
*/
