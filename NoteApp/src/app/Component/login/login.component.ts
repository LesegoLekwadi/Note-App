import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public login!: FormGroup;
  public userLoggedIn: boolean = false;
  public userEmail: string = '';
  public error: string | null = null;
  public successMessage: string | null = null;
  private token: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.login = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });

    const token = localStorage.getItem('token');
    if (token) {
      this.authService.login(this.userEmail, token);
      this.router.navigate(['/home']);
    }
  }

  onEmailInput(): void {
    const emailControl = this.login.get('email');
    const lowercaseEmail = emailControl?.value.toLowerCase();
    emailControl?.setValue(lowercaseEmail, { emitEvent: false });
  }

  signInForm(): void {
    if (this.login.invalid) return;

    this.http.post<{ token: string }>("http://localhost:8080/api/v1/auth/authenticate", this.login.value)
      .subscribe(
        resp => {
          const token = resp.token;
          if (token) {
            this.token = token;
            this.userEmail = this.login.value.email;
            localStorage.setItem("token", token);
            this.userLoggedIn = true;
            this.error = null;
            this.successMessage = "Login successful.";
            setTimeout(() => {
              this.successMessage = null;
              this.router.navigate(["/notes"]);
              this.authService.login(this.userEmail, token);
            }, 1000);
          } else {
            this.error = "User not found";
          }
        },
        (error: HttpErrorResponse) => {
          this.successMessage = null;
          if (error.status === 401) {
            this.error = 'Incorrect password or User does not exist. Please try again.';
          } else if (error.status === 404) {
            this.error = 'User not found. Please check your email.';
          } else {
            this.error = 'Something went wrong. Please try again later.';
          }
        }
      );
  }
}
