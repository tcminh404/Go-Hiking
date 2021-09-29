import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from 'src/guards/auth-admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then((m) => m.LoginModule) },
  { path: 'profile', canActivate: [AuthGuard], loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule) },
  { path: 'admin', canActivate: [AuthAdminGuard], loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule) },
  { path: 'map', loadChildren: () => import('./here-map/here-map.module').then((m) => m.HereMapModule) },
  { path: 'post', loadChildren: () => import('./post/post.module').then((m) => m.PostModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
