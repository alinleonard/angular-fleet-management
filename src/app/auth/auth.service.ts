import * as firebase from 'firebase/app';
import 'firebase/auth';

import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    token: string;

    constructor(private router: Router) { }

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                (response) => {
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => {
                                this.token = token;
                                console.log(token);
                                this.router.navigate(['/']);
                            }
                        );
                }
            )
            .catch(
                error => console.log(error)
            );
    }

    signinUser(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                (response) => {
                    this.router.navigate(['/']);
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => {
                                this.token = token;
                            }
                        );
                }
            );
    }

    logout() {
        firebase.auth().signOut()
            .then(
                (response) => {
                    this.router.navigate(['/signin']);
                }
            );
        this.token = null;
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => {
                    this.token = token;
                }
            ).catch(error => {
                console.log(error);
            });
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

    checkForStoredAuth() {
        console.log('check');
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            user.getIdToken().then(
              (token: string) => {
                this.router.navigate(['/']);
                this.token = token;
              }
            );
          } else {
            this.token = null;
          }
        });
      }
}
