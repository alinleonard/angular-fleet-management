import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tracker-edit',
  templateUrl: './tracker-edit.component.html',
  styleUrls: ['./tracker-edit.component.scss']
})
export class TrackerEditComponent implements OnInit {
  trackerId: number;
  isEdit = false;

  form: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.trackerId = +params['id'];
      this.isEdit = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    this.form = new FormGroup({

    });
  }

  onSubmit() {

  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
