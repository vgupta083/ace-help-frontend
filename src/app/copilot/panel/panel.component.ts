import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CopilotService } from '../copilot.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-copilot-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit, OnDestroy {
  @Input() open = false;
  @Output() close = new EventEmitter();

  question = '';
  answer = '';
  results: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private svc: CopilotService,
              private router: Router) {}

  ngOnInit(): void {
    this.question = 'Variant family';
    this.ask();
  }

  ask() {
    if (!this.question?.trim()) return;

    this.loading = true;
    this.error = null;

    this.svc.ask(this.question).subscribe({
      next: (res) => {
        this.results = res.results || [];
        this.answer = res.answer;
        this.loading = false;
      },
      error: (err) => {
        console.error('API Error:', err);
        this.error = 'Unable to connect to the API. Please try again.';
        this.loading = false;
      }
    });
  }

  go(route: string) {
    this.router.navigate([route]);
    this.close.emit();
  }

  ngOnDestroy(): void {
    this.answer = '';
    this.results = [];
  }

}
