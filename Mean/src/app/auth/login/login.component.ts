import { Component, OnDestroy, OnInit } from "@angular/core";
import { Form, NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "../auth.service";

@Component({
  templateUrl : './login.component.html',
  styleUrls : ['./login.component.css']

})
export class LoginComponent implements OnInit ,OnDestroy{


   isLoading = false;
   private authStatusSub : Subscription;

    constructor(public authservice : AuthService){}

   onLogin(form : NgForm){
     if(form.invalid){
       return;
     }
     this.isLoading = true;
     this.authservice.login(form.value.email , form.value.password);
   }

   ngOnInit(){
    this.authStatusSub = this.authservice.getauthStatusLitener().subscribe(
      authStatus => {
        this.isLoading= false;
      }
    );
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }
}
