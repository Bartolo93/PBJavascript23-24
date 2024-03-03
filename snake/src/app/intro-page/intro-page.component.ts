import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-intro-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './intro-page.component.html',
  styleUrl: './intro-page.component.scss',
})
export class IntroPageComponent {
  name = '';
  title = 'SNAKE GAME';
  email = '';
  isButtonDisabled = true;
  errorMessage = '';
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  checkInputs() {
    if (this.name === '' && this.email === '') {
      this.errorMessage = 'NAME AND EMAIL IS REQUIRED';
    } else if (this.name === '') {
      this.errorMessage = 'NAME IS REQUIRED';
    } else if (this.email === '') {
      this.errorMessage = 'EMAIL IS REQUIRED';
    } else if (!this.emailPattern.test(this.email)) {
      this.errorMessage = 'EMAIL IS INVALID';
    } else {
      this.errorMessage = '';
      this.isButtonDisabled = false;
    }
  }

  @Output() userDataSubmitted: EventEmitter<{ name: string; email: string }> =
    new EventEmitter();

  submit() {
    if (this.name && this.email) {
      this.userDataSubmitted.emit({ name: this.name, email: this.email });
    }
  }

  @Input() welcomePageShouldBeVisible: boolean = false;
  @Output() pageChange = new EventEmitter<void>();

  changePage() {
    this.pageChange.emit();
  }
}
