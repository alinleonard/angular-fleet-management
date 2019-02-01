import { Component, OnInit, Input } from '@angular/core';
import { Reminder } from '../../../shared/reminder.module';

@Component({
  selector: 'app-reminder-renewal-item',
  templateUrl: './reminder-renewal-item.component.html',
  styleUrls: ['./reminder-renewal-item.component.scss']
})
export class ReminderRenewalItemComponent implements OnInit {
  @Input() reminder: Reminder;
  constructor() { }

  ngOnInit() {
  }

}
