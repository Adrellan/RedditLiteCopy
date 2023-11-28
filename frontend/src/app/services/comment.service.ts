import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private apiService: BaseApiService) {}


  public async getComments(postId: string){
    try {
      const response = await this.apiService.getApi().get('/comment/' + postId);
      console.log(response)
      return response.data;
    } catch (e) {
      console.error(e);
      return [];
    }
  }
  //TODO!
  public async createComment(comment:any) {

    try {
      const response = await this.apiService.getApi().post('/comment',comment);
      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  //TODO!
  public deleteComment() {}
  //TODO!
  public updateComment() {}
}
