import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Vehicle } from '../vehicle.model';
import { VehicleService } from '../vehicle.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.scss']
})
export class VehicleEditComponent implements OnInit {
  id: number;
  isEdit = false;

  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('manufacturerInput') manufacturerInputRef: ElementRef;
  @ViewChild('modelInput') modelInputInputRef: ElementRef;
  @ViewChild('yearInput') yearInputRef: ElementRef;

  constructor(private vService: VehicleService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.isEdit = params['id'] != null;
      console.log(this.isEdit);
    });
  }

  onAddItem() {
    const newVehicle = new Vehicle(
      this.nameInputRef.nativeElement.value,
      this.manufacturerInputRef.nativeElement.value,
      this.modelInputInputRef.nativeElement.value,
      this.yearInputRef.nativeElement.value);
    this.vService.addVehicleItem(newVehicle);
  }

}
