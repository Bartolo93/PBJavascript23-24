import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgClass } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-intro-page',
  standalone: true,
  imports: [FormsModule, NgClass, ReactiveFormsModule],
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.scss'],
})
export class IntroPageComponent implements OnInit {
  private _fb = inject(FormBuilder);

  title: string = 'SNAKE !';
  selectedTheme: string = '';

  public userForm = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    token: ['', [Validators.required, Validators.minLength(4)]],
    selectedTheme: ['light', []],
  });

  constructor(public userService: UserService, private _router: Router) {}

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user.name) {
      this.userForm.get('name')!.setValue(user.name);
      this.userForm.get('selectedTheme')!.setValue(user.theme);
    }

    if (user.theme) {
      this.userForm.get('selectedTheme')!.setValue(user.theme);
    }

    this.selectedTheme = this.userForm.get('selectedTheme')!.value!;

    this.userForm.get('selectedTheme')!.valueChanges.subscribe((value) => {
      this.selectedTheme = value!;
      user.theme = value!;
      localStorage.setItem('user', JSON.stringify(user));
    });

    this.userForm.get('name')!.valueChanges.subscribe((value) => {
      user.name = value!;
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  public onSubmit(): void {
    this.checkToken();
  }

  checkToken() {
    this.userService
      .checkToken(+this.userForm.value.token!)
      .subscribe((response: any) => {
        if (response.success) {
          this.userService.setUserData(
            this.userForm.value.name!,
            +this.userForm.value.token!
          );
          this.goToGamePage();
        } else {
          this.userForm.get('token')?.setErrors({ invalid: 'Invalid token' });
        }
      });
  }

  goToGamePage() {
    this._router.navigate(['/game/', this.userForm.value.selectedTheme!]);
  }
}
