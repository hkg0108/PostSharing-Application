import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from "rxjs/operators";
import { Router } from "@angular/router";
import {environment} from "../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/Posts/";

@Injectable({providedIn : 'root'})
export class PostsService{
  private posts :Post[] = [];
  private updatedPost = new Subject<{posts :Post[], postcount : number}>();

  constructor(private http : HttpClient , private router : Router){}

  getPost(postperPage :number , currentpage : number){
    // return [...this.posts]; //copy of array
    const queryParms = `?pagesize=${postperPage}&page=${currentpage}`;
    this.http.
    get<{message: string , posts:any , maxPosts : number}>(BACKEND_URL + queryParms)
    .pipe(map((postData)=>{
      return {posts : postData.posts.map(post=>{
        return {
          title : post.title,
          content :post.content,
          id : post._id,
          imagePath : post.imagePath,
          creator : post.creator
        };
      }),maxPosts : postData.maxPosts};
    })
    )
    .subscribe((transformedPostData)=> {
      // console.log(transformedPostData);
      this.posts = transformedPostData.posts;
      this.updatedPost.next({posts : [...this.posts] , postcount :transformedPostData.maxPosts});
    });
  }

  getUpdatedPostListener(){
    return this.updatedPost.asObservable();
  }

  getposts( id : string){
    //return {...this.posts.find(p => p.id === id)};
    return this.http.get<{_id:string ; title:string ; content:string ; imagePath : string ;creator : string;}>('http://localhost:3000/api/Posts/' + id);
  }

  addPosts(title:string , content:string , image:File){
    const postdata = new FormData();
    postdata.append("title", title);
    postdata.append("content",content);
    postdata.append("image", image , title);
    this.http.post<{message : string , post : Post}>(BACKEND_URL , postdata)
    .subscribe((responseData) => {
      //console.log(responseData.message);
      // const post:Post = {
      //   id:responseData.post.id,
      //   title:title ,
      //   content:content,
      //   imagePath :responseData.post.imagePath
      // };
      // // const id = responseData.postId;
      // // post.id = id;
      // this.posts.push(post);
      // this.updatedPost.next([...this.posts]);
      this.router.navigate(["/"]);

    });
   }

   updatePost(id: string , title:string , content:string , image : File | string){
    let postData : Post | FormData;
    if(typeof(image) === "object"){
       postData = new FormData();
       postData.append("id", id);
      postData.append("title" , title);
      postData.append("content", content);
      postData.append("image", image , title);

    }else{
       postData ={
        id:id,
        title : title,
        content : content,
        imagePath : image,
        creator : null
      };
    }
     this.http.put(BACKEND_URL + id , postData).subscribe(response =>{
      // const editedPost = [...this.posts];
      // const oldpostIndex = editedPost.findIndex(p => p.id === id);
      // const post:Post ={
      //   id:id,
      //   title : title,
      //   content : content,
      //   imagePath : ""
      // };
      // editedPost[oldpostIndex]= post;
      // this.posts = editedPost;
      // this.updatedPost.next([...this.posts]);
      this.router.navigate(["/"]);
     });
   }

   deletePost(postId : string){
    return this.http.delete(BACKEND_URL + postId);
    //  .subscribe(()=>{
    //    const UpdatedPosts = this.posts.filter(post => post.id != postId);
    //    this.posts = UpdatedPosts;
    //    this.updatedPost.next([...this.posts]);
       //console.log('Deleted!');
      //  const postUpdate = this.posts.filter(post => post.id != postId);
      //  this.posts = postUpdate;
      //  this.updatedPost.next([...this.posts]);
    //  });
   }

}
