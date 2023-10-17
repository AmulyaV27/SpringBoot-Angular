export class Review {
    id: number;
    comment: string;
    ratingValue: number;
    createdDate: Date;
    username: string;
  
    constructor(
      id: number,
      comment: string,
      ratingValue: number,
      createdDate: Date,
      username: string
    ) {
      this.id = id;
      this.comment = comment;
      this.ratingValue = ratingValue;
      this.createdDate = createdDate;
      this.username = username;
    }
  }
  