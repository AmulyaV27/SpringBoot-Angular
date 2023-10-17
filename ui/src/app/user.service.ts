import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Review } from 'src/models/user.review.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: BehaviorSubject<any> = new BehaviorSubject(null);
  userVal: any;
  userReviews: BehaviorSubject<Review[]> = new BehaviorSubject<Review[]>([]);
  constructor(private http: HttpClient) {
    this.user.subscribe((user) => (this.userVal = user));
  }
  public signupUser(username: string, password: string, role: string) {
    return this.http.post('/api/user/sign-up', {
      username,
      password,
      role,
    });
  }
  loginUser(username: string, password: string) {
    return this.http.post('/api/user/login', {
      username,
      password,
    });
  }
  setUser(user: any) {
    this.user.next(user);
    this.userVal = user;
  }
  saveReview(rating: number, comment: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.userVal.token}`,
      }),
    };
    return this.http.post<Review[]>(
      `/api/user/${this.userVal.user.id}/save-review`,
      {
        ratingValue: rating,
        comment,
      },
      httpOptions
    );
  }
  setUserReviews(userReviews: Review[]) {
    console.log(userReviews)
    this.userReviews.next(userReviews);
  }
  getAllUsers(): Observable<Review[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.userVal.token}`,
      }),
    };
    return this.http.get<any[]>('/api/user/all-users', httpOptions).pipe(
      map(data => data.flatMap((item: any) => item.userReviews.map((reviewItem: any) => {
        return new Review(
          reviewItem.id,
          reviewItem.comment,
          reviewItem.ratingValue,
          new Date(reviewItem.createdDate),
          item.username
        );
      })))
    );
  }
}
