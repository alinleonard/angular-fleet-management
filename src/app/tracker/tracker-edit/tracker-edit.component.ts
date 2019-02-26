import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Vehicle } from 'src/app/vehicle/vehicle.model';
import { VehicleService } from 'src/app/vehicle/vehicle.service';

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
    private vehicleService: VehicleService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.trackerId = +params['id'];
      this.isEdit = params['id'] != null;
      this.vehicles = this.vehicleService.getVehicles();
      this.initForm();
    });
  }

  initForm() {
    this.form = new FormGroup({
      sn: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required)
    });
  }

  onSetVehicle() {
    const assignedVehicleId = this.selectedOptionRef.nativeElement.selectedOptions[0].value;
  }

  onSubmit() {

  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
