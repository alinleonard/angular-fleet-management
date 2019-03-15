import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Vehicle } from 'src/app/vehicle/shared/vehicle.model';
import { VehicleService } from 'src/app/vehicle/shared/vehicle.service';
import { TrackerService } from '../tracker.service';

@Component({
  selector: 'app-tracker-edit',
  templateUrl: './tracker-edit.component.html',
  styleUrls: ['./tracker-edit.component.scss']
})
export class TrackerEditComponent implements OnInit {
  trackerId: number;
  isEdit = false;

  form: FormGroup;
  vehicles: Vehicle[];
  @ViewChild('selectedOption') selectedOptionRef: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router,
    private vehicleService: VehicleService,
    private trackerService: TrackerService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.trackerId = +params['id'];
      this.isEdit = params['id'] != null;

      this.vehicles = this.vehicleService.getVehicles();
      this.vehicleService.getVehiclesFromServer();

      this.vehicleService.vehicleChanged.subscribe((vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
      });

      this.initForm();
    });
  }

  initForm() {
    let sn = '';
    let phone = '';
    let vehicleId = null;
    let vehicleName = '';

    if (this.isEdit) {
      const tracker = this.trackerService.getTracker(this.trackerId);
      sn = tracker.sn;
      phone = tracker.phone;
      vehicleId = tracker.vehicleId;
      vehicleName = this.vehicles[vehicleId].name;
    }

    this.form = new FormGroup({
      sn: new FormControl(sn, Validators.required),
      phone: new FormControl(phone, Validators.required),
      vehicleName: new FormControl({value: vehicleName, disabled: true}),
      vehicleId: new FormControl(vehicleId)
    });
  }

  onSetVehicle() {
    const assignedVehicle = this.selectedOptionRef.nativeElement.selectedOptions[0];
    this.form.patchValue({
      'vehicleName': assignedVehicle.innerText,
      'vehicleId': assignedVehicle.value
    });
  }

  onClearVehicle() {
    this.form.patchValue({
      'vehicleName': null,
      'vehicleId': null
    });
  }

  onSubmit() {
    if (!this.isEdit) {
      this.trackerService.addTracker(this.form.value);
    } else {
      this.trackerService.updateTracker(this.form.value, this.trackerId);
    }

    this.trackerService.storeTrackersToServer().subscribe((res) => {
      this.onCancel();
    }, (err) => {
      console.log(err);
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
