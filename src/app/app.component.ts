import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'ACE Demo for Help functionality';

  copilotOpen = false;
  toggleCopilot() {
    this.copilotOpen = !this.copilotOpen;
  }
}
