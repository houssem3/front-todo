import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any ;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router:Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {

        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
 
      },
 
    );
  }

  get f() {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    this.http.post<any>('http://localhost:8080/api/auth/login', { email: this.form.value.email,password: this.form.value.password }).subscribe(res => {
      if(res)
      localStorage.setItem('token',res.data.token)
  })

    if (this.form.invalid) {
      return;
    }
  this.router.navigate(['/dashboard'])

  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}