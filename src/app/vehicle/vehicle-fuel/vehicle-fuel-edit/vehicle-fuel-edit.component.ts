import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VehicleService } from '../../shared/vehicle.service';
import { VehicleFuel } from '../vehicle-fuel.model';

@Component({
  selector: 'app-vehicle-fuel-edit',
  templateUrl: './vehicle-fuel-edit.component.html',
  styleUrls: ['./vehicle-fuel-edit.component.scss']
})
export class VehicleFuelEditComponent implements OnInit, OnDestroy {
  subscribtion: Subscription;

  entryId: number;
  vehicleId: number;
  isEdit = false;

  form: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private vehicleService: VehicleService) { }

  ngOnInit() {
    this.subscribtion = this.route.params.subscribe((params) => {
      this.entryId = +params['entry'];
      this.vehicleId = +params['id'];
      this.isEdit = params['entry'] != null;
    });
    this.onInitForm();
  }

  onInitForm() {
    this.form = new FormGroup({
      pricePerLiter: new FormControl(null, Validators.required),
      liters: new FormControl(null, Validators.required),
      odometer: new FormControl(null, Validators.required),
      fuelType: new FormControl('Motorina'),
      date: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    console.log('submit');
    const fuelEntry: VehicleFuel = this.form.value;
    const vehicle = this.vehicleService.getVehicle(this.vehicleId);
    if (vehicle.fuel === undefined || vehicle.fuel === null) {
      vehicle.fuel = [];
    }
    vehicle.fuel.push(fuelEntry);
    this.vehicleService.updateVehicle(this.vehicleId, vehicle);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }

}
