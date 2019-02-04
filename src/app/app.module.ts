import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleItemComponent } from './vehicle/vehicle-item/vehicle-item.component';
import { VehicleEditComponent } from './vehicle/vehicle-edit/vehicle-edit.component';
import { ReminderComponent } from './reminder/reminder.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReminderRenewalListComponent } from './reminder/reminder-renewal-list/reminder-renewal-list.component';
import { ReminderRenewalItemComponent } from './reminder/reminder-renewal-list/reminder-renewal-item/reminder-renewal-item.component';
import { VehicleDetailComponent } from './vehicle/vehicle-detail/vehicle-detail.component';
import { VehicleStartComponent } from './vehicle/vehicle-start/vehicle-start.component';
import { DropdownDirective } from './shared/dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VehicleComponent,
    VehicleItemComponent,
    VehicleEditComponent,
    ReminderComponent,
    NotFoundComponent,
    ReminderRenewalListComponent,
    ReminderRenewalItemComponent,
    VehicleDetailComponent,
    VehicleStartComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
