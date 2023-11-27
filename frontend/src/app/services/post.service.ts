import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private baseApiService: BaseApiService) {}

  //TODO!
  public async getPosts() {
    try {
      const response = await this.baseApiService.getApi().get('/post');
      return response.data;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  async createPost(post: any): Promise<any>{
    await this.baseApiService.getApi().post('/post', post);
  }
  
  //TODO!
  public deletePost() {}
  //TODO!
  public updatePost() {}
}
