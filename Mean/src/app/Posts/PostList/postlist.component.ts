import { Component ,   OnDestroy,   OnInit } from "@angular/core";
import { from } from "rxjs";
import {Post} from '../post.model';
import {PostsService} from '../posts.service';
import {Subscription} from 'rxjs';
import { PageEvent } from "@angular/material/paginator";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector :'app-postlist',
  templateUrl : './postlist.component.html',
  styleUrls : ['./postlist.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
  // posts = [
  //    {title : "First Post" , content :"The content of first post."},
  //    {title : "Second Post" , content :"The content of Second post."},
  //    {title : "Third Post" , content :"The content of Third post."},
  //    {title : "Fourth Post" , content :"The content of Fourth post."},
  // ]

    posts :Post [] = [];
    isLoading = false;
    totalPosts = 0;
    postperPage = 5;
    currentPage = 1;
    pageSizeOptions = [1,2,5,10 ,15,20,25,30];
    userId : string;
    userIsauthenticated = false;
    private postsub :Subscription;
    private authStatusSub : Subscription ;

  constructor(public  postService : PostsService , private authservice:AuthService ){}

  ngOnInit(){
    this.isLoading = true;
    this.postService.getPost(this.postperPage, this.currentPage);
    this.userId = this.authservice.getUserId();
    this.postsub = this.postService.getUpdatedPostListener().subscribe(
      (postData :{posts : Post[], postcount : number})=>{
    this.isLoading=false;
    this.totalPosts = postData.postcount;
    this.posts = postData.posts;
    });
    this.userIsauthenticated = this.authservice.getIsAuth();
    this.authStatusSub = this.authservice
    .getauthStatusLitener()
    .subscribe(isAutheticated =>{
      this.userIsauthenticated = isAutheticated;
      this.userId = this.authservice.getUserId();
    });
  }

  onChangedPage(pageData : PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1 ;
    this.postperPage = pageData.pageSize;
    this.postService.getPost(this.postperPage, this.currentPage);
  }

  onDelete(postId : string){
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(()=>{
      this.postService.getPost(this.postperPage, this.currentPage);
    } , () => {
      this.isLoading = false;
    }
    );
  }

  //for unsubscription
  ngOnDestroy(){
    this.postsub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  }
