import { Component, OnInit } from '@angular/core';
import { IRandomUser } from '../shared/interface/randomuser';
import { ApiService } from '../api.service';
import { Result } from '../shared/interface/randomuser';
import { Tab } from '../shared/models/tabs';
import { Display } from '../shared/models/displays';
import * as moment from 'moment';

@Component({
  selector: 'random-user',
  templateUrl: './randomuser.component.html',
  styleUrls: ['./randomuser.component.css']
})

export class RandomuserComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  public randomuser: Result;
  public display: Display = { text: "Hi, My name is", value: "Sikandar Amla" };


  public tabs: Tab[] = [
    { id: "name", displayText: "Hi, My name is", displayValue: "", class: "active", icon: "fad fa-user" },
    { id: "email", displayText: "My email address is", displayValue: "", class: "", icon: "fad fa-envelope" },
    { id: "birthday", displayText: "My birthday is", displayValue: "", class: "", icon: "fad fa-calendar-day" },
    { id: "address", displayText: "My address is", displayValue: "", class: "", icon: "fad fa-map-marked-alt" },
    { id: "phone", displayText: "My phone number is", displayValue: "", class: "", icon: "fad fa-phone" },
    { id: "password", displayText: "My password is", displayValue: "", class: "", icon: "fad fa-user-lock" }
  ]



  ngOnInit(): void {
    this.getRandomUser();
  }

  public getRandomUser() {
    this.apiService.getNextUser().subscribe((data: IRandomUser) => {
      if (data.results.length > 0) {
        this.randomuser = data.results[0];

        this.tabs.forEach(function (item) {
          item.class = "";
          if (item.id === 'name') {
            item.displayValue = data.results[0].name.first + ' ' + data.results[0].name.last;
            item.class = "active";
          }
          if (item.id === 'email') {
            item.displayValue = data.results[0].email;
            item.class = "";
          }
          if (item.id === 'birthday') {
            item.displayValue = moment(data.results[0].dob.date).format('DD/MM/YYYY');
            item.class = "";
          }
          if (item.id === 'address') {
            item.displayValue = data.results[0].location.postcode + ' ' + data.results[0].location.city + ' ' + data.results[0].location.state;
            item.class = "";
          }
          if (item.id === 'phone') {
            item.displayValue = data.results[0].cell;

            item.class = "";
          }
          if (item.id === 'password') {
            item.displayValue = data.results[0].login.password;
            item.class = "";
          }
        })

        this.display.text = "Hi, My name is";
        this.display.value = data.results[0].name.first + ' ' + data.results[0].name.last;

      }
      else {
        this.display.text = "Error";
        this.display.value = "Couldn't fetch.";

      }
    });

  }

  public tabClicked(id: string) {
    this.tabs.forEach((item) => {
      item.class = "";
      if (item.id === id) {
        item.class = "active";

        this.display.text = item.displayText;
        this.display.value = item.displayValue;
      }
    });
  }

}
