import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VehicleComponent } from './vehicle/vehicle.component';
import { ReminderComponent } from './reminder/reminder.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VehicleDetailComponent } from './vehicle/vehicle-detail/vehicle-detail.component';
import { VehicleStartComponent } from './vehicle/vehicle-start/vehicle-start.component';
import { VehicleEditComponent } from './vehicle/vehicle-edit/vehicle-edit.component';

const appRoutes: Routes = [
    { path: '', component: VehicleComponent },
    {
        path: 'vehicle',
        component: VehicleComponent,
        children: [
            { path: '', component: VehicleStartComponent },
            { path: 'new', component: VehicleEditComponent },
            { path: ':id', component: VehicleDetailComponent },
            { path: ':id/edit', component: VehicleEditComponent }
        ]
    },
    { path: 'reminder', component: ReminderComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
