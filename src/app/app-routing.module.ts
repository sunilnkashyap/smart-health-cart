import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardDataComponent } from './components/dashboard-data/dashboard-data.component';
import { AddDoctorComponent } from './pages/add-doctor/add-doctor.component';
import { AddPatientComponent } from './pages/add-patient/add-patient.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { LoginComponent } from './pages/login/login.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { ReportComponent } from './pages/report/report.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'doctors',
        component: DoctorsComponent,
      },
      {
        path: 'add-doctor',
        component: AddDoctorComponent,
      },
      {
        path: 'add-doctor/:uid',
        component: AddDoctorComponent,
      },
      {
        path: 'patients',
        component: PatientsComponent,
      },
      {
        path: 'add-patient',
        component: AddPatientComponent,
      },
      {
        path: 'add-patient/:uid',
        component: AddPatientComponent,
      },
      {
        path: 'report/:uid',
        component: ReportComponent,
      },
      
      {
        path: '',
        component: DashboardDataComponent,
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
