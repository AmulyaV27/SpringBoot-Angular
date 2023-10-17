import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private router:Router
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  login(){
    const username = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;
    this.userService.loginUser(username,password).subscribe((user:any)=>{
      this.userService.setUser(user);
      this.notificationService.openSnackBar('Logged in','close');
      if(user.user.role==='ADMIN'){
        this.userService.getAllUsers().subscribe((data)=>{
          this.userService.setUserReviews(data);
          this.router.navigate(['/view-all-feedback'])
        })
      }
      else{
        this.userService.setUserReviews(user.user.userReviews);
        this.router.navigate(['/feedback'])
      }
    });
  }
}
