import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit {

  directions:string[] = [''];

  constructor() { }

  ngOnInit(): void {
  }

  submitForm(form:NgForm) {
    console.log(form);
  }

  addDirection() {
    this.directions.push('');
  }

}
