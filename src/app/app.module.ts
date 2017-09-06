import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { KeysAndValuesPipe } from './shared/keys-and-values.pipe';
import { AppAuthService } from './shared/app-auth.service';
import { AppRoutes } from './app.routes';
import { Applog } from './applog';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppContainerComponent } from './app-container/app-container.component';
import { SimpleBookingsComponent } from './simple-bookings/simple-bookings.component';
import { SimpleBookingsService } from './simple-bookings/simple-bookings.service'
import { DropOffContainerComponent } from './drop-off/drop-off-container/drop-off-container.component';
import { DropOffTimeComponent } from './drop-off/drop-off-time/drop-off-time.component';
import { DropOffConfirmationComponent } from './drop-off/drop-off-confirmation/drop-off-confirmation.component';
import { PickUpReleaseNoComponent } from './pick-up/pick-up-release-no/pick-up-release-no.component';
import { PickUpTimeComponent } from './pick-up/pick-up-time/pick-up-time.component';
import { PickUpConfirmationComponent } from './pick-up/pick-up-confirmation/pick-up-confirmation.component';
import { TokenRefresher } from './shared/token-refresher';


import { InputTextModule, DataTableModule, ButtonModule, DialogModule, AccordionModule} from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';
import { PanelMenuModule, MenuModule, MenuItem, SplitButtonModule, OverlayPanelModule, ContextMenuModule, MultiSelectModule, MegaMenuModule, CarouselModule} from 'primeng/primeng';
import { AutoCompleteModule, DropdownModule, SelectButtonModule, InputSwitchModule, MessagesModule, CalendarModule, GrowlModule } from 'primeng/primeng';
import { InputTextareaModule, CheckboxModule, RadioButtonModule} from 'primeng/primeng';





@NgModule({
  declarations: [
      AppComponent,
      LoginComponent,
      DashboardComponent,
      SimpleBookingsComponent,
      AppContainerComponent,
      KeysAndValuesPipe,
      DropOffContainerComponent,
      DropOffTimeComponent,
      DropOffConfirmationComponent,
      PickUpReleaseNoComponent,
      PickUpTimeComponent,
      PickUpConfirmationComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      InputTextModule,
      DataTableModule,
      ButtonModule,
      DialogModule,
      AccordionModule,
      RouterModule,
      RouterModule.forRoot(AppRoutes),
      PanelMenuModule,
      SplitButtonModule,
      MenuModule,
      OverlayPanelModule,
      ContextMenuModule,
      MultiSelectModule,
      TabViewModule,
      MegaMenuModule,
      AutoCompleteModule,
      DropdownModule,
      SelectButtonModule,
      InputSwitchModule,
      MessagesModule,
      GrowlModule,
      CalendarModule,
      GrowlModule,
      CalendarModule,
      InputTextareaModule,
      CheckboxModule,
      CarouselModule,
      RadioButtonModule
  ],

    providers: [Applog, AppAuthService, SimpleBookingsService, TokenRefresher, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
