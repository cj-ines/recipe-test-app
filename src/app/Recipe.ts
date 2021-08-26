import { Ingredient } from "./Ingridient";
import { Direction } from "./Directions";
export interface Recipe {
    uuid: string
    title: string
    description: string
    images: {
      full: string
      medium: string,
      small: string
    }
    servings: number
    prepTime: number
    cookTime: number
    postDate: Date
    editDate: Date
    ingredients: Ingredient[]
    directions: Direction[]
  }