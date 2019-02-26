import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tracker } from '../tracker.model';
import { TrackerService } from '../tracker.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tracker-list',
  templateUrl: './tracker-list.component.html',
  styleUrls: ['./tracker-list.component.scss']
})
export class TrackerListComponent implements OnInit, OnDestroy {
  trackers: Tracker[];
  private subscription: Subscription;

  constructor(private trackerService: TrackerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.trackers = this.trackerService.getTrackers();
    this.subscription = this.trackerService.trackerChanged.subscribe((trackers) => {
      this.trackers = trackers;
    });
  }

  onNewTracker() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
