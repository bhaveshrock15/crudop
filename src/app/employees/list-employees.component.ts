import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[] ;
  searchTerm:string;

  constructor(private _employeeService: EmployeeService,   private _router: Router) { }

  ngOnInit() {
    this._employeeService.getEmployees().subscribe((empList) => {
      this.employees = empList;
    });

  }

  onClick(employeeId: number) {
    this._router.navigate(['/employees', employeeId]);
  }


}
