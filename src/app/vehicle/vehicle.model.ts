import { VehicleReminder } from './vehicle-reminder/vehicle-reminder.model';
import { VehicleFuel } from './vehicle-fuel/vehicle-fuel.model';

export class Vehicle {
    public _id: number;
    public name: string;
    public manufacturer: string;
    public model: string;
    public year: number;
    public reminders: VehicleReminder[];
    public fuel: VehicleFuel[];

    constructor(id: number, name: string, manufacturer: string, model: string, year: number) {
        this._id = id;
        this.name = name;
        this.manufacturer = manufacturer;
        this.model = model;
        this.year = year;
    }
}
