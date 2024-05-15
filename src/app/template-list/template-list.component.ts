import { Component, OnInit, Input, Injectable } from '@angular/core';
import { TemplateService } from '../template.service';
import { Template } from '../template.model';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {
  //selectedTemplate: Template | null = null;
  apiData: any;
  selectedTemplate: Template | { id:null, name:'', color: 'white', placeHolder:'This is a sample message with an embedded image', number:0 } | null = null;
  
  newTemplateName: string = '';
  userData: any = {}; // Example user data object
  @Input() currentTemplate!: Template;
  public templates: Template[] = [];

  constructor(private templateService: TemplateService, private router: Router, 
    private messageService: MessageService, private http: HttpClient) { }

  ngOnInit(): void {
    console.log(this.templates);
  }

  selectTemplate(template: Template): void {
    this.selectedTemplate = template;
    this.currentTemplate = this.selectedTemplate;
  }

  editTemplate(template: Template): void {
    this.selectedTemplate = template;
    this.selectedTemplate.color='#dcf8c6';
    this.selectedTemplate.placeHolder="Congratulation! 😍 You have successfully enrolled in course. This is auto-generated message please do not reply to this conversation.";
  }

  saveTemplate(): void {
    if (this.selectedTemplate ? this.selectedTemplate.id:'') {
      console.log(this.selectedTemplate);
      // this.messageService.generateMessage(this.selectedTemplate).subscribe(
      //   (data) => {
      //     this.apiData = data;
      //     console.log('API Response:', this.apiData);
      //   },
      //   (error) => {
      //     console.error('API Error:', error);
      //   }
      // );
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      this.userData = {to:(this.selectedTemplate?.number)?.toString(),body:this.selectedTemplate?.placeHolder}
      this.http.post<any>('http://localhost:3000/api/data', this.userData, httpOptions)
      .subscribe(
        (response) => {
          console.log('Form submitted successfully:', response);
          // Reset form data after successful submission
          //this.selectedTemplate = {};
        },
        (error) => {
          console.error('Form submission error:', error);
        }
      );
      //this.templateService.updateTemplate(this.selectedTemplate ? this.selectedTemplate:this.currentTemplate);
    } else {
      // Generate a new ID for the template (e.g., using timestamp)
      if(this.selectedTemplate){
        this.selectedTemplate.id = Date.now();
        //this.templateService.addTemplate(this.selectedTemplate);
      }
    }
    this.router.navigate(['/templates']); // Navigate back to template list
  }

  sendMessage(): void {
    //const generatedMessage = this.messageService.generateMessage(this.userData);
    
    // Add logic here to send the generated message (e.g., via WhatsApp API)
    // Replace the console.log() statement with actual message delivery code
  }

  addNewTemplate(): void {
    if (this.newTemplateName.trim() !== '') {
      const newTemplate: Template = {
        id: this.templates.length + 1,
        name: this.newTemplateName,
        color: '',
        placeHolder: '',
        number:0
      };
      this.templates.push(newTemplate);
      this.newTemplateName = ''; // Clear input after adding template
    }
  }
}

