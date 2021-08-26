import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../Recipe';
import { Ingredient } from '../Ingridient';
import { Special } from '../Specia';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe:Recipe|undefined;
  specials:Special[] = [];

  constructor(private activeRoute:ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
   this.activeRoute.params.subscribe((param) => {
     this.queryDetails(param.id);
   })
  }

  queryDetails(id:string) {
    this.http.get<Recipe>('http://localhost:3001/recipes/' + id).subscribe(response => {
      this.recipe = response;
      console.log(this.recipe)
    });

    this.http.get<Special[]>('http://localhost:3001/specials').subscribe(response => {
      console.log(response)
      this.specials = response;
    })
  }

  isSpecial(ingridient:Ingredient):Special|any {
    return this.specials.find((i) => i.ingredientId == ingridient.uuid);
  }

  getBackground() {
    return `url('/assets/${this.recipe?.images.full}')`;
  }

}
