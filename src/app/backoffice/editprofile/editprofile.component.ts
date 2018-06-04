import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  firstname;
  lastname;
  country = '';
  etherbase;
  userid;

  ngOnInit() {
    this.userid = JSON.parse(localStorage.getItem('auth_user')).id;
  }

  onSave() {
    let profile = {
      userid: this.userid,
      firstname: this.firstname,
      lastname: this.lastname,
      country: this.country,
      etherbase: this.etherbase
    };
  }
}
