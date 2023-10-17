import { Review } from './user.review.model';
export class User {
  id: number;
  username: string;
  password: string;
  role: string;
  userReviews: Review[];

  constructor(
    id: number,
    username: string,
    password: string,
    role: string,
    userReviews: Review[]
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
    this.userReviews = userReviews;
  }
}
