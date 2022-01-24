import { NgModule } from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";

import { PostCreateComponent } from "./Posts/PostCreate/postcreate.component";
import { PostListComponent } from "./Posts/PostList/postlist.component";

const routes : Routes =[
  { path: '' , component:PostListComponent},
  { path:'create' , component:PostCreateComponent , canActivate : [AuthGuard]},
  { path:'edit/:postId' , component:PostCreateComponent ,  canActivate : [AuthGuard]},
  { path:'auth' , loadChildren : () => import("./auth/auth.module").then(m => m.AuthModule)}

];

@NgModule({
imports:  [RouterModule.forRoot(routes)],
exports: [RouterModule],
providers : [AuthGuard]

})

export class AppRoutingModule{}
