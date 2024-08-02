import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public login!: FormGroup;
  public userLoggedIn: boolean = false;
  public userEmail: string = '';
  public error: string | null = null;
  public successMessage: string | null = null; // Added success message variable
  private token: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Initialize the signIn form group with email and password form controls
    this.login = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });

    // Check if token exists in localStorage on component initialization
    const token = localStorage.getItem('token');
    if (token) {
      // If token exists, attempt automatic login
      this.authService.login(this.userEmail, token);
    } else {
      // If no token, navigate user to login page
      this.router.navigate(['/login']);
    }
  }

  // Function to convert email to lowercase on input
  onEmailInput(): void {
    const emailControl = this.login.get('email');
    const lowercaseEmail = emailControl?.value.toLowerCase();
    emailControl?.setValue(lowercaseEmail, { emitEvent: false });
  }

  // Function called when user submits the login form
  signInForm(): void {
    this.http.post<{ token: string }>("http://localhost:8080/api/v1/auth/authenticate", this.login.value)
      .subscribe(
        resp => {
          const token = resp.token;
          if (token) {
            this.token = token;
            this.userEmail = this.login.value.email;
            localStorage.setItem("token", token);
            this.userLoggedIn = true;
            this.error = null; // Clear any previous error message
            this.successMessage = "Login successful."; // Set success message
            setTimeout(() => {
              this.successMessage = null; // Clear success message after 3 seconds
              this.router.navigate(["/home"]); // Navigate to home upon successful login
              this.authService.login(this.userEmail, token);
            }, 1000); // 3 seconds delay before clearing success message and navigating
          } else {
            this.error = "User not found";
          }
        },
        (error: HttpErrorResponse) => {
          // console.error("Error details:", error); // Log the error details
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
