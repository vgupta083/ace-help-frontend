import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './copilot/chat/chat.component';
import { AdminComponent } from './copilot/admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'chat', component: ChatComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '/chat' } // Wildcard route for 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
