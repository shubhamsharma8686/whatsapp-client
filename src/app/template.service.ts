import { Injectable } from '@angular/core';
import { Template } from './template.model';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private templates: Template[] = [];

  constructor() { }

  getTemplates(): Template[] {
    return this.templates;
  }

  getTemplateById(id: number): Template | undefined {
    return this.templates.find(template => template.id === id);
  }
  
  addTemplate(template: Template): void {
    this.templates.push(template);
  }

  updateTemplate(updatedTemplate: Template): void {
    const index = this.templates.findIndex(template => template.id === updatedTemplate.id);
    if (index !== -1) {
      this.templates[index] = updatedTemplate;
    }
  }
}
