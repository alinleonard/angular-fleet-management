import { VehicleReminder } from '../vehicle-reminder/vehicle-reminder.model';
import { VehicleFuel } from '../vehicle-fuel/vehicle-fuel.model';

export class Vehicle {
    public $key: string;
    public name: string;
    public manufacturer: string;
    public model: string;
    public year: number;
    public reminders: VehicleReminder[];
    public fuel: VehicleFuel[];

    constructor(name: string, manufacturer: string, model: string, year: number) {
        this.name = name;
        this.manufacturer = manufacturer;
        this.model = model;
        this.year = year;
    }
}
