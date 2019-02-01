import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Vehicle } from '../vehicle.model';
import { Reminder } from 'src/app/shared/reminder.module';
import { ReminderService } from 'src/app/shared/reminder.service';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {
  @Input() vehicle: Vehicle;

  @ViewChild('reminderInput') reminderInputRef: ElementRef;
  @ViewChild('triggerDateInput') triggerDateInputRef: ElementRef;
  @ViewChild('checkboxInput') checkboxInputRef: ElementRef;

  reminders: Reminder[];

  constructor(private rService: ReminderService) { }

  ngOnInit() {
    this.reminders = this.rService.getReminders();
  }

  onAddReminder() {
    const triggerReminderDate: Date = new Date(this.triggerDateInputRef.nativeElement.value);
  }

}
