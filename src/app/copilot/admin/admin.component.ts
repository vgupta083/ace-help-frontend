import { Component, OnInit } from '@angular/core';
import { CopilotService } from '../copilot.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
// ...existing code...
export class AdminComponent implements OnInit {
  docs: any[] = [];
  originalDocs: any[] = [];
  saving = false;
  saved = false;

  constructor(private svc: CopilotService, private router: Router) {}

  ngOnInit() {
    this.loadDocuments();
  }

  loadDocuments() {
    this.svc.getDocs().subscribe({
      next: (d) => {
        this.docs = d || [];
        this.originalDocs = JSON.parse(JSON.stringify(this.docs));
        this.saved = true;
      },
      error: (err) => {
        console.error('Error loading documents:', err);
        this.docs = [];
      }
    });
  }

  addDocument() {
    const newDoc = {
      header: '',
      category: '',
      body: [],
      keywords: '',
      tags: ''
    };
    this.docs.push(newDoc);
    this.saved = false;
  }

  removeDocument(index: number) {
    if (confirm('Are you sure you want to delete this document?')) {
      this.docs.splice(index, 1);
      this.saved = false;
    }
  }

  // Helper to convert body string to array before saving
  prepareDocsForSave() {
    return this.docs.map(doc => ({
      ...doc,
      body: Array.isArray(doc.body) ? doc.body : doc.body.split('\n').filter((line: string) => line.trim())
    }));
  }

  save() {
    this.saving = true;
    this.saved = false;

    const docsToSave = this.prepareDocsForSave();

    this.svc.saveDocs(docsToSave).subscribe({
      next: () => {
        this.saving = false;
        this.saved = true;
        this.originalDocs = JSON.parse(JSON.stringify(this.docs));
        setTimeout(() => {
          this.saved = false;
        }, 3000);
      },
      error: (err) => {
        console.error('Error saving documents:', err);
        this.saving = false;
      }
    });
  }

  resetChanges() {
    if (confirm('Are you sure you want to reset all changes? This will discard any unsaved modifications.')) {
      this.docs = JSON.parse(JSON.stringify(this.originalDocs));
      this.saved = true;
    }
  }

  // Helper to join body array for display in textarea
  getBodyText(doc: any): string {
    return Array.isArray(doc.body) ? doc.body.join('\n') : doc.body;
  }

  // Helper to update body array from textarea
  setBodyText(doc: any, text: string) {
    doc.body = text.split('\n').filter(line => line.trim());
    this.saved = false;
  }
}
