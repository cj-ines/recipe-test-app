import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  {
  path: 'admin',
  component: AdminComponent
  },
  {
  path: 'recipe', 
  component: WelcomeComponent, children: [
    {
      path: ':id',
      component: RecipeDetailComponent
    }
    ]
  }, {
    path: '', redirectTo: '/recipe', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
