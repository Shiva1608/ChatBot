import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private inputText: string = '';
  private fileName: string = '';

  // Method to set inputText
  setInputText(text: string) {
    this.inputText = text;
  }

  // Method to get inputText
  getInputText(): string {
    return this.inputText;
  }

  // Method to set fileName
  setFileName(name: string) {
    this.fileName = name;
  }

  // Method to get fileName
  getFileName(): string {
    return this.fileName;
  }

  // You can add more methods for other data if needed
}
