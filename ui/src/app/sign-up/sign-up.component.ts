import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../notification.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signupForm: FormGroup;
  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('USER', [Validators.required]),
    });
  }
  onSignup() {
    const username = this.signupForm.controls['username'].value;
    const password = this.signupForm.controls['password'].value;
    const role = this.signupForm.controls['role'].value;
    this.userService.signupUser(username, password, role).subscribe((user) => {
      if (user !== null) {
        this.userService.setUser(user);
        this.notificationService.openSnackBar('Signed up successfully!','close');
      }
    });
  }
}
