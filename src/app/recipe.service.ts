import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Recipe } from "./Recipe";

@Injectable({
    providedIn: 'root',
  })
export class RecipeService {

    recipes:Subject<Recipe[]> = new Subject<Recipe[]>();

    constructor(private http:HttpClient) {
        this.refreshRecipes();
    }

    all:Observable<Recipe[]> = this.http.get<Recipe[]>('http://localhost:3001/recipes')
    

    one(id:string): Observable<Recipe> {
        return this.http.get<Recipe>('http://localhost:3001/recipes/' + id)
    }

    updateOne(recipe:Recipe) {
        return this.http.patch<Recipe>('http://localhost:3001/recipes/' + recipe.uuid, recipe);
    }

    refreshRecipes() {
        this.all.subscribe((data)=> {
            this.recipes.next(data);
        })
    }
}