import { Component, OnInit, OnDestroy } from '@angular/core';
import { Reminder } from '../../shared/reminder.module';
import { ReminderService } from 'src/app/shared/reminder.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reminder-renewal-list',
  templateUrl: './reminder-renewal-list.component.html',
  styleUrls: ['./reminder-renewal-list.component.scss']
})
export class ReminderRenewalListComponent implements OnInit, OnDestroy {
  reminders: Reminder[];
  private subscription: Subscription;

  constructor(private rService: ReminderService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rService.getReminders().subscribe((reminders: Reminder[]) => {
      this.reminders = reminders;
    });

    this.subscription =  this.rService.remindersChanged.subscribe((reminders) => {
      this.reminders = reminders;
    });
  }

  onNewReminder() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
