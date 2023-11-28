import { Component, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PostListComponent } from 'src/app/part/post-list/post-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('postList') postList!: PostListComponent;
  
  constructor(
    private messageService: MessageService,
  ){

  }

  public statusListener(event: any){
    if(event.status){
      this.postList.refreshPosts();
    }else{
      this.messageService.add({
        severity: 'error',
        summary: 'Hiba',
        detail: 'Valami hiba történt',
      });
    }
  }
}
