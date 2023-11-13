import { createInjectableType } from '@angular/compiler';
import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostItemComponent implements OnInit{

  @Input() postItem: any;
  liked:boolean = false;
  disliked:boolean = false;
  
  saved:boolean = false;

  ngOnInit(): void {
    console.log(this.postItem)
  }

  savePost(){
    this.saved = !this.saved;
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
