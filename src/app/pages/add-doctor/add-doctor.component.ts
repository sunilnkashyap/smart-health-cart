import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BasePage } from 'src/app/base-page';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent extends BasePage implements OnInit {

  public form: FormGroup;
  public showError: boolean = false;
  public editId: string | null = null;

  constructor(injector: Injector) {
    super(injector);
    this.editId = this.activatedRoute.snapshot.paramMap.get('uid')
    this.form = new FormGroup({
      fName: new FormControl('', [Validators.required]),
      lName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
      contactNumber: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      speciality: new FormControl('', [Validators.required]),
      about: new FormControl('', [Validators.required])
    });

    if(this.editId && this.editId != '') {
      this.getOldData();
    }
  }

  ngOnInit(): void {

  }

  getOldData() {
    this.getFireData('users/'+this.editId).subscribe((userData) => {
      console.log(userData)
      userData.password = '';
      delete userData.uid;
      delete userData.role;
      this.form.setValue(userData)
    })
  }

  handleSubmit() {
    this.showError = false;

    if(this.form.valid) {
      let formData = this.form.value;
      formData.uid = this.fireUserId;
      formData.role = 'doctor';

      if(this.editId && this.editId != '') {
        let path = 'users/'+this.editId;
        delete formData.password;
        this.setFireData(path, formData).then((setFireDataResponse) => {
          console.log(setFireDataResponse);
          this.notification('Doctor edited successfully!');
          this.navigateTo('dashboard/doctors')
        }).catch((setError) => {
          console.log(setError);
          this.showError = false;
        });
      } else {
        this.fireSignUp(formData.email, formData.password).then((data: any) => {
          let path = 'users/'+data.user.uid;
          formData.uid = data.user.uid;
          delete formData.password;
          this.setFireData(path, formData).then((setFireDataResponse) => {
            console.log(setFireDataResponse);
            this.notification('Doctor added successfully!');
            this.navigateTo('dashboard/doctors')
          }).catch((setError) => {
            console.log(setError);
            this.showError = false;
          });
        }).catch((error) => {
          console.log(error)
          this.showError = false;
        })
      }




    } else {
      this.showError = true;
    }
  }
}
