import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-tutorial",
  templateUrl: "./tutorial.component.html",
  styleUrls: ["./tutorial.component.scss"],
})
export class TutorialComponent implements OnInit {
  tutos = [
    { id: 1, title: "tuto1", description: "description1" },
    { id: 1, title: "tuto2", description: "description2" },
    { id: 1, title: "tuto3", description: "description3" },
    { id: 1, title: "tuto4", description: "description4" },
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
      title: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ],
      ],
      description: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ],
      ],
    });
    this.loadTutos();
  }

  loadTutos() {
    this.http
      .get<any>("http://localhost:8080/api/tutorials")
      .subscribe((res) => {
        if (res) this.tutos = res;
      });
  }

  get f() {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    this.http
      .post<any>("http://localhost:8080/api/tutorials", {
        title: this.form.value.title,
        description: this.form.value.description,
      })
      .subscribe((res) => {
        if (res) this.loadTutos();
      });

    if (this.form.invalid) {
      return;
    }
  }
  //edit user
  editTuto(type: string, currentItem: any, event: any) {
    console.log(type, currentItem, event.target.value);
    if (type === "title") {
      this.http
        .patch<any>("http://localhost:8080/api/tutorials/" + currentItem.id, {
          description: currentItem.description,
          title: event.target.value,
        })
        .subscribe((res) => {
          if (res) this.loadTutos();
        });
    } else {
      {
        this.http
          .patch<any>("http://localhost:8080/api/tutorials/" + currentItem.id, {
            description: event.target.value,
            title: currentItem.title,
          })
          .subscribe((res) => {
            if (res) this.loadTutos();
          });
      }
    }
  }
  deleteTuto(id: any) {
    this.http
      .delete<any>("http://localhost:8080/api/tutorials/" + id)
      .subscribe((res) => {
        if (res) this.loadTutos();
      });
  }
  search(title: any) {
    console.log(title.target.value);

    this.http
      .get<any>(
        "http://localhost:8080/api/tutorials?title=" + title.target.value
      )
      .subscribe((res) => {
        if (res) this.loadTutos();
      });
  }
}
