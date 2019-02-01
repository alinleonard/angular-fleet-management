import { Reminder } from '../shared/reminder.module';

export class Vehicle {
    public _id: number;
    public name: string;
    public manufacturer: string;
    public model: string;
    public year: number;
    public reminders?: [
        {
            reminder: Reminder,
            trigger: {
                date?: Date
            },
            created: Date
        }
    ];

    constructor(name: string, manufacturer: string, model: string, year: number) {
        this.name = name;
        this.manufacturer = manufacturer;
        this.model = model;
        this.year = year;
    }
}
