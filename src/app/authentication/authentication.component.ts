import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {
  email: string = "";
  password: string = "";

  constructor(private cookieService: CookieService) { }

  async signin() {
    const response = await fetch(
      "http://127.0.0.1:5001/login",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            email: this.email,
            password: this.password
          }
        )
      }
    )
    const res = await response.json()
    console.log(res);

    this.cookieService.set('userid', res.user_id);
  }
}
