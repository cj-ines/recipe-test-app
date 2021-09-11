import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../Recipe';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit {

  @Output() onSave = new EventEmitter();

  recipe?:Recipe;
  recipeForm2:FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: '',
    prepTime: '',
    servings: '',
    cookTime: '',
    ingridients: this.fb.array([]),
    directions: this.fb.array([])
  })


  constructor(private route:ActivatedRoute, private router:Router, private recipeService:RecipeService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      if (param.id) {
        this.recipeService.one(param.id).subscribe((recipe:Recipe) => {
          this.recipe = recipe;
          for ( let ingridient of recipe.ingredients) {
            this.addIngridient(ingridient.name, ingridient.amount, ingridient.measurement)
          }
    
          for (let direction of recipe.directions) {
            this.addDirection(direction.instructions, direction.optional)
          }
    
          this.recipeForm2.setValue({
            title: recipe.title,
            description: recipe.description,
            cookTime: recipe.cookTime,
            prepTime: recipe.prepTime,
            servings: recipe.servings,
            ingridients: recipe.ingredients,
            directions: recipe.directions
          });
        })
      } else {
        this.recipe = {
          uuid: 'new',
          title: '',
          postDate: new Date(),
          editDate: new Date(),
          images: { full: '', medium: '', small: ''},
          description: '',
          prepTime: 0,
          servings: 0,
          cookTime: 0,
          ingredients: [],
          directions: []
        };
      }

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
    if (this.recipe){
      this.recipe.title = values.title;
      this.recipe.description = values.description;
      this.recipe.cookTime = +values.cookTime;
      this.recipe.prepTime = +values.prepTime;
      this.recipe.servings = +values.servings;
      this.recipe.ingredients = values.ingridients;
      this.recipe.directions = values.directions;

      if (this.recipe.uuid !== 'new') {
        this.recipeService.updateOne(this.recipe).subscribe(()=> {
          this.recipeService.refreshRecipes();
          this.router.navigate(['recipe']);
        });
      } else {
        this.recipeService.postOne(this.recipe).subscribe(()=> {
          this.recipeService.refreshRecipes();
        });
      }
      
    }

    this.cancel();

    
  }

  delete(recipe:Recipe) {
    this.recipeService.deleteOne(recipe).subscribe((response)=> {
      this.router.navigate(['recipe']);
      this.recipeService.refreshRecipes();
    })
  }
  cancel() {
    this.router.navigate(['recipe', this.recipe?.uuid])
  }


}
