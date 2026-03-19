import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CopilotService {
  api = '/api/copilot';

  constructor(private http: HttpClient) {}

  ask(q: string) {
    return this.http.post<any>(`${this.api}/ask`, { query: q },
      { headers: { 'x-user-role': 'READ' } });
  }

  categories() {
    return this.http.get<any>(`${this.api}/categories`);
  }

  getDocs() {
    return this.http.get<any>(`${this.api}/docs`);
  }

  saveDocs(docs: any[]) {
    return this.http.post(`${this.api}/docs`, docs);
  }
}
