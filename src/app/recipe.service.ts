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

    postOne(recipe:Recipe) {
        recipe.uuid = this.uuidv4();
        return this.http.post<Recipe>('http://localhost:3001/recipes', recipe);
    }

    deleteOne(recipe:Recipe) {
        return this.http.delete<Recipe>('http://localhost:3001/recipes/' + recipe.uuid );
    }

    refreshRecipes() {
        this.all.subscribe((data)=> {
            this.recipes.next(data);
        })
    }

    private uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }
}