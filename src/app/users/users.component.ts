import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  users = [
    { id: 1, name: "wael", email: "wael@email.com" },
    { id: 1, name: "wael", email: "wael@email.com" },
    { id: 1, name: "wael", email: "wael@email.com" },
    { id: 1, name: "wael", email: "wael@email.com" },
  ];
  form: any;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
      ],

      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
      ],
    });
    this.loadUsers();
  }

  loadUsers() {
    const headers = new Headers();

    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
      }),
    };
    this.http
      .get<any>("localhost:8080/api/users", httpOptions)
      .subscribe((res) => {
        if (res) this.users = res;
      });
  }

  get f() {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    this.http
      .post<any>("http://localhost:8080/api/users", {
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password,
      })
      .subscribe((res) => {
        if (res) this.loadUsers();
      });

    if (this.form.invalid) {
      return;
    }
  }
  //edit user
  editUser(type: string, currentItem: any, event: any) {
    console.log(type, currentItem, event.target.value);
    if (type === "email") {
      this.http
        .patch<any>("http://localhost:8080/api/users/" + currentItem.id, {
          name: currentItem.name,
          email: event.target.value,
          password: currentItem.password,
        })
        .subscribe((res) => {
          if (res) this.loadUsers();
        });
    } else {
      {
        this.http
          .patch<any>("http://localhost:8080/api/users/" + currentItem.id, {
            name: event.target.value,
            email: currentItem.email,
            password: currentItem.password,
          })
          .subscribe((res) => {
            if (res) this.loadUsers();
          });
      }
    }
  }
  deleteUser(id: any) {
    this.http
      .delete<any>("http://localhost:8080/api/users/" + id)
      .subscribe((res) => {
        if (res) this.loadUsers();
      });
  }
}
