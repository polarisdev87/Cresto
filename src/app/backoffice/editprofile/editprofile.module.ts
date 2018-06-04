import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditProfileComponent} from './editprofile.component';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: EditProfileComponent}
    ])
  ],
  declarations: [EditProfileComponent]
})
export class EditProfileModule {
}
