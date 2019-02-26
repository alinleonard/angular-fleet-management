export class Echo {
    public trackerId: number;

    public position: {
        lat: number;
        lon: number;
        alt: number;
        speed: number;
        date_posted: Date;
    };

    public gps: {
        sn: string
    };
}
