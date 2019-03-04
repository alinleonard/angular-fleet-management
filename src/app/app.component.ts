import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-fleet-management';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: '',
      authDomain: ''
    });
  }
}
