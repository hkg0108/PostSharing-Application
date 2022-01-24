import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector : 'app-header',
  templateUrl : './header.component.html',
  styleUrls : ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{
  userIsAuthenticated = false;
  private authListenerSubs : Subscription;
  constructor(private authservice : AuthService){}

  ngOnInit(){
    this.userIsAuthenticated = this.authservice.getIsAuth();
    this.authListenerSubs = this.authservice
    .getauthStatusLitener()
    .subscribe(isauthenticated =>{
      this.userIsAuthenticated = isauthenticated;

    });
  }

  onLogout(){
    this.authservice.logout();
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }
}
