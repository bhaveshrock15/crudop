import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { EmployeeFilterPipe } from './employees/employee-filter.pipe';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { DisplayEmployeeComponent } from './employees/display-employee.component';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { EmployeeService } from './employees/employee.service';






const appRoutes: Routes = [
  { path: 'list', component: ListEmployeesComponent },
  {  path: 'edit/:id', component: CreateEmployeeComponent },
  { path: 'employees/:id', component: EmployeeDetailsComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
