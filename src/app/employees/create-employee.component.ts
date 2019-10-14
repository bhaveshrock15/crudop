import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Department } from '../models/department.model';
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  gender = 'male';
  isActive = false;
  previewPhoto = false;
  panelTitle: string;


  employee: Employee ;

  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' }
  ];

  constructor(private _employeeService: EmployeeService,
    private _router: Router, private _route:ActivatedRoute) {

    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,

        dateInputFormat: 'DD/MM/YYYY'
      });
   }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  }

  saveEmployee(empForm: NgForm): void {
    const newEmployee = Object.assign({}, this.employee);
    this._employeeService.save(newEmployee);
    //empForm.reset();
    this._router.navigate(['list']);
  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  private getEmployee(id: number) {
    // If the id is 0, we want to create a new employee. So we intialise the employee 
    // property with an Employee object with all properties set to null. The template 
    // is bound to this employee property so all the form fields are displayed blank, 
    // to enter details of a new employee we want to create
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        contactPreference: null,
        phoneNumber: null,
        email: '',
        dateOfBirth: null,
        department: null,
        isActive: null,
        photoPath: null
      };
      // Resetting the form, resets any previous validation errors
     // this.createEmployeeForm.reset();
      this.panelTitle = 'Create Employee';
    } else {
      // If the Id is not 0, then retrieve the respective employee using the employee 
      // service. Copy the values into a new object and assign that object as the value 
      // for the employee property. Otherwise the employee property holds a reference 
      // to the employee object in the array in the EmployeeService. This means any 
      // changes we make on the form are automatically saved, without we explicitly
      // saving by clicking the Save button.
      this.employee = Object.assign({}, this._employeeService.getEmployee(id));
      this.panelTitle = 'Edit Employee';
    }
  }

}
