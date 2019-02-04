import { Component, OnInit } from '@angular/core';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.model';
import { ReminderService } from '../shared/reminder.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
  providers: [VehicleService, ReminderService]
})
export class VehicleComponent implements OnInit {

  vehicles: Vehicle[];

  constructor(private vService: VehicleService) { }

  ngOnInit() {
    this.vehicles = this.vService.getVehicles();
    this.vService.vehicleChanged.subscribe((vehicles) => {
      this.vehicles = vehicles;
    });
  }

}
