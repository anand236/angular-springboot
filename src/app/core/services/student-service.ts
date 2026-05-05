import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IStudent } from '../models/student.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {

  private http = inject(HttpClient);

  public getAllStudentList(): Observable<IStudent[]> {
    return this.http.get<IStudent[]>(`${environment.apiUrl}students`);
  }

  public saveStudentDetail(payload: IStudent): Observable<IStudent[]> {
    return this.http.post<IStudent[]>(environment.apiUrl + 'students', payload);
  }

  // public updateStudentData(id:number){
  //     return this.http.post(`this.apiUrl/${id}`)
  // }

  public deleteData(id: number): Observable<IStudent> {
    return this.http.delete<IStudent>(environment.apiUrl + `students/${id}`);
  }

  public getDataByPageSize(page: number, pageSize: number) {
    return this.http.get(`${environment.apiUrl}students/paged?page=${page}&size=${pageSize}`);
  }

}
