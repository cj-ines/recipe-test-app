import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../Recipe';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe?:Recipe ;
  @Input() activeId:string = '';

  constructor() { }

  ngOnInit(): void {
  }


}
