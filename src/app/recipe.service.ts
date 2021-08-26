import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Recipe } from "./Recipe";

@Injectable()
export class RecipeService {
    
    constructor(private http:HttpClient) {}

    
}