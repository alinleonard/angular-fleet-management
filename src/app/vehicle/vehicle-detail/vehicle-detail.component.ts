import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Vehicle } from '../vehicle.model';
import { Reminder } from 'src/app/shared/reminder.module';
import { ReminderService } from 'src/app/shared/reminder.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { VehicleService } from '../vehicle.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  vehicle: Vehicle;
  id: number;

  @ViewChild('reminderInput') reminderInputRef: ElementRef;
  @ViewChild('triggerDateInput') triggerDateInputRef: ElementRef;
  @ViewChild('checkboxInput') checkboxInputRef: ElementRef;

  reminders: Reminder[];

  constructor(
    private rService: ReminderService,
    private route: ActivatedRoute,
    private vService: VehicleService,
    private router: Router) {

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.vehicle = this.vService.getVehicle(this.id);
    });

    this.reminders = this.rService.getReminders();

    this.rService.remindersChanged.subscribe((reminders: Reminder[]) => {
      this.reminders = reminders;
    });

    this.subscription = this.vService.vehicleChanged.subscribe((vehicles: Vehicle[]) => {
      this.vehicle = vehicles[this.id];
    });
  }

  onEditVehicle() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onReminderVehicle() {
    this.router.navigate(['reminder'], { relativeTo: this.route });
  }

  onFuelVehicle() {
    this.router.navigate(['fuel'], { relativeTo: this.route });
  }

  onDeleteVehicle() {
    this.vService.deleteVehicle(this.id);
    this.vService.storeVehicleToServer().subscribe((res) => {
      this.router.navigate(['/vehicles']);
    }, (err) => {
      console.log(err);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
