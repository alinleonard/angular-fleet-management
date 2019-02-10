import { Reminder } from '../shared/reminder.module';

export class Vehicle {
    public _id: number;
    public name: string;
    public manufacturer: string;
    public model: string;
    public year: number;

    constructor(name: string, manufacturer: string, model: string, year: number) {
        this.name = name;
        this.manufacturer = manufacturer;
        this.model = model;
        this.year = year;
    }
}
