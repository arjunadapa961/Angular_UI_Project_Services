import { Component, OnInit } from '@angular/core';
import { Ingredient } from './Ingredient.model';
import { ShoppigListService } from './shoppig-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[]

  constructor(private ShoppigListService: ShoppigListService) { }

  ngOnInit() {
    this.ingredients = this.ShoppigListService.getIngredients()
    this.ShoppigListService.ingredientsChanged.subscribe((ingredient: Ingredient[]) => {
      this.ingredients = ingredient
    })
  }

}
