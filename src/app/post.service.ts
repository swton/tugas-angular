import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Post } from './post.model'
import { map } from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class PostService {
    endPointURL: string = 'https://test-training-angular-220523-default-rtdb.asia-southeast1.firebasedatabase.app/';
    postURL: string = this.endPointURL+'post.json';

    constructor(private http: HttpClient) {}

    createAndPost(postData: Post) {
        this.http.post<{name: string}>(this.postURL, postData).subscribe(
            (data) => {
              console.log(data);
            }
          )
    }

    fetchPosts() {
        return this.http.get<{[key: string]: Post}>(this.postURL).
        pipe(
          map(
            responseData => {
              const postArray: Post[] = [];
              for(const key in responseData) {
                if(responseData.hasOwnProperty(key)) {
                  postArray.push({...responseData[key], id: key})
                }
              }
              return postArray;
            }
          )
        )
    }

    updatePost(data: Post){
        const dataUpdate = { [data.id] : {
            title: data.title,
            content: data.content
        }};
        return this.http.patch(this.postURL, dataUpdate);
    }
}