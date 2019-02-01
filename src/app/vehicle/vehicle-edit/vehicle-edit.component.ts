import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Vehicle } from '../vehicle.model';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.scss']
})
export class VehicleEditComponent implements OnInit {
  isSelectedVehicle: Boolean = false;

  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('manufacturerInput') manufacturerInputRef: ElementRef;
  @ViewChild('modelInput') modelInputInputRef: ElementRef;
  @ViewChild('yearInput') yearInputRef: ElementRef;

  constructor(private vService: VehicleService) { }

  ngOnInit() {
    this.vService.onSelectedVehicle.subscribe((vehicle: Vehicle) => {
      this.isSelectedVehicle = true;
    });
  }

  onAddItem() {
    const newVehicle = new Vehicle(
      0,
      this.nameInputRef.nativeElement.value,
      this.manufacturerInputRef.nativeElement.value,
      this.modelInputInputRef.nativeElement.value,
      this.yearInputRef.nativeElement.value);
    this.vService.addVehicleItem(newVehicle);
  }

}
