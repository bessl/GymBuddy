import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CanEnterLoginPageGuard } from './can-enter-login-page.guard';
import {CanEnterContentPageGuard} from './can-enter-content-page.guard';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', loadChildren: './list/list.module#ListPageModule', canActivate: [CanEnterContentPageGuard]},
  { path: 'detail/:exerciseId', loadChildren: './detail/detail.module#DetailPageModule', canActivate: [CanEnterContentPageGuard]},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate: [CanEnterLoginPageGuard]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
