import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private apiService: BaseApiService) {}

  //TODO!
  public async getPosts() {
    try {
      const response = await this.apiService.getApi().get('/post');
      return response.data;
    } catch (e) {
      console.error(e);
      return [];
    }
  }
  //TODO!
  public createPost() {}
  //TODO!
  public deletePost() {}
  //TODO!
  public updatePost() {}
}
