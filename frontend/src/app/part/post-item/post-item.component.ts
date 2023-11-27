import { createInjectableType } from '@angular/compiler';
import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostItemComponent implements OnInit{

  @Input() postItem: any;

  commentInput: any
  
  liked:boolean = false;
  disliked:boolean = false;
  commentsOpened:boolean = false;
  
  saved:boolean = false;

  constructor(private commentService: CommentService){}

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
  toggleCommentsOpened(){
    this.commentsOpened = !this.commentsOpened;
  }
  async insertComment(){
    const requestData = {
      text: this.commentInput,
      post: this.postItem._id
    }
    await this.commentService.createComment(requestData)
    this.commentInput = ""
    await this.reloadComments()


  }
  private async reloadComments(): Promise<void>{
    const comments = await this.commentService.getComments(this.postItem._id);
    this.postItem.comments = comments
  }



}
