import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostItemComponent implements OnInit{
  liked:boolean = false;
  disliked:boolean = false;

  ngOnInit(): void {
  }


  likePost(){
      this.liked = !this.liked;
      this.disliked = false;
  }
  dislikePost(){
    this.liked = false;
    this.disliked = !this.disliked;

  }



}
