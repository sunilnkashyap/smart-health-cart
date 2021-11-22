import { Component, OnInit, Optional } from '@angular/core';
import { Injector } from "@angular/core";
import { Auth, authState, signInAnonymously, signOut, User } from '@angular/fire/auth';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { BasePage } from 'src/app/base-page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BasePage implements OnInit {

  public userData$: Observable<any>;
  public readonly user: Observable<User | null> = EMPTY;

  constructor(injector: Injector) {
    super(injector);
    this.userData$ = this.getFireData('users/sunil')
  }

  ngOnInit(): void {
    console.log(this.userData$);
    this.userData$.subscribe((data) => {
      console.log(data);
    })
  }
  
}
