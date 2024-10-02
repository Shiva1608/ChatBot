import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { DataService } from '../data-service.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  imports: [RouterOutlet, CommonModule, FormsModule, NgFor],
  standalone: true,
  styleUrls: ['./new-chat.component.css']
})
export class NewChatComponent implements OnInit {

  constructor(private router: ActivatedRoute, private dataService: DataService) {}

  inputText: any = [];
  fileName: string = '';
  url: any = '';
  responses: any = [];
  prompt: string = "";

  async ngOnInit() {
    // Retrieve inputText and fileName from the shared service
    this.inputText[0] = this.dataService.getInputText();
    this.fileName = this.dataService.getFileName();
    this.url = this.router.snapshot.url.join('/');
    await this.response();
    this.storeHistory();
  }

  nextQuery() {
    this.inputText.push(this.prompt);
    this.response();
    this.storeHistory();
    this.prompt = "";
  }

  async storeHistory() {
    const response = await fetch(
      "http://127.0.0.1:5001/store_chat",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            user_id: 1003,
            chat_id: this.url,
            question: this.inputText[this.inputText.length - 1],
            answer: this.responses[this.responses.length - 1],
          }
        )
      }
    )
    const res = await response.json()
    console.log(res);
  }

  async response() {
    const response = await fetch(
      "http://127.0.0.1:5001/response",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            user_id: 1003,
            query: this.inputText[this.inputText.length - 1],
            category: "LINKEDIN"
          }
        )
      }
    )
    const res = await response.json()
    console.log(res);
    this.responses.push(res);
  }
}
