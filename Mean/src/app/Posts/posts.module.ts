import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {ReactiveFormsModule , FormsModule} from '@angular/forms'
import { RouterModule } from "@angular/router";
import { ANgularMaterialModule } from "../angular-material.module";
import {PostCreateComponent} from './PostCreate/postcreate.component';
import { PostListComponent } from './PostList/postlist.component';

@NgModule({
    declarations:[
      PostCreateComponent,
      PostListComponent
    ],
    imports:[
      CommonModule,
      ReactiveFormsModule,
      ANgularMaterialModule,
      RouterModule
    ]
})
export class PostsModule{}
