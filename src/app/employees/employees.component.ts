import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  allEmployees: Employee[] = [];
  noRepeatEmployees: Employee[] = [];
  filteredEmployees:  Employee[] = [];
  
  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getEmployeesInfo().subscribe((apiResult: any) => {
      this.allEmployees = JSON.parse(apiResult);

      const unique = this.allEmployees
      .map((employee:any)=>employee['EmployeeName'])
      .map((employee:any, index:any, final:any) => final.indexOf(employee) === index && index)
      .filter((obj:any) => this.allEmployees[obj])
      .map((employee:any) => this.allEmployees[employee]);

      this.noRepeatEmployees = unique.map((element:any)=>{
        return{ ...element, hours:0};
      });
      this.filteredEmployees = this.noRepeatEmployees.filter((item:any) => item.EmployeeName != null);
      
      for (let i = 0; i < this.filteredEmployees.length; i++) {
        for (let j = 0; j < this.allEmployees.length; j++) {
          if(this.filteredEmployees[i].EmployeeName === this.allEmployees[j].EmployeeName){
            const hours = this.employeeService.getAllHours(this.allEmployees[j].StarTimeUtc, this.allEmployees[j].EndTimeUtc);
            this.filteredEmployees[i].hours += hours;
          }
        }         
      }
      this.filteredEmployees.sort((a: { hours: number; }, b: { hours: number; }) => b.hours - a.hours)
    }); 
  }

  
}
