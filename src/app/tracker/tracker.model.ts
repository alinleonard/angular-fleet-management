export class Tracker {
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

    constructor(sn: string, phone: string) {
        this.sn = sn;
        this.phone = phone;
    }
}
