import { Reminder } from './reminder.module';

export class ReminderService {
    private reminders: Reminder[] = [
        { name: 'Asigurare RCA'},
        { name: 'Vinieta'}
    ];

    getReminders() {
        return this.reminders.slice();
    }
}
