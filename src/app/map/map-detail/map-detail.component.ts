import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TrackerService } from '../../tracker/tracker.service';
import { Tracker } from '../../tracker/tracker.model';
import { Vehicle } from 'src/app/vehicle/vehicle.model';
import { VehicleService } from 'src/app/vehicle/vehicle.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map-detail',
  templateUrl: './map-detail.component.html',
  styleUrls: ['./map-detail.component.scss']
})
export class MapDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  tracker: Tracker;
  vehicle: Vehicle;
  isAssigned = false;

  constructor(private trackerService: TrackerService, private vehicleService: VehicleService) { }

  ngOnInit() {
    this.subscription = this.trackerService.selectedTracker.subscribe((tracker: Tracker) => {
      this.tracker = tracker;
      this.isAssigned = this.tracker.vehicleId !== undefined;

      if (this.isAssigned) {
        this.vehicle = this.vehicleService.getVehicle(this.tracker.vehicleId);
      }
    }, (e) => {
      console.log('error:', e);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
