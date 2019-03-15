import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../shared/vehicle.service';
import { Subscription } from 'rxjs';
import { Vehicle } from '../shared/vehicle.model';
import { VehicleFuel } from './vehicle-fuel.model';

@Component({
  selector: 'app-vehicle-fuel',
  templateUrl: './vehicle-fuel.component.html',
  styleUrls: ['./vehicle-fuel.component.scss']
})
export class VehicleFuelComponent implements OnInit, OnDestroy {
  vehicleId: number;
  private subscription: Subscription;
  vehicle: Vehicle;
  fuel: VehicleFuel[];

  constructor(private route: ActivatedRoute, private router: Router, private vehicleService: VehicleService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.vehicleId = +params['id'];
      this.vehicle = this.vehicleService.getVehicle(this.vehicleId);
      (this.vehicle.fuel !== null && this.vehicle.fuel !== undefined) ? this.fuel = this.vehicle.fuel : this.fuel = [];
    });
  }

  getTotalFuelCost() {
    return this.fuel.reduce((acc, obj) => {
      return acc + (obj.liters * obj.pricePerLiter);
    }, 0).toFixed(2);
  }

  getTotalLiters(): number {
    return this.fuel.reduce((acc, obj) => {
      return acc + obj.liters;
    }, 0);
  }

  onAddFuelEntry() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
