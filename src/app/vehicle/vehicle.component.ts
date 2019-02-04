import { Component, OnInit, OnDestroy } from '@angular/core';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.model';
import { ReminderService } from '../shared/reminder.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
  providers: [VehicleService, ReminderService]
})
export class VehicleComponent implements OnInit, OnDestroy {
  vehicles: Vehicle[];
  private subscription: Subscription;

  constructor(private vService: VehicleService) { }

  ngOnInit() {
    this.vehicles = this.vService.getVehicles();
    this.subscription = this.vService.vehicleChanged.subscribe((vehicles) => {
      this.vehicles = vehicles;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
