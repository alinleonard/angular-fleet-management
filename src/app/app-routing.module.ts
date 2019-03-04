import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VehicleComponent } from './vehicle/vehicle.component';
import { ReminderComponent } from './reminder/reminder.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VehicleDetailComponent } from './vehicle/vehicle-detail/vehicle-detail.component';
import { VehicleStartComponent } from './vehicle/vehicle-start/vehicle-start.component';
import { VehicleEditComponent } from './vehicle/vehicle-edit/vehicle-edit.component';
import { ReminderStartComponent } from './reminder/reminder-start/reminder-start.component';
import { ReminderRenewalEditComponent } from './reminder/reminder-renewal-edit/reminder-renewal-edit.component';
import { ReminderRenewalDetailComponent } from './reminder/reminder-renewal-detail/reminder-renewal-detail.component';
import { VehicleReminderComponent } from './vehicle/vehicle-reminder/vehicle-reminder.component';
import { MapComponent } from './map/map.component';
import { TrackerComponent } from './tracker/tracker.component';
import { TrackerStartComponent } from './tracker/tracker-start/tracker-start.component';
import { TrackerEditComponent } from './tracker/tracker-edit/tracker-edit.component';
import { TrackerDetailComponent } from './tracker/tracker-detail/tracker-detail.component';
import { VehicleFuelComponent } from './vehicle/vehicle-fuel/vehicle-fuel.component';
import { VehicleFuelDetailComponent } from './vehicle/vehicle-fuel/vehicle-fuel-detail/vehicle-fuel-detail.component';
import { VehicleFuelEditComponent } from './vehicle/vehicle-fuel/vehicle-fuel-edit/vehicle-fuel-edit.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuard } from './auth/auth-guard.service';

const appRoutes: Routes = [
    { path: '', redirectTo: '/vehicles', pathMatch: 'full' },
    {
        path: 'vehicles',
        component: VehicleComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: VehicleStartComponent },
            { path: 'new', component: VehicleEditComponent },
            { path: ':id', component: VehicleDetailComponent },
            { path: ':id/edit', component: VehicleEditComponent },
            { path: ':id/reminder', component: VehicleReminderComponent },
            { path: ':id/fuel', component: VehicleFuelComponent },
            { path: ':id/fuel/new', component: VehicleFuelEditComponent },
            { path: ':id/fuel/:entry', component: VehicleFuelDetailComponent },
            { path: ':id/fuel/:entry/edit', component: VehicleFuelEditComponent }
        ]
    },
    {
        path: 'reminders',
        component: ReminderComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ReminderStartComponent },
            { path: 'new', component: ReminderRenewalEditComponent },
            { path: ':id', component: ReminderRenewalDetailComponent },
            { path: ':id/edit', component: ReminderRenewalEditComponent },
        ]
    },
    {
        path: 'trackers',
        component: TrackerComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '',  component: TrackerStartComponent },
            { path: 'new',  component: TrackerEditComponent },
            { path: ':id',  component: TrackerDetailComponent },
            { path: ':id/edit',  component: TrackerEditComponent }
        ]
    },
    {
        path: 'map',
        canActivate: [AuthGuard],
        component: MapComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'signin',
        component: SigninComponent
    },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
