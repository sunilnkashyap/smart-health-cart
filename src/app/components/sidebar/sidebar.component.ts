import { Component, Injector, OnChanges, OnInit } from '@angular/core';
import { authState } from '@angular/fire/auth';
import { BasePage } from 'src/app/base-page';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends BasePage implements OnInit, OnChanges {

  public fireUserData: any;

  constructor(injector: Injector) {
    super(injector);

    if(this.auth){
      authState(this.auth);
      this.user.subscribe((data) => {
        let path = 'users/' + this.fireUserId;
        console.log(path)
        this.getFireData(path).subscribe((uData) => {
            console.log(uData)
            this.fireUserData = uData;
        })
      })
  }


  }

  ngOnInit(): void {
   
  }

  ngOnChanges() {
    if(this.fireUserId) {
      console.log(this.userData);
    }
  }


}
