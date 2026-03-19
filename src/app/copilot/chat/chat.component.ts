import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CopilotService } from '../copilot.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

    question: any;
    results: any;
    error: string | null = null;
    loading: boolean = false;
aiResponse = `Hello Rajnish, this is your copilot streaming text...`;
    constructor (private svc: CopilotService, private router: Router) {}

    ask() {
      if (!this.question?.trim()) {
        this.error = 'Please enter a question';
        return;
      }

      this.loading = true;
      this.error = null;

      this.svc.ask(this.question).subscribe({
        next: (res) => {
          this.results = res.results;
          this.loading = false;
        },
        error: (err) => {
          console.error('API Error:', err);
          this.error = 'Unable to connect to the API. Make sure the backend server is running on localhost:3000';
          this.loading = false;
        }
      });
    }

    go(route: string) {
      // Navigate to the specified route
      this.router.navigate([route]);
    }
}
