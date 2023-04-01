import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnInit {


  @Input() message: string = '';
  @Output() modalClose = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  modalCloseClicked(){
    this.modalClose.emit
  }

}
