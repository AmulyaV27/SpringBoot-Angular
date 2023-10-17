import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from 'src/models/user.review.model';
import { NotificationService } from '../notification.service';
import { UserService } from '../user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-review-feedback',
  templateUrl: './review-feedback.component.html',
  styleUrls: ['./review-feedback.component.scss']
})
export class ReviewFeedbackComponent {
  feedbackForm: FormGroup;
  userReviews: Review[]=[];
  displayedColumns: string[] = ['id', 'comment', 'ratingValue', 'createdDate'];
  dataSource!: MatTableDataSource<Review>; 
  pageSize: number = 10;

  @ViewChild('paginator') paginator!: MatPaginator;


  constructor(private formBuilder: FormBuilder, private userService:UserService,private notification:NotificationService) {
    this.feedbackForm = this.formBuilder.group({
      rating: [null, [Validators.required, Validators.min(0)]],
      feedback: ['',[Validators.required]]
    });
    this.userService.userReviews.subscribe((data)=>{
      this.userReviews=data;
      this.dataSource=new MatTableDataSource(data);
    })
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onFeedback() {
    if (this.feedbackForm.valid) {
      const ratingValue = this.feedbackForm.value.rating;
      const feedbackValue = this.feedbackForm.value.feedback;
      this.userService.saveReview(ratingValue,feedbackValue).subscribe((data:Review[])=>{
        this.userService.setUserReviews(data);
        this.notification.openSnackBar("Feedback submitted!","close");
      });
      this.feedbackForm.controls['rating'].setValue('');
      this.feedbackForm.controls['rating'].setValue('');
    } else {
    }
  }
}
