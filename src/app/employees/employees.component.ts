import { Component, OnInit } from '@angular/core';
import { getEmployees } from './employee.service';

import { Employee } from './employee.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  allEmployees: any;

  constructor() { }
  
  async ngOnInit() {
    this.allEmployees = await getEmployees();
    // console.log(this.allEmployees);
  }
}
