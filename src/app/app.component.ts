import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from './post.model';
import { PostService } from './post.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  showLoading = false;
  @ViewChild('putForm') putForm: NgForm;

  constructor(private postService: PostService) {}

  ngOnInit() {}

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    //console.log(postData);
    this.postService.createAndPost(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.showLoading = true;  
    this.postService.fetchPosts()
    .subscribe(
      (posts) => {
        //console.log(posts);
        this.showLoading = false;
        this.loadedPosts = posts;
      }
    )
  }

  onItemClicked(data: Post) {
    //console.log()
    this.putForm.setValue({
      id: data.id,
      title: data.title,
      content: data.content
    });
  }

  onUpdatePost(data: Post){
    //console.log(data);
    this.postService.updatePost(data).subscribe(
      response => {
        console.log(response);
      }
    );
  }
}
