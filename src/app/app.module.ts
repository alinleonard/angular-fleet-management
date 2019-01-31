import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleItemComponent } from './vehicle/vehicle-item/vehicle-item.component';
import { VehicleEditComponent } from './vehicle/vehicle-edit/vehicle-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VehicleComponent,
    VehicleItemComponent,
    VehicleEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
