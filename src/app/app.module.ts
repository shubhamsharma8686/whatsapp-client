import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateListComponent } from './template-list/template-list.component';
import { TemplateEditComponent } from './template-edit/template-edit.component';
import { TemplateService } from './template.service';
import { MessageService } from './message.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TemplateListComponent,
    TemplateEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TemplateService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

