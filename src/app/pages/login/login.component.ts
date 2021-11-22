import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BasePage } from 'src/app/base-page';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BasePage implements OnInit {

  public loginForm: FormGroup;
  public showError: boolean = false;

  constructor(injector: Injector) {
    super(injector);
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }


  ngOnInit(): void {
    this.loggedInObserver.subscribe((data: boolean) => {
      if(data) {
        this.navigateTo('dashboard')
      }
    });
  }

  handleLogin() {
    this.showError = false;
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      let formValues = this.loginForm.value;
      this.fireSignIn(formValues.email, formValues.password).then(() => {
        this.navigateTo('dashboard')
      }).catch(() => {
        this.showError = true;
      })
    } else {
      this.showError = true;
    }
  }

}
