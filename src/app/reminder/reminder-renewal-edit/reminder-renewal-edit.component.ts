import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReminderService } from 'src/app/shared/reminder.service';
import { Reminder } from 'src/app/shared/reminder.module';

@Component({
  selector: 'app-reminder-renewal-edit',
  templateUrl: './reminder-renewal-edit.component.html',
  styleUrls: ['./reminder-renewal-edit.component.scss']
})
export class ReminderRenewalEditComponent implements OnInit {
  isEdit = false;
  id: number;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private rService: ReminderService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.isEdit = params['id'] != null;
      this.id = +params['id'];
      this.initForm();
    });
  }

  private initForm() {
    let name = '';
    if (this.isEdit) {
      const reminder = this.rService.getReminder(this.id);
      name =  reminder.name;
    }
    this.form = new FormGroup({
      name: new FormControl(name, Validators.required)
    });
  }

  onSubmit() {
    if (this.isEdit) {
      this.rService.updateReminder(this.id, this.form.value);
    } else {
      this.rService.addReminder(this.form.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route});
  }

}
