import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../Recipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] | undefined;
  activeId: string = '';
  @Output() onActiveId = new EventEmitter();

  constructor(private route:ActivatedRoute, private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.recipeService.recipes.subscribe((data:Recipe[])=> {
      this.recipes = data;
    })
  }

  selectItem(itemId:string) {
    this.activeId = itemId;
    this.onActiveId.emit(this.activeId);
  }

}
