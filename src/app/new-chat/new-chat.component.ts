import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  standalone: true,
  styleUrls: ['./new-chat.component.css']
})
export class NewChatComponent implements OnInit {

  constructor(private router: ActivatedRoute, private dataService: DataService) {}

  inputText: any = [];
  fileName: string = '';
  url: any = '';

  ngOnInit() {
    // Retrieve inputText and fileName from the shared service
    this.inputText[0] = this.dataService.getInputText();
    this.fileName = this.dataService.getFileName();
    this.url = this.router.snapshot.url.join('/');
  }
}
