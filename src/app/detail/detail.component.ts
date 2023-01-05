import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from 'src/service/users/users.service';
import { CommentsService } from 'src/service/comments/comments.service';
import { PostsService } from 'src/service/posts/posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-component',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  title = 'epptec-app';
  public users: any[] = [];
  public comments: any[] = [];
  public posts: any[] = [];

  public detailId: number|null = null;
  public detail: any = null;

  resultUsers$: Observable<any>;
  resultComments$: Observable<any>;
  resultPosts$: Observable<any>;

  constructor(private usersService: UsersService,
              private commentsService: CommentsService,
              private postsService: PostsService,
              private activeRoute: ActivatedRoute) {
    this.resultUsers$ = usersService.resolveUsers();
    this.resultComments$ = commentsService.resolveComments();
    this.resultPosts$ = postsService.resolvePosts();
    let i=0;
    this.resultUsers$.subscribe((dataUsers) => {
      this.users = dataUsers;
      i++;
      if (i===3) {
        this.getData();
      }
    });
    this.resultComments$.subscribe((dataComments) => {
      this.comments = dataComments;
      i++;
      if (i===3) {
        this.getData();
      }
    });
    this.resultPosts$.subscribe((dataPosts) => {
      this.posts = dataPosts;
      i++;
      if (i===3) {
        this.getData();
      }
    });
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params: any) => {
      this.detailId = Number(params.id);
    })
  }

  public getData() {
    for(let l=0; l < this.posts.length; l++) {
      this.posts[l].author = this.users.find((user)=>{
        if (this.posts[l].userId === user.id) {
          return true;
        }
        return false;
      });
      this.posts[l].comments = this.comments.filter((comment)=>{
        if (this.posts[l].id === comment.postId) {
          return true;
        }
        return false;
      });
      if (this.detailId === this.posts[l].id) {
        this.detail = this.posts[l];
      }
    };
  };
}
