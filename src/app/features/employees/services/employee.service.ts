import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/core/models/employee';
import { Observable, of } from 'rxjs';
import { MessagesService } from '../../messages/services/messages.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesUrl = 'api/employees';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private httpClient: HttpClient,
    private messagesService: MessagesService
    ) { }

  getEmployees(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(this.employeesUrl).pipe(
      tap(_ => this.log('fetched employees')),
      catchError(this.handleError<Employee[]>('getEmployees', []))
    );
  }

  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.httpClient.get<Employee>(url).pipe(
      tap(_ => this.log(`fetched employee id=${id}`)),
      catchError(this.handleError<Employee>(`getEmployee id=${id}`))
    )
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.httpClient.put(this.employeesUrl, employee, this.httpOptions).pipe(
      tap(_ => this.log(`updated imployee id=${employee.id}`)),
      catchError(this.handleError<any>('updateEmployee'))
    )
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.employeesUrl, employee, this.httpOptions).pipe(
      tap((newEmployee: Employee) => this.log(`added employee w/ id=${newEmployee.id}`)),
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }

  deleteEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
  
    return this.httpClient.delete<Employee>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted employee id=${id}`)),
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }

  private log(message: string) {
    this.messagesService.add(`EmployeeService: ${message}`);
    }

    /* GET employees whose name contains search term */
    searchEmployees(term: string): Observable<Employee[]> {
      if (!term.trim()) {
        return of([]);
      }
      return this.httpClient.get<Employee[]>(`${this.employeesUrl}/?name=${term}`).pipe(
        tap(x => x.length ?
           this.log(`found employees matching "${term}"`) :
           this.log(`no employees matching "${term}"`)),
        catchError(this.handleError<Employee[]>('searchEmployees', []))
      );
    }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
    
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
    
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
    
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
