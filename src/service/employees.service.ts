import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { EmployeesDTO } from './employees.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  apiUrl = 'https://api.airtable.com/v0/appLEnsiAG9qd1lyg/employees?view=default';

  constructor(private http: HttpClient) {}

  getEmployeesList(): Observable<EmployeesDTO> {
    return this.http.get<EmployeesDTO>(this.apiUrl, {
      headers: {
        Authorization: 'Bearer patWAlDWYRTZhndzA.a8fbae14abdee9674ba27b56ffeb5a3e7261ba909bbf811680fe4bb80565ea0d',
      },
    });
  }
}
