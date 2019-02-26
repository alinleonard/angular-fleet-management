import { Echo } from './echo.model';
import { Subject } from 'rxjs';

export class EchoService {
    echoChanged = new Subject<Echo[]>();

    private echos: Echo[] = [
        {
            trackerId: 0,
            position: {
                lat: 51.505,
                lon: -0.09,
                speed: 50,
                alt: 500,
                date_posted: new Date()
            },
            gps: {
                sn: '123'
            }
        },
        {
            trackerId: 0,
            position: {
                lat: 22,
                lon: 22,
                speed: 55,
                alt: 500,
                date_posted: new Date()
            },
            gps: {
                sn: '123'
            }
        },
        {
            trackerId: 1,
            position: {
                lat: 51.505,
                lon: -0.09,
                speed: 50,
                alt: 500,
                date_posted: new Date()
            },
            gps: {
                sn: '123'
            }
        },
        {
            trackerId: 1,
            position: {
                lat: 51.605,
                lon: -0.29,
                speed: 55,
                alt: 500,
                date_posted: new Date()
            },
            gps: {
                sn: '123'
            }
        },
        {
            trackerId: 1,
            position: {
                lat: 52.605,
                lon: -0.39,
                speed: 55,
                alt: 500,
                date_posted: new Date()
            },
            gps: {
                sn: '123'
            }
        }
    ];

    getEchos() {
        return this.echos.slice();
    }

    getEchosByTrackerId(trackerId: number) {
        return this.echos.filter(item => item.trackerId === trackerId).slice();
    }
}

