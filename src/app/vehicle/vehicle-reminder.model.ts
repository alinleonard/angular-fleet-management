import { Reminder } from '../shared/reminder.module';

export class VehicleReminder {
    public reminder: Reminder;
    public trigger: {
        date: Date;
    };

    constructor(reminder: Reminder, trigger: { date: Date }) {
        this.reminder = reminder;
        this.trigger = trigger;
    }
}
