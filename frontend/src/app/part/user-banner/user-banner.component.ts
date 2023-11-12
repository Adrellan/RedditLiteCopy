import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-banner',
  templateUrl: './user-banner.component.html',
  styleUrls: ['./user-banner.component.css']
})
export class UserBannerComponent implements  OnInit{
  @Input() fullName: string = "";

  bannerLabel: string = ""


  ngOnInit() {
    if(this.fullName){
      console.log(this.fullName)
      const parts = this.fullName.split(" ");
      this.bannerLabel = parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
    }
  }


}

