import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostService } from 'src/app/services/post.service';
import { PostListComponent } from 'src/app/part/post-list/post-list.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-insert-post',
  templateUrl: './insert-post.component.html',
  styleUrls: ['./insert-post.component.css'],
})
export class InsertPostComponent implements OnInit {
  post: any = {};

  constructor(
    private postService: PostService,
    private ref: DynamicDialogRef,
    public dialogRef: MatDialogRef<InsertPostComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    ) {}

  ngOnInit() {
    console.log(this.data);
  }

  async post_content() {
    try {
      await this.postService.createPost(this.post);
      console.log('Post Successfull');
      this.ref.close();
      this.data.emit({success:true});
    } catch (error) {
      console.log('Post Error:', error);
      this.data.emit({success:false});
    }
  }
}
