import { Component, OnInit , AfterViewInit, ElementRef} from '@angular/core';
import { Response } from '@angular/http';

import { MenuItem } from 'primeng/primeng';


import { environment } from '../../environments/environment';

import { Applog } from '../applog';

declare var Ultima: any;

@Component({
		selector: 'app-app-container',
		templateUrl: './app-container.component.html',
		styleUrls: ['./app-container.component.css'],
})

export class AppContainerComponent implements OnInit , AfterViewInit {

		layoutCompact: boolean = true;

    layoutMode: string = 'horizontal';
    
    darkMenu: boolean = true;
    
    profileMode: string = 'inline';

		changeTheme(event, theme) {
        let themeLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('theme-css');
        let layoutLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('layout-css');
        
        themeLink.href = 'assets/css/theme-' + theme +'.css';
        layoutLink.href = 'assets/css/layout-' + theme +'.css';
        event.preventDefault();
    }

  	constructor(private applog: Applog, private el: ElementRef) { 
    }
  	private items: MenuItem[];
    private tableHeadings:any = [];
    private showAll:boolean = true;
    private totalCount = 0;
    private columnOptions: any[];

		ngAfterViewInit() {
        Ultima.init(this.el.nativeElement);
    }
  	ngOnInit() {
  			this.items = [{
            label: 'Customers',
            items: [],
            routerLink: ['/home']
        },{
        		label: 'Bookings',
            items: [],
            routerLink: ['/pendingorders']
        },{
            label: 'Inventory',
            items: [],
            routerLink: ['/inventory']
        },{
        		label: 'Container Management',
            items: [{
            		label: 'Export Release Notes (ERN)',
            		items: [],
            		routerLink: ['/searchERN/open']
            },{
            		label: 'Pre-Gate',
            		items: [],
            		routerLink: ['/home']
            },{
            		label: 'Re-directions',
            		items: [],
            		routerLink: ['/redirection/active']
            }]
        },{
        		label: 'Maintenance and Repair',
            items: [],
            routerLink: ['/home']

        },{
        		label: 'Transport Fleet Management',
            items: [],
            routerLink: ['/home']

        },{
        		label: 'FCL',
            items: [],
            routerLink: ['/home']

        },{
        		label: 'Invoice and Billing',
            items: [],
            routerLink: ['/home']

        },{
        		label: 'Administration',
            items: [],
            routerLink: ['/home']

        }];
  	}

		
    public extractTableData(res: Response):any[] {
        let body = res.json();
        if ((body.Data[0] != null) && (body.Data[0] != undefined)){
            if (this.showAll ){
                this.tableHeadings = Object.keys(body.Data[0]);
            }
            this.populateColumnSelector();
            this.totalCount = body.Data.length;
            return body.Data;
        }else {
            body.Data = ['No data'];
            return body.Data;
        }
    }

    public populateColumnSelector(){
        this.columnOptions = [];
        for(let i = 0; i < this.tableHeadings.length; i++) {
            this.columnOptions.push({label: this.tableHeadings[i], value: this.tableHeadings[i]});
        }
    }

    public getTotalCount(){
        return this.totalCount;
    }

    public getColumnOptions(){
        return this.columnOptions;
    }

    getUsername(){
        return sessionStorage.getItem("username");
    }
		
}
