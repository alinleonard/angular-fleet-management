import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Reminder } from 'src/app/shared/reminder.module';
import { ReminderService } from 'src/app/shared/reminder.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../shared/vehicle.service';
import { Vehicle } from '../shared/vehicle.model';
import { VehicleReminder } from './vehicle-reminder.model';

@Component({
  selector: 'app-vehicle-reminder',
  templateUrl: './vehicle-reminder.component.html',
  styleUrls: ['./vehicle-reminder.component.scss']
})
export class VehicleReminderComponent implements OnInit {
  form: FormGroup;
  reminders: Reminder[];
  vehicle: Vehicle;
  index: number;

  constructor(private rService: ReminderService,
    private route: ActivatedRoute,
    private router: Router,
    private vService: VehicleService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.index = +params['id'];
      this.vehicle = this.vService.getVehicle(this.index);
    });

    this.reminders = this.rService.getReminders();
    this.rService.getRemindersFromServer();

    this.rService.remindersChanged.subscribe((reminders: Reminder[]) => {
      this.reminders = reminders;
    });

    this.form = new FormGroup({
      reminderId: new FormControl(0),
      date: new FormControl(new Date)
    });
  }

  onSubmit() {
    const newReminder: VehicleReminder = this.form.value;
    const updatedVehicle: Vehicle = this.vehicle;
    const reminders: VehicleReminder[] = updatedVehicle.reminders != null ? updatedVehicle.reminders : [];
    reminders.push(newReminder);
    updatedVehicle.reminders = reminders;
    this.vService.updateVehicle(this.index, updatedVehicle);

    this.vService.storeVehicleToServer().subscribe((res) => {
      console.log('stored');
    }, (err) => {
      console.log(err);
    });
  }

  onRemoveReminder(reminderIndex: number) {
    this.vehicle.reminders.splice(reminderIndex, 1);
    this.vService.updateVehicle(this.index, this.vehicle);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
