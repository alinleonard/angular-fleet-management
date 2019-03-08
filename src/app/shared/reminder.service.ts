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

    private reminders: Reminder[] = [new Reminder('Asigurare RCA'), new Reminder('Vinieta')];

    constructor(private http: Http, private authService: AuthService) { }

    getReminders() {
        // return this.reminders.slice();
        const token = this.authService.getToken();
        return this.http.get(this.baseApiUrl + '/reminders.json?auth=' + token)
            .pipe(map(
                (response: Response) => {
                    let reminders: Reminder[] = response.json();
                    if (!reminders) {
                        reminders = [];
                    }
                    this.setReminders(reminders);
                    return reminders;
                }
            ));
    }

    getReminder(index: number) {
        return this.reminders[index];
    }

    setReminders(reminders: Reminder[]) {
        this.reminders = reminders;
    }

    addReminder(reminder: Reminder) {
        const token = this.authService.getToken();
        const tempReminders: Reminder[] = [reminder];
        this.http.put(this.baseApiUrl + '/reminders.json?auth=' + token, tempReminders)
            .subscribe((res) => {
                this.reminders.push(reminder);
                this.remindersChanged.next(this.reminders.slice());
            }, (err) => {
                console.log(err);
            });
    }

    updateReminder(index: number, newReminder: Reminder) {
        const token = this.authService.getToken();

        this.http.put(this.baseApiUrl + '/reminders/' + index + '.json?auth=' + token, newReminder)
            .subscribe((res) => {
                this.reminders[index] = newReminder;
                this.remindersChanged.next(this.reminders.slice());
            }, (err) => {
                console.log(err);
            });
    }

    deleteReminder(index: number) {
        const token = this.authService.getToken();

        this.http.delete(this.baseApiUrl + '/reminders/' + index + '.json?auth=' + token)
            .subscribe((res) => {
                this.reminders.splice(index, 1);
                this.remindersChanged.next(this.reminders.slice());
            }, (err) => {
                console.log(err);
            });
    }
}
