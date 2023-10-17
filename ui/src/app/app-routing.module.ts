import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewAllFeedbackComponent } from './admin-view-all-feedback/admin-view-all-feedback.component';
import { AuthGuard } from './authgaurd';
import { LoginComponent } from './login/login.component';
import { NotEntitledComponent } from './not-entitled/not-entitled.component';
import { ReviewFeedbackComponent } from './review-feedback/review-feedback.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:'sign-up',component:SignUpComponent },
  {path:'login',component:LoginComponent},
  {path:'feedback',component:ReviewFeedbackComponent,canActivate:[AuthGuard]},
  {path:'view-all-feedback',component:AdminViewAllFeedbackComponent,canActivate:[AuthGuard]},
  {path:'403',pathMatch:'full',component:NotEntitledComponent},
  {path:'', pathMatch:'full',redirectTo:'/sign-up'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
