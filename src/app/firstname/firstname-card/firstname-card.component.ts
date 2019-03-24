import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FirstnameModel} from '../model/firstname-model';

@Component({
  selector: 'app-firstname-card',
  templateUrl: './firstname-card.component.html',
  styleUrls: ['./firstname-card.component.css']
})
export class FirstnameCardComponent  {
  @Input() firstName: FirstnameModel;
  @Input() currentItemIndex: number;
  @Input() maximumItemIndex: number;
  @Output() throwIt = new EventEmitter<boolean>();

  throwThisFirstName(throwIt: boolean) {
    this.throwIt.emit(throwIt);
  }
}
