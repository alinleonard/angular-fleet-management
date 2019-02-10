import { Component, OnInit, OnDestroy } from '@angular/core';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.model';
import { ReminderService } from '../shared/reminder.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
  providers: []
})
export class VehicleComponent {
}
