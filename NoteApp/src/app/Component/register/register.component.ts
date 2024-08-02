import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public Register!: FormGroup;
  public userLoggedIn: boolean = false;
  public userEmail: string = '';
  public error: string | null = null;
  public successMessage: string | null = null; // Success message
  private token: string | undefined;

  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router, private authservice: AuthService) {}

  ngOnInit(): void {
    this.Register = this.formbuilder.group({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^/&\\\\]).{6,}$'),
      ])),
      cpassword: new FormControl('', Validators.required)
    }, { validator: this.checkPasswords });
  }

  checkPasswords(formgroup: FormGroup): any {
    const password = formgroup.get('password')?.value;
    const cpassword = formgroup.get('cpassword')?.value;

    if (password === cpassword) {
      return null; // Passwords match
    } else {
      formgroup.get('cpassword')?.setErrors({ passwordMismatch: true }); // Set custom error
      return { passwordMismatch: true }; // Passwords don't match
    }
  }

  register(): void {
    if (this.Register.invalid) return;

    const newUser = { ...this.Register.value };

    this.http.post<{ token: string }>("http://localhost:8080/api/v1/auth/register", newUser).subscribe(
      resp => {
        const token = resp.token;
        if (token) {
          this.token = token;
          localStorage.setItem("token", token); // Store token in localStorage
        }
        this.error = null; // Clear any previous error
        this.successMessage = 'Registered successfully'; // Set success message
        this.userEmail = newUser.email; // Update userEmail with the registered email
        this.userLoggedIn = true;
        this.Register.reset();

        // Set a timeout to clear success message after a few seconds
        setTimeout(() => {
          this.successMessage = null;
          this.router.navigate(["home"]);
          this.authservice.login(this.userEmail, token);
        }, 1000); // 1000 milliseconds = 1 second
      },
      (error: HttpErrorResponse) => {
        this.successMessage = null; // Clear any previous success message
        if (error.status === 409) {
          this.error = 'User already exists. Please try logging in.';
        } else if (error.status === 404) {
          this.error = 'User not found. Please check your input.';
        } else {
          this.error = 'Something went wrong';
        }
      }
    );
  }

}
