import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { registerAction } from "../../store/actions/register.action";
import { Observable } from "rxjs";
import { isSubmittingSelector } from "../../store/selectors";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";

@Component({
  selector: "mc-register",
  templateUrl: "register.component.html",
  styleUrls: ["register.component.scss"],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  isSubmitting$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.initializeValues();
  }

  initializeValues() {
    this.isSubmitting$ = this.store.source!.pipe(select(isSubmittingSelector));
  }

  initializeForm() {
    this.form = this.fb.group({
      username: ["", Validators.required],
      email: "",
      password: "",
    });
  }

  onSubmit() {
    console.log(this.form.value);
    const request: RegisterRequestInterface = {
      user: this.form.value,
    };
    this.store.dispatch(registerAction({ request }));
  }
}
