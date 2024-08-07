import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../../../auth-google.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  hidePassword: boolean = true;

  loginForm2!: FormGroup;
  isLoggedin?: boolean;

  constructor(
    private fb: FormBuilder,
    private fb2: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private Router: Router,
    private authGoogleService: AuthGoogleService
  ) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  login() {
    this.authGoogleService.login();
    const data: any = JSON.stringify(this.authGoogleService.getProfile());
    console.log(data);

    this.authService.loginGmail(JSON.parse(data).email).subscribe((res) => {
      console.log(res);
      if (res.userId != null) {
        const user = {
          id: res.userId,
          role: res.userRole,
          name: res.name,
        };
        StorageService.saveUser(user);
        StorageService.saveToken(res.jwt);
        this.Router.navigateByUrl('/employee/dashboard');
        this.snackbar.open('Login successful', 'Close', { duration: 5000 });
      } else {
        this.snackbar.open('Invalid credentials', 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar',
        });
      }
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe((res) => {
      console.log(res);
      if (res.userId != null) {
        const user = {
          id: res.userId,
          role: res.userRole,
          name: res.name,
        };
        StorageService.saveUser(user);
        StorageService.saveToken(res.jwt);
        if (StorageService.isAdminLoggedIn())
          this.Router.navigateByUrl('/admin/dashboard');
        else if (StorageService.isEmployeeLoggedIn())
          this.Router.navigateByUrl('/employee/dashboard');
        this.snackbar.open('Login successful', 'Close', { duration: 5000 });
      } else {
        this.snackbar.open('Invalid credentials', 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar',
        });
      }
    });
  }
}
