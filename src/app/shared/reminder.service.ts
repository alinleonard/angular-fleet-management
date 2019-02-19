import { Reminder } from './reminder.module';
import { Subject } from 'rxjs';

export class ReminderService {
    remindersChanged = new Subject<Reminder[]>();

    private reminders: Reminder[] = [new Reminder('Asigurare RCA'), new Reminder('Vinieta')];

    getReminders() {
        return this.reminders.slice();
    }

    getReminder(index: number) {
        return this.reminders[index];
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
}
