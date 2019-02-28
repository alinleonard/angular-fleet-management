export class Tracker {
    public id: number;
    public vehicleId?: number;

    public sn: string;
    public phone: string;

    public positions: {
        lat: number;
        lon: number;
        alt: number;
        speed: number;
        date_posted: Date;
    }[];

    public type?: string;

    constructor(id: number, sn: string, phone: string) {
        this.id = id;
        this.sn = sn;
        this.phone = phone;
    }
}
