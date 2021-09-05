import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../Recipe';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  @Output() onSave = new EventEmitter();

  recipe?:Recipe;
  recipeForm2:FormGroup = this.fb.group({
    title: ['', Validators.required],
    prepTime: '',
    servings: '',
    cookTime: '',
    ingridients: this.fb.array([]),
    directions: this.fb.array([])
  })


  constructor(private route:ActivatedRoute, private router:Router, private recipeService:RecipeService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.recipeService.one(param.id).subscribe((recipe:Recipe) => {
        this.recipe = recipe;

        recipe.ingredients.map((ingridient)=> {
          this.addIngridient(ingridient.name, ingridient.amount, ingridient.measurement)
        });

        recipe.directions.map((direction)=> {
          this.addDirection(direction.instructions, direction.optional)
        })

        this.recipeForm2.setValue({
          title: recipe.title,
          cookTime: recipe.cookTime,
          prepTime: recipe.prepTime,
          servings: recipe.servings,
          ingridients: recipe.ingredients,
          directions: recipe.directions
        });

      })
    })
  }

  get ingridients() {
    return (<FormArray>this.recipeForm2.controls['ingridients']);
  }

  get directions() {
    return this.recipeForm2.controls.directions as FormArray;
  }

  addIngridient(name:string, amount:number, measurement:string, uuid?:string)  {
    const newIngridient = this.fb.group({
      name: name,
      amount:amount,
      measurement: measurement,
      uuid: uuid
    })
    this.ingridients.push(newIngridient);
  }

  addDirection(instructions:string, optional?:boolean) {
    const newDirection = this.fb.group({
      instructions: instructions,
      optional: optional
    });
    this.directions.push(newDirection);
  }

  removeIngridient(index:number) {
    this.ingridients.removeAt(index);
  }

  removeDirection(index:number) {
    this.directions.removeAt(index)
  }

  submit() {
    let values = this.recipeForm2.value;
    if (this.recipe) {
      this.recipe.title = values.title;
      this.recipe.cookTime = +values.cookTime;
      this.recipe.prepTime = +values.prepTime;
      this.recipe.servings = +values.servings;
      this.recipe.ingredients = values.ingridients;
      this.recipe.directions = values.directions;
      this.recipeService.updateOne(this.recipe).subscribe(()=> {
        this.recipeService.refreshRecipes();
      });
    }

    this.cancel();

    
  }
  cancel() {
    this.router.navigate(['recipe', this.recipe?.uuid])
  }


}
