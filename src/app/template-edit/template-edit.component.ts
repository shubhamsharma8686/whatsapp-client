// template-edit.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Template } from '../template.model';
import { TemplateService } from '../template.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-template-edit',
  templateUrl: './template-edit.component.html',
  styleUrls: ['./template-edit.component.css']
})
export class TemplateEditComponent implements OnInit {
  //template: Template = { id: 0, name: '', content: '', placeholders: ['firstName'] };
  userData: any = {}; // Example user data object
  @Input() template!: Template;

  constructor(
    private templateService: TemplateService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const templateId = this.route.snapshot.paramMap.get('id');
    if (templateId !== null) {
      const id = +templateId; // Convert templateId to number
      this.template = this.templateService.getTemplateById(id) || this.template;
    }
    this.userData = {
      firstName: 'John',
      lastName: 'Doe',
      // Add other properties as needed based on your template placeholders
    };
  }

  saveTemplate(): void {
    if (this.template.id) {
      this.templateService.updateTemplate(this.template);
    } else {
      // Generate a new ID for the template (e.g., using timestamp)
      this.template.id = Date.now();
      this.templateService.addTemplate(this.template);
    }
    this.router.navigate(['/templates']); // Navigate back to template list
  }

  generateMessage(): void {
    const generatedMessage = this.messageService.generateMessage(this.userData);
    console.log('Generated Message:', generatedMessage);
    alert('Generated Message: ' + generatedMessage);
    // Add logic here to send the generated message (e.g., via WhatsApp API)
    // Replace the console.log() statement with actual message delivery code
  }
}
