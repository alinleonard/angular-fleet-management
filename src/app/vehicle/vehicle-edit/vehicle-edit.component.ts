import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Vehicle } from '../vehicle.model';
import { VehicleService } from '../vehicle.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.scss']
})
export class VehicleEditComponent implements OnInit {
  vehicleForm: FormGroup;
  id: number;
  isEdit = false;

  constructor(
    private vService: VehicleService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.isEdit = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let vehicleName = '';
    let vehicleManufacturer = '';
    let vehicleModel = ''
    let vehicleYear: number;
    let vehicleReminders = new FormArray([]);

    if (this.isEdit) {
      const vehicle = this.vService.getVehicle(this.id);
      vehicleName = vehicle.name;
      vehicleManufacturer = vehicle.manufacturer;
      vehicleModel = vehicle.model;
      vehicleYear = vehicle.year;
    }

    this.vehicleForm = new FormGroup({
      'name': new FormControl(vehicleName, Validators.required),
      'manufacturer': new FormControl(vehicleManufacturer, Validators.required),
      'model': new FormControl(vehicleModel, Validators.required),
      'year': new FormControl(vehicleYear, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
      'reminders': vehicleReminders
    });
  }

  getControls() {
    return (<FormArray>this.vehicleForm.get('reminders')).controls;
  }

  onSubmit() {
    if(this.isEdit) {
      this.vService.updateVehicle(this.id, this.vehicleForm.value);
    } else {
      this.vService.addVehicle(this.vehicleForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
