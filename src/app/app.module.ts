import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleItemComponent } from './vehicle/vehicle-list/vehicle-item/vehicle-item.component';
import { VehicleEditComponent } from './vehicle/vehicle-edit/vehicle-edit.component';
import { ReminderComponent } from './reminder/reminder.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReminderRenewalListComponent } from './reminder/reminder-renewal-list/reminder-renewal-list.component';
import { ReminderRenewalItemComponent } from './reminder/reminder-renewal-list/reminder-renewal-item/reminder-renewal-item.component';
import { VehicleDetailComponent } from './vehicle/vehicle-detail/vehicle-detail.component';
import { VehicleStartComponent } from './vehicle/vehicle-start/vehicle-start.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';

import { VehicleService } from 'src/app/vehicle/vehicle.service';
import { ReminderService } from 'src/app/shared/reminder.service';
import { ReminderStartComponent } from './reminder/reminder-start/reminder-start.component';
import { ReminderRenewalEditComponent } from './reminder/reminder-renewal-edit/reminder-renewal-edit.component';
import { ReminderRenewalDetailComponent } from './reminder/reminder-renewal-detail/reminder-renewal-detail.component';
import { VehicleReminderComponent } from './vehicle/vehicle-reminder/vehicle-reminder.component';
import { MapComponent } from './map/map.component';
import { TrackerService } from './tracker/tracker.service';
import { MapDetailComponent } from './map/map-detail/map-detail.component';
import { TrackerComponent } from './tracker/tracker.component';
import { TrackerListComponent } from './tracker/tracker-list/tracker-list.component';
import { TrackerItemComponent } from './tracker/tracker-list/tracker-item/tracker-item.component';
import { TrackerDetailComponent } from './tracker/tracker-detail/tracker-detail.component';
import { TrackerEditComponent } from './tracker/tracker-edit/tracker-edit.component';
import { TrackerStartComponent } from './tracker/tracker-start/tracker-start.component';

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
    DropdownDirective,
    VehicleListComponent,
    ReminderStartComponent,
    ReminderRenewalEditComponent,
    ReminderRenewalDetailComponent,
    VehicleReminderComponent,
    MapComponent,
    MapDetailComponent,
    TrackerComponent,
    TrackerListComponent,
    TrackerItemComponent,
    TrackerDetailComponent,
    TrackerEditComponent,
    TrackerStartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [VehicleService, ReminderService, TrackerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
