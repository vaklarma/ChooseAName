import {Component, OnInit} from '@angular/core';
import {FirstnameService} from '../firstname.service';
import {FirstnameModel} from '../model/firstname-model';

@Component({
  selector: 'app-firstname-list',
  templateUrl: './firstname-list.component.html',
  styleUrls: ['./firstname-list.component.css']
})
export class FirstnameListComponent implements OnInit {
  firstNameKeys: string[];
  firstNameKeysIndex = 0;
  oneFirstNameObject: FirstnameModel;

  constructor(private firstNameService: FirstnameService) {
  }

  ngOnInit(): void {
    this.firstNameService.getAllFirstNamesKeys().subscribe(
      data => {

        this.firstNameKeys = data;
        this.getOneFname(this.firstNameKeysIndex);

      }
    );
  }

  onThrowIt($event: boolean) {
    this.firstNameService.setSelectedFirstName(this.firstNameKeys[1], $event);
    this.nextFirstName();
  }

  nextFirstName() {
   this.firstNameKeysIndex++;
   if (this.firstNameKeysIndex > (this.firstNameKeys.length) - 1 ) {
     this.firstNameKeysIndex = 0;
   }
    this.getOneFname(this.firstNameKeysIndex);
  }

  getOneFname(index) {
    this.firstNameService.getOneFirstName(this.firstNameKeys[index])
      .subscribe(
        resp => {
          this.oneFirstNameObject = resp;

        }
      );

  }
}
