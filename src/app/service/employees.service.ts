import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { CreateEmployeeModel, EditEmployeeModel, EmployeesDTO, EmployeesModel } from './employees.model';
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

  getEmployee(id: string): Observable<EmployeesModel> {
    const url = `${this.baseApiUrl}/${id}`;
    return this.http.get<EmployeesModel>(url, {
      headers,
    });
  }

  addEmployee(newEmployee: CreateEmployeeModel): Observable<EmployeesDTO> {
    return this.http.post<EmployeesDTO>(this.baseApiUrl, newEmployee, {
      headers,
    });
  }

  removeEmployee(id: string): Observable<EmployeesDTO> {
    const url = `${this.baseApiUrl}/${id}`;
    return this.http.delete<EmployeesDTO>(url, {
      headers,
    });
  }

  editEmployee(newEmployee: EditEmployeeModel): Observable<EmployeesDTO> {
    return this.http.put<EmployeesDTO>(this.baseApiUrl, newEmployee, {
      headers,
    });
  }
}
