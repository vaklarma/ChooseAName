import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-firstname-card',
  templateUrl: './firstname-card.component.html',
  styleUrls: ['./firstname-card.component.css']
})
export class FirstnameCardComponent implements OnInit {
@Output() throw = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  throwThisFirstName() {
    console.log('throw');
  }
}
