import { IStudent } from './../../core/models/student.model';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { StudentService } from '../../core/services/student-service';
import { ButtonModule } from 'primeng/button';
import { TableModule, TablePageEvent } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student',
  imports: [ButtonModule, TableModule, CardModule, CommonModule, FormsModule],
  templateUrl: './student.html',
  styleUrl: './student.scss',
})
export class Student implements OnInit {

  private studentSer = inject(StudentService);

  studentList = signal<IStudent[]>([]);

  page = signal(0);
  pageSize = signal(5);
  totalRecord = signal(0);
  editRowDisable = signal(true);

  studentName = signal('');
  studentAge = signal(0);
  studentCity = signal('');

  editRowId = signal(0);

  updateStudentList = computed(() => this.studentList().map((item, index) => ({ ...item, slNo: (this.page() * this.pageSize() + index + 1) })));

  ngOnInit(): void {
    // this.getStudents();
    this.getStudentsWithPagination(this.page(), this.pageSize());
  }

  /**
   * gets all student list
   */
  // public getStudents() {
  //   this.studentSer.getAllStudentList().subscribe({
  //     next: (res) => {
  //       if (res) {
  //         this.studentList.set(res);
  //       }
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   })
  // }

  public getStudentsWithPagination(page: number, pageSize: number) {
    this.studentSer.getDataByPageSize(page, pageSize).subscribe({
      next: (res: any) => {
        console.log('page', res);
        if (res) {
          this.studentList.set(res.content);
          this.totalRecord.set(res.totalElements);
        }
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  /**
   * deletes user data
   * @param userId user id
   */
  public deleteUser(userId: number) {

    this.studentSer.deleteData(userId).subscribe({
      next: () => {
        // this.getStudents();
        this.getStudentsWithPagination(this.page(), this.pageSize())
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  public pageUpdated(event: TablePageEvent) {
    this.page.set(event.first / event.rows);
    this.pageSize.set(event.rows);
    this.getStudentsWithPagination(this.page(), this.pageSize())
  }

  public editRow(event: IStudent) {
    this.editRowId.set(event.id);
    this.studentAge.set(event.age);
    this.studentName.set(event.name);
    this.studentCity.set(event.city);

    this.editRowDisable.set(true);
  }

  public cancelEditBtn() {
    this.editRowDisable.update((item) => !item);
  }

  public updateUser(id: any, name: any, age: any, city: any, slNo: any) {
    console.log(id, name, age, city, slNo);
    const userDetail = {
      id: id,
      age: age,
      city: city,
      name: name
    }
    this.saveUser(userDetail)
  }

  public saveUser(userDetail?: any) {
    this.studentSer.saveStudentDetail(userDetail).subscribe({
      next: (res) => {
        console.log(res, 'post');
        this.editRowDisable.set(false)
        this.getStudentsWithPagination(this.page(), this.pageSize());



      },
      error: (err) => {
        console.log(err);

      }
    })
  }




}
