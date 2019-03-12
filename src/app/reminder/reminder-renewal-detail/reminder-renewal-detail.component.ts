import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reminder } from 'src/app/shared/reminder.module';
import { ReminderService } from 'src/app/shared/reminder.service';

@Component({
  selector: 'app-reminder-renewal-detail',
  templateUrl: './reminder-renewal-detail.component.html',
  styleUrls: ['./reminder-renewal-detail.component.scss']
})
export class ReminderRenewalDetailComponent implements OnInit {
  id: number;
  reminder: Reminder;

  constructor(private route: ActivatedRoute, private rService: ReminderService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.reminder = this.rService.getReminder(this.id);
    });
    this.rService.remindersChanged.subscribe((reminders: Reminder[]) => {
      this.reminder = reminders[this.id];
    });
  }

  onDeleteReminder() {
    this.rService.deleteReminder(this.id);
    this.rService.storeRemindersToServer().subscribe((res) => {
      this.router.navigate(['../'], { relativeTo: this.route });
    }, (err) => {
      console.log(err);
    });
  }

}
