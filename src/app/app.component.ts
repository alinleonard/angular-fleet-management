import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-fleet-management';

  constructor(private authSerice: AuthService) { }

  ngOnInit() {
    // Initialize Firebase
    const config = {

    };
    firebase.initializeApp(config);

    this.authSerice.checkForStoredAuth();
  }
}
