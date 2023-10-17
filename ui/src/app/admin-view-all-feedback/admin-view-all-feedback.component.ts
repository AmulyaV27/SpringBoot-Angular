import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Review } from 'src/models/user.review.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-view-all-feedback',
  templateUrl: './admin-view-all-feedback.component.html',
  styleUrls: ['./admin-view-all-feedback.component.sass']
})
export class AdminViewAllFeedbackComponent {
  displayedColumns: string[] = ['id', 'username', 'comment', 'ratingValue', 'createdDate'];
  dataSource!: MatTableDataSource<Review>; ;
  user:string
  pageSize: number = 10;
  @ViewChild('paginator')
  paginator!: MatPaginator;
  userReviews:Review[]=[];

  constructor(private userService: UserService) {
    this.user=this.userService.userVal.user.username || 'Admin';
  }

  ngOnInit() {
    this.userService.userReviews.subscribe((data)=>{
      this.userReviews=data;
    this.dataSource=new MatTableDataSource(this.userReviews);

    });
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }
}
