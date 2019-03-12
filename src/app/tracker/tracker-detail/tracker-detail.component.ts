import { Component, OnInit } from '@angular/core';
import { Tracker } from '../tracker.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TrackerService } from '../tracker.service';

@Component({
  selector: 'app-tracker-detail',
  templateUrl: './tracker-detail.component.html',
  styleUrls: ['./tracker-detail.component.scss']
})
export class TrackerDetailComponent implements OnInit {
  tracker: Tracker;
  trackerId: number;

  constructor(private route: ActivatedRoute, private router: Router, private trackerService: TrackerService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.trackerId = +params['id'];
      this.tracker = this.trackerService.getTracker(this.trackerId);
    });
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.trackerService.deleteTracker(this.trackerId);
    this.trackerService.storeTrackersToServer().subscribe((res) => {
      this.router.navigate(['../'], { relativeTo: this.route });
    }, (err) => {
      console.log(err);
    });
  }

}
