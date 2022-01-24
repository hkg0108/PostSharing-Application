import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import {Post} from './Posts/post.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  storedpost :Post[] =[]

  onPostAdded(post){
    this.storedpost.push(post);
  }

  constructor(private authservice  :AuthService){}

  ngOnInit(){
    this.authservice.autoAuthUser();
  }

}
