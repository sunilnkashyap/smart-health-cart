import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends BasePage implements OnInit {

  @Input() title = '';

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

  signOut() {
    this.fireSignOut();
  }

}
