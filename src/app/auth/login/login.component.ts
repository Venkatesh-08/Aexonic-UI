import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup | any;
  loading = false;
  submitted = false;
  isLogin: boolean = false;
  data = {
    email: '',
    password: ''
  };

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private _auth: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.isUserLogin();
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.loginService.login(this.f.email.value, this.f.password.value)
      .subscribe((res: any) => {
        if(res.status == 200){
          this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
          this._auth.setDataInLocalStorage('token', res.token);
          this.router.navigate(['/home'], { relativeTo: this.route });
        }
        else{
          this.loading = false;
          this.toastr.error("Bad Credentials!!!")
        }
      });
  }

  routing() {
    this.router.navigate(['/register'], { relativeTo: this.route });
  }

  isUserLogin() {
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
    return this.isLogin;
  }

}
