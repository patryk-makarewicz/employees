import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { CreateEmployeeModel, EmployeesDTO, RemoveEmployeeModel } from './employees.model';
import { Observable } from 'rxjs';
import { BASE_URL, headers } from './config';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  baseApiUrl = `${BASE_URL}/employees`;

  constructor(private http: HttpClient) {}

  getEmployeesList(): Observable<EmployeesDTO> {
    const url = `${this.baseApiUrl}?view=default`;
    return this.http.get<EmployeesDTO>(url, {
      headers,
    });
  }

  addEmployee(newEmployee: CreateEmployeeModel): Observable<EmployeesDTO> {
    return this.http.post<EmployeesDTO>(this.baseApiUrl, newEmployee, {
      headers,
    });
  }

  removeEmployee({ id }: RemoveEmployeeModel): Observable<EmployeesDTO> {
    const url = `${this.baseApiUrl}/${id}`;
    return this.http.delete<EmployeesDTO>(url, {
      headers,
    });
  }
}
