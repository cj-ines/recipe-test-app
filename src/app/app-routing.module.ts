import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AdminComponent } from './admin/admin.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';


const routes: Routes = [
  {
  path: 'admin',
  component: AdminComponent
  },
  {
  path: 'recipe', 
  component: WelcomeComponent, children: [
    {
      path: 'create',
      component: RecipeEditComponent
    },
    {
      path: ':id',
      component: RecipeDetailComponent
    },
    {
      path: ':id/edit',
      component: RecipeEditComponent
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
