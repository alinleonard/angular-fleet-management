import { Component, OnInit } from '@angular/core';
import { Reminder } from '../../shared/reminder.module';
import { ReminderService } from 'src/app/shared/reminder.service';

@Component({
  selector: 'app-reminder-renewal-list',
  templateUrl: './reminder-renewal-list.component.html',
  styleUrls: ['./reminder-renewal-list.component.scss']
})
export class ReminderRenewalListComponent implements OnInit {
  reminders: Reminder[];

  constructor(private rService: ReminderService) { }

  ngOnInit() {
    this.reminders = this.rService.getReminders();
  }

}
