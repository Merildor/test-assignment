import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeService {
  apiUrl = 'https://rc-vault-fap-live-1.azurewebsites.net';

  constructor(private http: HttpClient) {}

  getEmployeesInfo() {
    return this.http.get(
      `${this.apiUrl}/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==`,
      this.getHeaders()
    );
  }

  getHeaders() {
    return {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
  }
}
