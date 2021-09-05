import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../Recipe';
import { Ingredient } from '../Ingridient';
import { Special } from '../Specia';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe:Recipe|undefined;
  specials:Special[] = [];
  editMode:boolean = false;

  constructor(private activeRoute:ActivatedRoute, private http: HttpClient, private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.http.get<Special[]>('http://localhost:3001/specials').subscribe(response => {
      this.specials = response;
    })

   this.activeRoute.params.subscribe((param) => {
     this.queryDetails(param.id);
   })
  }

  queryDetails(id:string) {
    this.recipeService.one(id).subscribe((recipe:Recipe) => {
      this.recipe = recipe;
    });
  }

  isSpecial(ingridient:Ingredient):Special|any {
    return this.specials.find((i) => i.ingredientId == ingridient.uuid);
  }

  getBackground() {
    return `url('/assets/${this.recipe?.images.full}')`;
  }

  edit() {
    console.log(this.recipe);
    this.editMode = true;
  }

}
