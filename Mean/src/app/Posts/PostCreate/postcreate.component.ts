

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import {mimeType} from '../PostCreate/mime-type validator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
//import {mat-form-field } from '@angular/material/schematics';
// import {Post} from '../post.model';

@Component({
  selector : 'app-postcreate',
  templateUrl : './postcreate.component.html',
  styleUrls : ['./postcreate.component.css']

})
export class PostCreateComponent implements OnInit , OnDestroy{
  // enteredTitle = '';
  // enteredContent = '';
  post: Post;
  isLoading = false;
  private mode = 'create';
  private postId : string;
  form : FormGroup;
  imagePreview : string;
  private authStatusSub : Subscription;

  //newpost = 'No content';
 // Test = "No Content";
 constructor(public postsService :PostsService , public route: ActivatedRoute , private authservice : AuthService){}

  ngOnInit(){
    this.authStatusSub = this.authservice.getauthStatusLitener().subscribe( authStstus =>{
      this.isLoading = false;
    });
    this.form = new FormGroup({
      'title' : new FormControl(null, {validators :[Validators.required , Validators.minLength(3)]}),
      'content' : new FormControl(null, {validators : [Validators.required]}),
      'image' : new FormControl(null, {validators : [Validators.required], asyncValidators:[mimeType] })
    });
    this.route.paramMap.subscribe((paramMap : ParamMap)=>{
      if(paramMap.has("postId")){
        this.mode = 'Edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getposts(this.postId).subscribe(postdata =>{
            this.isLoading = false;
          this.post = {id:postdata._id ,
            title:postdata.title ,
            content : postdata.content ,
             imagePath:postdata.imagePath,
             creator : postdata.creator
            };
          this.form.setValue({
            title : this.post.title,
            content : this.post.content,
            image : this.post.imagePath,

          });
        });
      }else{
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onImagePicked(event : Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image : file});
      this.form.get('image').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = ()=>{
      this.imagePreview = (reader.result as string);
      }
      reader.readAsDataURL(file);

  }

    onSavePost(){
       //this.newpost = this.enteredValue;
       if(this.form.invalid){
         return;
       }
       this.isLoading = true;
       if(this.mode === "create")
       {
        this.postsService.addPosts(this.form.value.title, this.form.value.content,this.form.value.image);
       }
       else{
         this.postsService.updatePost(this.postId,this.form.value.title, this.form.value.content,this.form.value.image);
       }

      this.form.reset();
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }
}
