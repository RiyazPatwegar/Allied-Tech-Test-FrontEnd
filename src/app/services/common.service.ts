import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from  '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  apiUrl = environment.apiUrl;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'    
  });

  constructor(private http: HttpClient) { }

  public getList(param){
    return this.http.post(`${this.apiUrl}employee/getList`,param, {headers: this.headers})
    .pipe(
      catchError(this.error)
    );
  }

  public getEmployee(param){
    return this.http.post(`${this.apiUrl}employee/getEmployee`,param, {headers: this.headers})
    .pipe(
      catchError(this.error)
    );
  }

  public editEmployee(param){
    return this.http.post(`${this.apiUrl}employee/editEmployee`,param, {headers: this.headers})
    .pipe(
      catchError(this.error)
    );
  }
  
  public deleteEmployee(param){    
    return this.http.post(`${this.apiUrl}employee/deleteEmployee`,param, {headers: this.headers})
    .pipe(
      catchError(this.error)
    );
  }

  // Handle Errors 
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
