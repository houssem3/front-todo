import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { TutorialComponent } from "./tutorial/tutorial.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      { path: "", redirectTo: "users", pathMatch: "full" },
      { path: "users", component: UsersComponent },
      { path: "tutorials", component: TutorialComponent },
    ],
  },
  { path: "**", redirectTo: "login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
