import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: any ;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router:Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
       
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
 
    );
  }

  get f() {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
console.log(this.form.value);

    this.http.post<any>('http://localhost:8080/api/auth/users', { name: this.form.value.name,email: this.form.value.email,password: this.form.value.password }).subscribe(res => {
      if(res)
      localStorage.setItem('token',res.data.token)
  })
  this.router.navigate(['/login'])
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
