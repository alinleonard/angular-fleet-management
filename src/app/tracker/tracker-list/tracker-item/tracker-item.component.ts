import { Component, OnInit, Input } from '@angular/core';
import { Tracker } from '../../tracker.model';

@Component({
  selector: 'app-tracker-item',
  templateUrl: './tracker-item.component.html',
  styleUrls: ['./tracker-item.component.scss']
})
export class TrackerItemComponent implements OnInit {
  @Input() tracker: Tracker;

  constructor() { }

  ngOnInit() {
  }

  getLastPositionPostedDate(): string {
    return (this.tracker.positions) ? this.tracker.positions[this.tracker.positions.length - 1].date_posted.toString() : 'no data';
  }

}
