import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { EmployeesDTO } from './employees.model';
import { Observable } from 'rxjs';
import { BASE_URL, headers } from './config';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  apiUrl = `${BASE_URL}/employees?view=default`;

  constructor(private http: HttpClient) {}

  getEmployeesList(): Observable<EmployeesDTO> {
    return this.http.get<EmployeesDTO>(this.apiUrl, {
      headers,
    });
  }
}
