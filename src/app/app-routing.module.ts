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

const appRoutes: Routes = [
    { path: '', redirectTo: '/vehicles', pathMatch: 'full' },
    {
        path: 'vehicles',
        component: VehicleComponent,
        children: [
            { path: '', component: VehicleStartComponent },
            { path: 'new', component: VehicleEditComponent },
            { path: ':id', component: VehicleDetailComponent },
            { path: ':id/edit', component: VehicleEditComponent },
            { path: ':id/reminder', component: VehicleReminderComponent }
        ]
    },
    {
        path: 'reminders',
        component: ReminderComponent,
        children: [
            { path: '', component: ReminderStartComponent },
            { path: 'new', component: ReminderRenewalEditComponent },
            { path: ':id', component: ReminderRenewalDetailComponent },
            { path: ':id/edit', component: ReminderRenewalEditComponent },
        ]
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
