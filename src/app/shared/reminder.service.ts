import { Reminder } from './reminder.module';
import { Subject } from 'rxjs';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class ReminderService {
    remindersChanged = new Subject<Reminder[]>();
    private baseApiUrl = 'https://fleet-management-api.firebaseio.com';

    private reminders: Reminder[] = [];

    constructor(private http: Http, private authService: AuthService) { }

    getReminders() {
        return this.reminders.slice();
    }

    getReminder(index: number) {
        return this.reminders[index];
    }

    setReminders(reminders: Reminder[]) {
        this.reminders = reminders;
        this.remindersChanged.next(this.reminders.slice());
    }

    addReminder(reminder: Reminder) {
        this.reminders.push(reminder);
        this.remindersChanged.next(this.reminders.slice());
    }

    updateReminder(index: number, newReminder: Reminder) {
        this.reminders[index] = newReminder;
        this.remindersChanged.next(this.reminders.slice());
    }

    deleteReminder(index: number) {
        this.reminders.splice(index, 1);
        this.remindersChanged.next(this.reminders.slice());
    }

    /**
     * HTTP
     */

     getRemindersFromServer() {
        const token = this.authService.getToken();
        this.http.get(this.baseApiUrl + '/reminders.json?auth=' + token)
            .pipe(map(
                (response: Response) => {
                    let reminders: Reminder[] = response.json();
                    if (!reminders) {
                        reminders = [];
                    }
                    this.setReminders(reminders);
                    return reminders;
                }
            ))
            .subscribe((reminders: Reminder[]) => {
                this.setReminders(reminders);
            });
     }

     storeRemindersToServer() {
        const token = this.authService.getToken();
        return this.http.put(this.baseApiUrl + '/reminders.json?auth=' + token, this.getReminders());
     }
}
