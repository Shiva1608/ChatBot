import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  fileName: string = '';
  inputText: string = ''; // Store the user's input text
  file: File | null = null;
  dragOver: boolean = false;
  filePreview: string | ArrayBuffer | null = '';
  fileType: string = 'other'; // To track file type (image or other)
  showFilePreview: boolean = false; // For expanding the file preview
  uuid: string = '';

  constructor(private router: Router, private dataService: DataService) {}

  generateUniqueId() {
    this.uuid =  `id-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      this.fileName = this.file.name;

      // Check if the file is an image for preview purposes
      if (this.file.type.startsWith('image')) {
        this.fileType = 'image';
        const reader = new FileReader();
        reader.onload = () => {
          this.filePreview = reader.result;
        };
        reader.readAsDataURL(this.file);
      } else {
        this.fileType = 'other';
        this.filePreview = null;
      }
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragOver = true;
  }

  onDragLeave(event: DragEvent) {
    this.dragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.file = files[0];
      this.fileName = this.file.name;

      // Check if the file is an image for preview purposes
      if (this.file.type.startsWith('image')) {
        this.fileType = 'image';
        const reader = new FileReader();
        reader.onload = () => {
          this.filePreview = reader.result;
        };
        reader.readAsDataURL(this.file);
      } else {
        this.fileType = 'other';
        this.filePreview = null;
      }
    }
  }

  deleteFile() {
    this.file = null;
    this.fileName = '';
    this.filePreview = '';
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    fileInput.value = ''; // Reset the file input value
  }

  toggleFilePreview() {
    this.showFilePreview = !this.showFilePreview;
  }

  submit() {
    const formData = new FormData();
    if (this.file !== null){
      formData.append('file', this.file);
      fetch('http://127.0.0.1:5001/update_pdf_vdb', {
        method: 'POST',
        body: formData
      })
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error(error));
    }
    this.dataService.setInputText(this.inputText);
    this.dataService.setFileName(this.fileName);
    this.generateUniqueId();
      // Navigate to the next page
    this.router.navigateByUrl(this.uuid);
  }
}
