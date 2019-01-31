import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../vehicle.model';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.scss']
})
export class VehicleEditComponent implements OnInit {
  vehicle: Vehicle = new Vehicle('','','',0);
  
  constructor(private vService: VehicleService) { }

  ngOnInit() {
  }

  onClear() {
    this.vehicle = new Vehicle('','','',0);
  }

  onSubmit() {
    this.vService.addVehicleItem(this.vehicle);
  }

}
