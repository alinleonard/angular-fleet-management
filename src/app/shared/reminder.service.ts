import { Reminder } from './reminder.module';

export class ReminderService {
    private reminders: Reminder[] = [
        {_id: 0, name: 'Asigurare RCA'},
        {_id: 1, name: 'Vinieta'}
    ];

    getReminders() {
        return this.reminders.slice();
    }
}
