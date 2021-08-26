import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../Recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] | undefined;
  activeId: string = '';

  constructor(private http:HttpClient, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.http.get<Recipe[]>('http://localhost:3001/recipes').subscribe( (response) => {
      this.recipes = response;
      console.log(this.recipes);
    });
  }

}
