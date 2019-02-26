import { Component, OnInit, OnDestroy } from '@angular/core';
import { EchoService } from './echo.service';
import { Echo } from './echo.model';
import { Subscription } from 'rxjs';
import { TrackerService } from './tracker.service';
import { Tracker } from './tracker.model';
declare let L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  private map: any;
  private mapLayer: any;
  private echos: Echo[];
  private subscription: Subscription;

  unassignedTrackers: Tracker[];
  assignedTrackers: Tracker[];

  constructor(private eService: EchoService, private tService: TrackerService) { }

  ngOnInit() {
    this.map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    ).addTo(this.map);

    this.echos = this.eService.getEchosByTrackerId(0);

    this.subscription = this.eService.echoChanged.subscribe((echos) => {
      this.echos = echos;
      this.renderOnMap();
    });

    this.unassignedTrackers = this.tService.getUnassinedTrackers();
    this.assignedTrackers = this.tService.getAssignedTrackers();

  }

  renderOnMap() {
    if (this.mapLayer !== undefined) {
      this.mapLayer.clearLayers();
    }

    this.mapLayer = L.geoJSON().addTo(this.map);

    for (const echo of this.echos) {
      const feature = {
        type: 'Feature',
        properties: {
          name: 'name',
          amenity: 'amenity',
          popupContent: 'popup content'
        },
        geometry: {
          type: 'Point',
          coordinates: [echo.position.lon, echo.position.lat]
        }
      };
      this.mapLayer
        .bindPopup(`
          <b>Car<b>
          <div>Speed: ${echo.position.speed} km/h</div>
          <div>Date: ${echo.position.date_posted}</div>
        `)
        .addData(feature);
    }

    const lnglats = this.echos.map((obj) => {
      return [obj.position.lon, obj.position.lat];
    });
    const paths = [{
        'type': 'LineString',
        'coordinates': lnglats
    }];
    const myStyle = {
      'color': '#ff7800',
      'weight': 5,
      'opacity': 0.65
  };
    this.mapLayer.addData(paths).setStyle(myStyle);
    this.map.fitBounds(this.mapLayer.getBounds());
  }

  onTrackerSelect(id: number) {
    this.eService.echoChanged.next(this.eService.getEchosByTrackerId(id));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
