import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  studentList: any;
  isedit = 0;
  issubmit = 1;
  data: any;
  message: string | any;
  template: boolean = false;
  modalRef: BsModalRef | any;
  elementId: number | any
  pageSize = 15;
  currentPage = 0;
  users = [];
  userLength: number | any;
  rowCount: number | any;
  limit: number = 15;
  pageSizeArray = [5, 10, 20, 30, 40, 50];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sortData: MatSort | any;
  event: any;
  start: number = 0;
  prevPageIndex: any;
  orderString: string | any;
  searchValue: string | any;
  isSearch = 0;
  private subscription: Subscription | any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private modalService: BsModalService, private loginService: LoginService) { }
  
  dataSource = new MatTableDataSource<any>();

  ngOnInit(): void {
    this.getUsers(this.event, 0);
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['fname', 'lname', 'email', 'mobileno', 'symbol'];

  getUsers(count?: number | any, previousPageIndex?: number | any) {
    if (!count)
      count = 0;

    if (count === 0) {

      if (count <= previousPageIndex) {
        this.start = 0;
      } else {
        this.start += this.pageSize;
      }

    } else {
      this.start = count * this.pageSize;
    }
    if (this.isSearch == 0) {
      this.subscription = this.userService.getUsersByPage(this.start, this.limit).subscribe((res: any) => {
        if (res.result.length > 0) {
          this.users = res.result;
          this.dataSource.data = this.users;
          this.userLength = res.count;
          this.rowCount = this.userLength;
        }
      });
    }
    else {
      this.subscription = this.userService.getUsersBySearchApi(this.start, this.limit, this.searchValue).subscribe((res: any) => {
        if (res.result.length > 0) {
          this.users = res.result;
          this.dataSource.data = this.users;
          this.userLength = res.count;
          this.rowCount = this.userLength;
        }
      });
    }
  }

  onChange(event: any) {
    this.event = event.pageIndex;
    if (this.limit !== event.pageSize) {
      this.start -= event.pageSize;
      this.limit = event.pageSize;
      this.pageSize = event.pageSize;
    }
    this.prevPageIndex = event.previousPageIndex;
    this.getUsers(event.pageIndex, event.previousPageIndex);
  }

  search(event: KeyboardEvent) {
    this.isSearch = 1;
    if ((event.target as HTMLInputElement)?.value) {
      this.searchValue = (event.target as HTMLInputElement)?.value;
      this.paginator.pageIndex = 0;
      this.getUsers(0, 0);
    }
  }

  onEdit(id: any, template: TemplateRef<any>) {
    this.isedit = 1;
    this.template = true
    this.elementId = id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.userService.sendData(this.elementId);
    this.router.navigate(["register"],this.elementId);
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  logout(){
    this.loginService.logoutApi().subscribe((res:any) => {
      if(res.status == 200){
        this.router.navigate(['/login'], { relativeTo: this.route });
      }
    })
  }
}
