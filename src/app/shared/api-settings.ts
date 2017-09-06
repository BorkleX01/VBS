export class ApiSettings {
    
    /*VBS bookings general*/
    public static get VBS_ACTIVE_FACILITIES_URL(): string { return 'WebServicesProxy/api/Facility/Active/' }
    public static get VBS_CREATE_BOOKING(): string { return 'WebServicesProxy/api/Timeslot/Book' }
    public static get VBS_TIMESLOT_ENQUIRY(): string { return 'WebServicesProxy/api/Timeslot/Enquiry' }
    public static get VBS_FACILITY_ENQUIRY(): string { return 'WebServicesProxy/api/Facility/Active/' }
    public static get VBS_CONTAINER_RETURN_LOCATION(): string { return 'WebServicesProxy/api/ContainerPark' }
    //public static get VBS_ERN_DEFAULT_LOCATION(): string { return 'WebServicesProxy/api/' }

    /*Booking APIs*/
    public static get SEARCH_BOOKING_URL(): string { return 'CPMSGW/services/CPMSBooking/v1/Appointment/Search'; }
    public static get BOOKING_DETAIL_URL(): string { return 'CPMSGW/services/CPMSBooking/v1/Appointment/'; }
    public static get BOOKING_GATE_IN(): string { return 'CPMSGW/services/CPMSBooking/v1/Appointment/CompleteJob/DropOff'; } 
    public static get BOOKING_GATE_OUT(): string { return 'CPMSGW/services/CPMSBooking/v1/Appointment/CompleteJob/PickUp'; } 
    

    /*ERN APIs*/
    public static get ERN_GET_ALL_URL(): string { return 'CPMSGW/services/CPMSBooking/v1/ERN/GetAll/'; }
    public static get SEARCH_ERN_URL(): string { return 'CPMSGW/services/CPMSBooking/v1/ERN/Search'; }
    public static get CREATE_ERN_URL(): string { return 'CPMSGW/services/CPMSBooking/v1/ERN/'; }
    public static get ERN_DETAIL_URL(): string { return 'CPMSGW/services/CPMSBooking/v1/ERN/'; }
    public static get UPDATE_ERN_URL(): string { return 'CPMSGW/services/CPMSBooking/v1/ERN'; } 
    public static get DELETE_ERN_URL(): string { return 'CPMSGW/services/CPMSBooking/v1/ERN/'; } 


    /*Inventory APIs*/
    public static get INVENTORY_GET_ALL_URL(): string { return 'CPMSGW/services/CPMSYard/v1/GetAll'; } 
    public static get INVENTORY_SEARCH(): string { return 'CPMSGW/services/CPMSYard/v1/Search'; }
    public static get SEARCH_INVENTORY_URL(): string { return 'CPMSGW/services/CPMSYard/v1/Search/';}
    public static get INVENTORY_HISTORY_SEARCH(): string { return 'CPMSGW/services/CPMSYard/v1/Search/History'; }
    public static get YARD_GATE_IN(): string { return 'CPMSGW/services/CPMSYard/v1/GateIn'; } 
    

    /*Redirections APIs*/
    public static get ACTIVE_REDIRECTIONS_URL(): string { return 'CPMSGW/services/CPMSShippingLine/v1/Redirection/Facility'; } 
    public static get REDIRECTION_DETAIL_URL(): string { return 'CPMSGW/services/CPMSShippingLine/v1/Redirection/Facility/'; } 
    public static get INACTIVE_REDIRECTIONS_URL(): string { return 'CPMSGW/services/CPMSShippingLine/v1/Redirection/Facility/Inactive'; } 
    public static get DELETE_REDIRECTION_URL(): string { return 'CPMSGW/services/CPMSShippingLine/v1/Redirection/Facility/'; } 
    public static get CREATE_REDIRECTION_URL(): string { return 'CPMSGW/services/CPMSShippingLine/v1/Redirection/Facility/'; } 
    public static get UPDATE_REDIRECTION_URL(): string { return 'CPMSGW/services/CPMSShippingLine/v1/Redirection/Facility/'; }

    
}

