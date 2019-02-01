import { Component, OnInit } from '@angular/core';
import { ReminderService } from '../shared/reminder.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
  providers: [ReminderService]
})
export class ReminderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
