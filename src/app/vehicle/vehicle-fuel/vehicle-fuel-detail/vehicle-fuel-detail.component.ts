import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VehicleService } from '../../vehicle.service';
import { VehicleFuel } from '../vehicle-fuel.model';
declare let L: any;

@Component({
  selector: 'app-vehicle-fuel-detail',
  templateUrl: './vehicle-fuel-detail.component.html',
  styleUrls: ['./vehicle-fuel-detail.component.scss']
})
export class VehicleFuelDetailComponent implements OnInit, OnDestroy {
  index: number;
  vehicleId: number;
  fuelEntry: VehicleFuel;
  map: any;

  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private  router: Router, private vehicleService: VehicleService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.index = +params['entry'];
      this.vehicleId = +params['id'];
      this.fuelEntry = this.vehicleService.getVehicle(this.vehicleId).fuel[this.index];
    });

    this.map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo:  this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
