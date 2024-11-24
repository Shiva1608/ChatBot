import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { DataService } from '../data-service.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownWrapperModule } from '../app.markdown';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  imports: [RouterOutlet, CommonModule, FormsModule, NgFor, RouterLink, NgIf, MarkdownWrapperModule],
  standalone: true,
  styleUrls: ['./new-chat.component.css'],
})
export class NewChatComponent implements OnInit {

  constructor(private router: ActivatedRoute, private route: Router, private dataService: DataService) {}

  inputText: any = [];
  fileName: string = '';
  url: any = '';
  loadingIndex: number | null = null;
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
      this.loadingIndex = this.inputText.length - 1;
      await this.response();
      this.loadingIndex = null;
      this.storeHistory();
    }
    this.getHistory();
    this.loadChat();
  }

  routing(to: string) {
    this.route.navigateByUrl(to);
  }


  async nextQuery() {
    if (!this.prompt.trim()) return; // Prevent empty submissions
    this.inputText.push(this.prompt);
    this.loadingIndex = this.inputText.length - 1; // Set the current loading index
    this.prompt = "";
    await this.response();
    this.loadingIndex = null; // Reset loading index after response
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
        body: JSON.stringify({
          user_id: 1003,
          query: this.inputText[this.inputText.length - 1],
          category: "LINKEDIN"
        })
      }
    )
    const res = await response.json();
    this.responses.push(res);
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(
      () => console.log('Copied to clipboard successfully!'),
      (err) => console.error('Failed to copy text: ', err)
    );
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();  // Prevents a new line from being added
      this.nextQuery();  // Call your submit function
    }
  }
}
