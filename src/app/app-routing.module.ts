import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { CartComponent } from './components/cart/cart.component';
import { PlaceorderComponent } from './components/placeorder/placeorder.component';
import { UserGuard } from './Guard/user.guard';
import { AdminGuard } from './Guard/admin.guard';
const routes: Routes = [
  {path :"home", component:HomeComponent},
  {path :"cart", component:CartComponent,canActivate: [UserGuard],canLoad:[UserGuard]},
  {path :"adminhome", component:AdminhomeComponent,canActivate: [AdminGuard],canLoad:[AdminGuard]},
  {path :"placeorder", component:PlaceorderComponent,canActivate: [UserGuard],canLoad:[UserGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path :'**', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
