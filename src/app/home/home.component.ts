import { Component, Renderer2, NgModule } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private renderer: Renderer2, private router: Router) {}

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
    if (this.inputText || this.file) {

      // Log input
      console.log('Input Text:', this.inputText);
      if (this.file) {
        console.log('File Name:', this.fileName);
        this.router.navigateByUrl('new-chat');
      } else {
        this.router.navigateByUrl('new-chat');
        console.log('No file uploaded');
      }
    } else {
      console.log('Please enter text or upload a file before submitting');
    }
  }


}
