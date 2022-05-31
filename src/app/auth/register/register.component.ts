import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup | any;
  loading = false;
  isUpdate = false;
  submitted = false;
  isLogin: boolean = false;
  isEdit = false;
  disableSelect = new FormControl(false);
  phonePattern = /^[0-9]{10,12}$/;
  id: string | any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private _auth: AuthService,
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobileNo: ['', Validators.required],
    });
    this.isUserLogin();
    this.patchValues();
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.loginService.register(this.form.value)
      .subscribe((res: any) => {
        if (res.status == 200) {
          console.log(res)
          this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
          this._auth.setDataInLocalStorage('token', res.token);
          this.toastr.success('User Registered successfully');
          this.router.navigate(['/login'], { relativeTo: this.route });
        }
        else if (res.status == 400) {
          this.loading = false;
          this.toastr.error('User already registered!!!');
          this.form.reset();
        }
        else {
          console.log(res)
          alert(res.msg)
        }
      });
  }

  numbersOnlyValidator(event: any) {
    const pattern = /^[0-9\-]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9\-]/g, "");
    }
  }

  routing() {
    this.router.navigate(['/login'], { relativeTo: this.route });
  }

  isUserLogin() {
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }

  patchValues() {
    this.userService.data.subscribe((res: any) => {
      this.id = res;
    });
      this.userService.listById(this.id).subscribe((response: any) => {
        this.form.patchValue({
          firstName: response.result.firstName,
          lastName: response.result.lastName,
          email: response.result.email,
          mobileNo: response.result.mobileNo
        });
      });
  }

  updateUser() {
    this.isEdit = true;
    const data = {
      _id: this.id,
      firstName: this.form.get("firstName").value,
      lastName: this.form.get("lastName").value,
      email: this.form.get("email").value,
      password: this.form.get("password").value,
      mobileNo: this.form.get("mobileNo").value
    }
    this.userService.updateUser(data).subscribe((res:any) => {
      if (res.status == 200) {
        this.toastr.success('User Updated successfully');
        this.router.navigate(['/home'], { relativeTo: this.route });
      }
    });
  }
}
