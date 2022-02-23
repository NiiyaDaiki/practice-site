import { mergeMap } from 'rxjs';

import { Component, OnInit } from '@angular/core';

import { UserService } from '../app/service/user.service';
import { Post } from './interface/post';
import { User } from './interface/user';
import { PostService } from './service/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'practice-site';

  users: User[] = [];
  posts: Post[] = [];

  constructor(private userService: UserService, private postService: PostService) {}

  // getUsers(): void {
  //   this.userService.getUsers().subscribe((users) => {
  //     this.users = users;
  //     console.log(this.users);
  //   });
  // }

  ngOnInit(): void {
    this.userService
      .getUsers()
      .pipe(
        mergeMap((users) => {
          this.users = users;
          return this.postService.getPostsByUserId(this.users[0].id);
        })
      )
      .subscribe((posts) => {
        this.posts = posts;
        console.log(this.posts);
      });
  }
}
