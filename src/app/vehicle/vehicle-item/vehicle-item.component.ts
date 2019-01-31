import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from '../vehicle.model';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-vehicle-item',
  templateUrl: './vehicle-item.component.html',
  styleUrls: ['./vehicle-item.component.scss']
})
export class VehicleItemComponent implements OnInit {
  @Input() vehicle: Vehicle;

  constructor(private vService: VehicleService) { }

  ngOnInit() {
  }

  onVehicleSelected() {
    this.vService.onSelectedVehicle.emit(this.vehicle);
  }

}
