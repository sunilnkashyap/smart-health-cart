import { Component, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasePage } from 'src/app/base-page';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent extends BasePage implements OnInit {

  doctorsDocs: Observable<any[]>;

  constructor(injector: Injector) {
    super(injector);

    let itemsCollection = this.ngFireStore.collection<any>('users');
    this.doctorsDocs = itemsCollection.valueChanges();

  }

  ngOnInit(): void {
    this.doctorsDocs.subscribe(console.log)
  }


  editUser(uid: string) {
    this.navigateTo('/dashboard/add-doctor/'+uid);
  }

  deleteUser(uid: string) {
    if(this.confirmNotification('Are you sure want to delete!')){
      this.deleteDocument('users/'+uid).then(() => {
        this.notification('Doctor deleted successful!');
      }).catch(() => {
        this.notification('Something went wrong please try again!');
      })
    }
  }
}
