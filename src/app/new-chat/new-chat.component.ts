import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { DataService } from '../data-service.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  imports: [RouterOutlet, CommonModule, FormsModule, NgFor, RouterLink, NgIf],
  standalone: true,
  styleUrls: ['./new-chat.component.css'],
})
export class NewChatComponent implements OnInit {

  constructor(private router: ActivatedRoute, private route: Router, private dataService: DataService) {}

  inputText: any = [];
  fileName: string = '';
  url: any = '';
  responses: any = [];
  prompt: string = "";
  history: any = [];

  async ngOnInit() {
    // Retrieve inputText and fileName from the shared service
    this.inputText[0] = this.dataService.getInputText();
    if (this.inputText[0] === "") {
      this.inputText = [];
    }
    this.fileName = this.dataService.getFileName();
    this.url = this.router.snapshot.url.join('/');
    if (this.inputText.length !== 0){
      await this.response();
      this.storeHistory();
    }
    this.getHistory();
    this.loadChat();
  }

  copyToClipboard(message: string): void {
  navigator.clipboard.writeText(message).then(() => {
    console.log('Message copied to clipboard:', message);
    // Optionally, you can show a notification or alert here
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

  routing(to: string) {
    this.route.navigateByUrl(to);
  }

  async voice(text: string) {
    console.log(text);

  }

  nextQuery() {
    this.inputText.push(this.prompt);
    this.response();
    this.storeHistory();
    this.prompt = "";
  }

  async getHistory() {
    const response = await fetch(
      "http://127.0.0.1:5001/get_chat?userid=1003",
    )
    const res = await response.json()
    this.history = res;
  }

  async loadChat() {
    const response = await fetch(
      "http://127.0.0.1:5001/get_current_chat?userid=1003&chatid=" + this.url,
    )
    const res = await response.json()
    console.log(res);
    for (let i of res) {
      this.inputText.push(i['question'])
      this.responses.push(i['answer'])
    }
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
