import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrackerService } from '../tracker/tracker.service';
import { Tracker } from '../tracker/tracker.model';
declare let L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  private map: any;
  private mapLayer: any;
  private subscription: Subscription;

  unassignedTrackers: Tracker[];
  assignedTrackers: Tracker[];

  constructor(private tService: TrackerService) { }

  ngOnInit() {
    L.Icon.Default.imagePath = './assets/leaflet/images/';
    this.map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    ).addTo(this.map);

    this.subscription = this.tService.selectedTracker.subscribe((tracker) => {
      this.renderOnMap(tracker);
    });

    this.unassignedTrackers = this.tService.getUnassinedTrackers();
    this.assignedTrackers = this.tService.getAssignedTrackers();

  }

  renderOnMap(tracker: Tracker) {
    if (this.mapLayer !== undefined) {
      this.mapLayer.clearLayers();
    }

    if (tracker.positions === undefined) {
      return true;
    }

    this.mapLayer = L.geoJSON().addTo(this.map);

    for (const echo of tracker.positions) {
      const feature = {
        type: 'Feature',
        properties: {
          name: 'name',
          amenity: 'amenity',
          popupContent: 'popup content'
        },
        geometry: {
          type: 'Point',
          coordinates: [echo.lon, echo.lat]
        }
      };
      this.mapLayer
        .bindPopup(`
          <b>Car<b>
          <div>Speed: ${echo.speed} km/h</div>
          <div>Date: ${echo.date_posted}</div>
        `)
        .addData(feature);
    }

    const lnglats = tracker.positions.map((obj) => {
      return [obj.lon, obj.lat];
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
    const tracker = this.tService.getTracker(id);
    this.tService.selectedTracker.next(tracker);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
