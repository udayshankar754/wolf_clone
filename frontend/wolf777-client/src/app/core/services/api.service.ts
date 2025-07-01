import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Create HTTP options with headers
   * @param headers Additional headers to add
   * @returns HttpHeaders object
   */
  private createHeaders(headers: { [key: string]: string } = {}): HttpHeaders {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });

    // Add additional headers if provided
    Object.keys(headers).forEach(key => {
      httpHeaders = httpHeaders.append(key, headers[key]);
    });

    return httpHeaders;
  }

  /**
   * Generic GET request
   * @param path API endpoint path
   * @param params Query parameters
   * @param headers Additional headers
   * @returns Observable of response
   */
  get<T>(path: string, params: any = {}, headers: any = {}): Observable<T> {
    const options = {
      headers: this.createHeaders(headers),
      params: this.buildParams(params)
    };

    return this.http.get<T>(`${this.baseUrl}${path}`, options)
      .pipe(catchError(this.handleError));
  }

  /**
   * Generic POST request
   * @param path API endpoint path
   * @param body Request body
   * @param headers Additional headers
   * @returns Observable of response
   */
  post<T>(path: string, body: any, headers: any = {}): Observable<T> {
    const options = {
      headers: this.createHeaders(headers)
    };

    return this.http.post<T>(`${this.baseUrl}${path}`, body, options)
      .pipe(catchError(this.handleError));
  }

  /**
   * Generic PUT request
   * @param path API endpoint path
   * @param body Request body
   * @param headers Additional headers
   * @returns Observable of response
   */
  put<T>(path: string, body: any, headers: any = {}): Observable<T> {
    const options = {
      headers: this.createHeaders(headers)
    };

    return this.http.put<T>(`${this.baseUrl}${path}`, body, options)
      .pipe(catchError(this.handleError));
  }

  /**
   * Generic DELETE request
   * @param path API endpoint path
   * @param headers Additional headers
   * @returns Observable of response
   */
  delete<T>(path: string, headers: any = {}): Observable<T> {
    const options = {
      headers: this.createHeaders(headers)
    };

    return this.http.delete<T>(`${this.baseUrl}${path}`, options)
      .pipe(catchError(this.handleError));
  }

  /**
   * Generic PATCH request
   * @param path API endpoint path
   * @param body Request body
   * @param headers Additional headers
   * @returns Observable of response
   */
  patch<T>(path: string, body: any, headers: any = {}): Observable<T> {
    const options = {
      headers: this.createHeaders(headers)
    };

    return this.http.patch<T>(`${this.baseUrl}${path}`, body, options)
      .pipe(catchError(this.handleError));
  }

  /**
   * Build HTTP parameters from object
   * @param params Parameters object
   * @returns HttpParams object
   */
  private buildParams(params: any): HttpParams {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }

    return httpParams;
  }

  /**
   * Handle HTTP errors
   * @param error Error object
   * @returns Observable with error
   */
  private handleError(error: any) {
    console.error('API error', error);

    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status) {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}