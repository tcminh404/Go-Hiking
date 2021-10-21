import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfileRoutingModule } from './profile-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from 'src/material/material.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FriendComponent } from './friend/friend.component';
import { FriendRequestComponent } from './friend-request/friend-request.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  declarations: [ProfileComponent, EditProfileComponent, FriendComponent, FriendRequestComponent],
  exports: [ProfileComponent]
})
export class ProfileModule { }
