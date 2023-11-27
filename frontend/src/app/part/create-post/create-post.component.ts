import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { InsertPostComponent } from 'src/app/page/insert-post/insert-post.component';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {

  @Output() insertStatus = new EventEmitter();

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private apiService: ApiService,
    private messageService: MessageService,
  ) {}

  navigete(): void {
    this.router.navigate(['/insertpost']);
  }

  showInsertPostDialog() {
    if (this.apiService.isLoggedIn()) {
      const ref = this.dialogService.open(InsertPostComponent, {
        header: 'Bejegyzés létrehozása',
        width: '500px',
        height: '750px',

        contentStyle: {
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        baseZIndex: 10000,
        maximizable: true,
        //TODO
        data: {
          emit: 0,
          person: {
            name: 'Simon',
            age: 32,
        }
        }
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Hiba',
        detail: 'Bejegyzés írásához be kell jelentkeznie.',
      });
    }
  }

  public statusListener(event: any){
    this.insertStatus.emit(event);
  }
}
