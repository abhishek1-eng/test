import { EmployeeDashboardComponent } from './../employee-dashboard/employee-dashboard.component';
import { EmployeeDetails } from './../Model/EmployeeDetails';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient ) { }

  //post
  createEmployee(employee:EmployeeDetails):Observable<EmployeeDetails>{
    return this.http.post<EmployeeDetails>("http://localhost:3000/posts",employee)
  }

  //get
  getEmployee():Observable<EmployeeDetails>{
    return this.http.get<EmployeeDetails>("http://localhost:3000/posts")
  }

  //delete
  deleteEmployee(empid:number):Observable<EmployeeDetails>{
    return this.http.delete<EmployeeDetails>("http://localhost:3000/posts/"+empid)
  }

  //Update
  updateEmployee(employee:EmployeeDetails,empid:number):Observable<EmployeeDetails>{
    return this.http.put<EmployeeDetails>("http://localhost:3000/posts/"+empid,employee)
  }
}
