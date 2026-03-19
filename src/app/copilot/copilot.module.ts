import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { AdminComponent } from './admin/admin.component';
import { PanelComponent } from './panel/panel.component';
import { TypewriterComponent } from './typewriter/typewriter-component';

@NgModule({
  declarations: [ChatComponent, AdminComponent, PanelComponent, TypewriterComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ChatComponent, AdminComponent, PanelComponent]
})
export class CopilotModule { }
