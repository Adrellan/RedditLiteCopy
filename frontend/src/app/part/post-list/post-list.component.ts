import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{

  postList: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadPosts();
  }

  async loadPosts() {
    await this.postService.getPosts().then(posts => {
      this.postList = posts;
    });
  }

  refreshPosts() {
    this.loadPosts();
  }
}
