import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tracker } from '../tracker.model';
import { TrackerService } from '../tracker.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracker-list',
  templateUrl: './tracker-list.component.html',
  styleUrls: ['./tracker-list.component.scss']
})
export class TrackerListComponent implements OnInit, OnDestroy {
  trackers: Tracker[];
  private subscription: Subscription;

  constructor(private trackerService: TrackerService) { }

  ngOnInit() {
    this.trackers = this.trackerService.getTrackers();
    this.subscription = this.trackerService.trackerChanged.subscribe((trackers) => {
      this.trackers = trackers;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
